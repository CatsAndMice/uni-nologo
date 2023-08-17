<template>
    <view style="padding-bottom: 100rpx;">
        <live-tooltip message="外部门同事收到表彰会额外获得奖励" />
        <live-dept :custom-style="{
            marginBottom: '24rpx'
        }" :deptName="curDept.deptName" @select="onSelect" />

        <uni-popup ref="popupRef" :is-mask-click="false">
            <live-popup-content title='切换部门' :list="list" @change="onChange" :dept-id="curDept.deptId" @close="close" />
        </uni-popup>

        <view class="bg-white margin-bottom-12">
            <view class="padding-lr-16"
                style="height: 96rpx;font-size: 32rpx;font-weight: 600;color: rgba(0,0,0,0.9);line-height: 96rpx;border-bottom: 1px solid #E7E7E7;">
                选择表彰项
            </view>

            <view class="margin-bottom-8">
                <view class="flex align-center" style="overflow-y: auto;height: 96rpx;">
                    <view class="enum" v-for="e in enumList" :key="e.value"
                        :class="enumActive === e.value ? 'is-active' : null" @click="selectEnum(e)">{{ e.label }}
                    </view>
                </view>
            </view>

            <view class="padding-lr-16">
                <view v-if="isEmpty(competenceDimensionList)" style="height: 632rpx;position: relative;">
                    <view style="position: absolute;left: 50%;top: 50%;transform: translate(-50%,-50%);"> <live-empty
                            message="无可颁发表彰项" /></view>
                </view>
                <template v-else>
                    <uni-swiper-dot :info="info" :current="current" field="content" mode="dot" :dots-styles="{
                        selectedBackgroundColor: '#F7AF6C',
                        selectedBorder: '1px #F7AF6C solid',
                        backgroundColor: '#EEEEEE',
                        bottom: info.length === 1 ? 1000 : 12,
                        border: '1px #EEEEEE solid'
                    }">
                        <swiper class="swiper-box" @change="change">
                            <swiper-item v-for="( item, index ) in  info " :key="index">
                                <view style="display: grid;grid-template-columns: 1fr 1fr 1fr;padding-bottom: 52rpx;">
                                    <view v-for=" l  in  item " :key="l.commendationId"
                                        @click="clickCommendation(l); reSetInternalAndExternal()">
                                        <live-commendation :commendation="l"
                                            :commendation-active-id="commendationActive.commendationId" />
                                    </view>
                                </view>
                            </swiper-item>
                        </swiper>
                    </uni-swiper-dot>
                </template>
            </view>
            <live-description v-if="!isEmpty(commendationActive)" :commendation="commendationActive"
                :enum-name="enumName" />
        </view>

        <live-person :internal="internal" :external="external" :energy-internal="energyInternal"
            :energy-external="energyExternal" @select-person="openSelectPerson" @preview="toPreview(type)"
            :person="person" />
        <live-input @live-input="onLiveInput" title="点赞理由" placeholder="请描述下同事具体的行为表现，表达你的赞赏，详实的理由能让点赞更加真诚哦！" />
        <view class="flex align-center justify-center" style="padding-top: 8rpx;"><live-button message="提交表彰"
                @submit="onBeforeSubmit" /></view>
    </view>


    <uni-popup ref="deptPopup" :is-mask-click="false">
        <view class="popup-content"
            style="width:622rpx;height:292rpx; background: #FFFFFF;border-radius: 24rpx;overflow: hidden;">
            <view
                style=" text-align: center;height: 53rpx;margin-top: 64rpx; font-size: 36rpx;font-weight: 600;color: rgba(0,0,0,0.9);line-height: 53rpx;">
                是否确认发起表彰？
            </view>
            <view class="flex padding-lr-24 justify-between" style="margin-top: 48rpx;">
                <view class="margin-right-12 btn" style="background: #FFF7E8;color: #F7AF6C;" @click="deptClose">取消</view>
                <view class="btn" @click="deptClose(); submitLive(onSubmitColleaguesLive)">确认</view>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import useList from "@c/useList.js"
import { onLoad } from "@dcloudio/uni-app"
import { getDept, getEnum, getCompetenceDimensionList, submitDeptLive } from "@a/live"
import { to } from "await-to-js"
import { noImageDefault } from '@/tools/tool.js'
import useEnergyScore from "@/pages/colleaguesLive/js/useEnergyScore"
import { toSelectPerson } from "@/pages/colleaguesLive/js/page"
import { ref, unref, watch } from 'vue'
import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'
import usePopup from "@c/usePopup.js"
import each from "medash/lib/each"
import useActive from "./js/useActive"
import useSubmitLive from "@/pages/colleaguesLive/js/useSubmitLive"
import isEmpty from 'medash/lib/isEmpty'
import useCommendation from "./js/useCommendation"
import toast from "@/tools/toast"
import toNumber from "medash/lib/toNumber"
import useSwiper from "./js/useSwiper"
import { toPreview } from "@/pages/colleaguesLive/js/page"
import eq from "medash/lib/eq"

const type = 'live-dept'
const ALL = "ALL"
export default {
    setup() {
        const curDept = ref({})
        const { open, close, popupRef } = usePopup()
        const { open: deptOpen, close: deptClose, popupRef: deptPopup } = usePopup()
        const { internal, external, energyInternal, energyExternal, setInternalAndExternal, setEnergyInternalAndExternal } = useEnergyScore()

        const { person, onLiveInput, isCheckTrue, submitLive } = useSubmitLive({
            internal,
            external,
            energyInternal,
            energyExternal
        })

        //    获取部门
        const { list, onLoadList } = useList(async () => {
            const [err, result] = await to(getDept())
            return result
        })

        // 获取枚举
        const { list: enumList, onLoadList: onLoadEnumList } = useList(async () => {
            const [err, result] = await to(getEnum())
            const list = [{ label: '全部', value: ALL }]
            each(result || {}, (key, value) => {
                list.push({ label: value, value: key })
            })
            return list
        })

        // 表彰类型列表
        const { list: competenceDimensionList, onLoadList: onLoadCompetenceDimensionList } = useList(async () => {
            const query = { commendationSource: 'DEPT', competenceDimension: unref(enumActive) }
            if (eq(query.competenceDimension, ALL)) {
                delete query.competenceDimension
            }
            const [err, result] = await to(getCompetenceDimensionList(query))
            return result
        })

        const { enumActive, enumName, selectEnum } = useActive(enumList, onLoadCompetenceDimensionList)

        const { info, change, current } = useSwiper(competenceDimensionList)

        // 选择表彰项
        const { commendationActive, clickCommendation } = useCommendation()

        const reSetInternalAndExternal = () => {
            setInternalAndExternal(unref(person), unref(commendationActive).energy || 0)
        }

        const openSelectPerson = () => {
            toSelectPerson('添加点赞对象', type)
            Cache.set('person', unref(person))
            Cache.set('limit', [Cache.get(BaseDataKey.ACCOUNT_INFO)])
        }

        const onSelect = () => {
            const unrefList = unref(list) || []
            if (unrefList.length < 2) {
                return
            }
            open()
        }

        const onChange = (l) => {
            curDept.value = l
            setEnergyInternalAndExternal(l)
        }

        const onBeforeSubmit = () => {
            if (isEmpty(unref(commendationActive))) {
                toast('表彰对象未选择')
                return
            }
            const isCheck = isCheckTrue()
            if (!isCheck) return
            deptOpen()
        }

        const onSubmitColleaguesLive = async (query) => {
            const { person, inputValue } = query
            const [err, isSuccess] = await to(submitDeptLive({
                applyReason: unref(inputValue),
                commendationId: unref(commendationActive).commendationId,
                deptId: unref(commendationActive).deptId,
                honoreeUserIds: unref(person).map(p => p.userId)
            }))
            if (isSuccess) {
                uni.reLaunch({ url: '/pages/index/index' })
            }
        }

        watch(list, (result) => {
            if (!isEmpty(unref(curDept))) return
            if (result.length === 1) {
                setEnergyInternalAndExternal(result[0])
                curDept.value = result[0]
            }
        })

        onLoad((options) => {
            onLoadList()
            onLoadEnumList()
            if (!isEmpty(options)) {
                const { deptId, deptName, energyExternal, energyInternal } = options
                curDept.value = { deptId, deptName, energyExternal: toNumber(energyExternal), energyInternal: toNumber(energyInternal) }
            }
            Cache.set('person', [])
            uni.$off(type)
            uni.$on(type, (p) => {
                person.value = p
                setInternalAndExternal(p, unref(commendationActive).energy || 0)
                Cache.set('person', p)
            })
        })


        return {
            person,
            enumList,
            list,
            onSelect,
            onChange,
            onBeforeSubmit,
            curDept,
            commendationActive,
            clickCommendation,
            noImageDefault,
            energyInternal,
            energyExternal,
            onLiveInput,
            internal,
            external,
            openSelectPerson,
            onSubmitColleaguesLive,
            open,
            isEmpty,
            close,
            popupRef,
            enumActive,
            selectEnum,
            submitLive,
            deptOpen,
            deptClose,
            deptPopup,
            competenceDimensionList,
            enumName,
            reSetInternalAndExternal,
            info,
            change,
            current,
            toPreview,
            type
        }
    },
}
</script>
<style lang="scss" scoped>
.custom-icon {
    transform: rotate(180);
}

.title {
    font-size: 36rpx;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.9);
    line-height: 36rpx;
}

.description {
    height: 44rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 44rpx;
}

.score {
    font-size: 24rpx;
    font-weight: 400;
    color: #F7AF6C;
}

.enum {
    height: 64rpx;
    padding: 0 32rpx;
    font-size: 28rpx;
    font-weight: 400;
    display: inline-block;
    line-height: 64rpx;
    background: #F3F3F3;
    color: rgba(0, 0, 0, 0.9);
    border-radius: 999px;
    margin-right: 16rpx;
    flex-shrink: 0;

    &.is-active {
        background: #FFF7E8;
        color: #F7AF6C;
    }
}
.enum:first-child {
    margin-left: 32rpx;
}

.enum:last-child {
    margin-right: 32rpx;
}


.btn {
    width: 252rpx;
    height: 80rpx;
    background: #F7AF6C;
    border-radius: 12rpx;
    font-size: 32rpx;
    line-height: 80rpx;
    text-align: center;
    font-weight: 600;
    color: #FFFFFF;
}
</style>