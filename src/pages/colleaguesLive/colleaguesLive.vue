<template>
    <view style="padding-bottom: 100rpx;">
        <live-tooltip message="外部门同事收到表彰会额外获得奖励" custom-class="margin-bottom-16" />
        <view class="margin-bottom-16 margin-lr-12 padding-tb-16 bg-white flex align-center"
            style="border-radius: 18rpx;flex-direction: column;">
            <view class="cu-avatar df-warp radius" :style="{
                width: '176rpx',
                height: '176rpx',
                backgroundImage: `url(${noImageDefault(obj.commendationIcon)})`
            }"></view>
            <view class="title margin-top-8">{{ obj.commendationName }}</view>
            <view class="margin-tb-8 description">{{ obj.commendationDescription }}</view>
            <view class="score"><text style="font-size: 40rpx;font-weight: bold;margin-right: 8rpx;">{{ obj.score
            }}</text>晶点
            </view>
        </view>
        <live-person :internal="internal" :external="external" :energy-internal="energyInternal"
            :energy-external="energyExternal" @select-person="openSelectPerson" :person="person"
            @preview="toPreview(type)" />
        <live-input @live-input="onLiveInput" title="点赞理由" placeholder="请描述下同事具体的行为表现，表达你的赞赏，详实的理由能让点赞更加真诚哦！" />
        <view class="flex align-center justify-center" style="padding-top: 8rpx;"><live-button message="提交点赞"
                @submit="onBeforeSubmit" /></view>
    </view>
    <uni-popup ref="popupRef" :is-mask-click="false">
        <view class="popup-content"
            style="width:622rpx;height:292rpx; background: #FFFFFF;border-radius: 24rpx;overflow: hidden;">
            <view
                style=" text-align: center;height: 53rpx;margin-top: 64rpx; font-size: 36rpx;font-weight: 600;color: rgba(0,0,0,0.9);line-height: 53rpx;">
                是否确认提交同事点赞？
            </view>
            <view class="flex padding-lr-24 justify-between" style="margin-top: 48rpx;">
                <view class="margin-right-12 btn" style="background: #FFF7E8;color: #F7AF6C;" @click="close">取消</view>
                <view class="btn" @click="close(); submitLive(onSubmitColleaguesLive)">确认</view>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import useObject from "@c/useObject.js"
import { onLoad } from "@dcloudio/uni-app"
import { getCommendation } from "@a/commend"
import { to } from "await-to-js"
import { noImageDefault } from '@/tools/tool.js'
import useEnergyScore from "./js/useEnergyScore"
import { toSelectPerson, toPreview } from "./js/page"
import { unref } from 'vue'
import { BaseDataKey } from '@/utils/type.js'
import useSubmitLive from "./js/useSubmitLive"
import usePopup from "@c/usePopup.js"
import { submitColleaguesLive } from "@a/live.js"
import Cache from '@/utils/cache.js'

const type = 'live-colleague'
export default {
    setup() {
        const { open, close, popupRef } = usePopup()
        const { internal, external, energyInternal, energyExternal, setInternalAndExternal } = useEnergyScore()
        const { person, onLiveInput, isCheckTrue, submitLive } = useSubmitLive({
            internal,
            external,
            energyInternal,
            energyExternal
        })

        const { obj, onLoadObject } = useObject(async () => {
            const [err, result] = await to(getCommendation({ commendationSource: 'LIKE' }))
            return result
        })

        const openSelectPerson = () => {
            toSelectPerson('添加点赞对象', type)
            Cache.set('limit', [Cache.get(BaseDataKey.ACCOUNT_INFO)])
        }

        const onBeforeSubmit = () => {
            const isCheck = isCheckTrue()
            if (!isCheck) return
            open()
        }

        const onSubmitColleaguesLive = async (query) => {
            const { person, inputValue } = query
            const [err, isSuccess] = await to(submitColleaguesLive({
                applyReason: unref(inputValue),
                commendationId: unref(obj).commendationId,
                honoreeUserIds: unref(person).map(p => p.userId)
            }))
            if (isSuccess) {
                uni.reLaunch({ url: '/pages/index/index' })
            }
        }

        onLoad(() => {
            onLoadObject()
            Cache.set('person', [])
            uni.$off(type)
            uni.$on(type, (p) => {
                person.value = p
                setInternalAndExternal(p, unref(obj).energy || 0)
                Cache.set('person', p)
            })
        })


        return {
            obj,
            person,
            type,
            toPreview,
            noImageDefault,
            energyInternal,
            energyExternal,
            onLiveInput,
            internal,
            external,
            openSelectPerson,
            submitLive,
            open,
            close,
            popupRef,
            onBeforeSubmit,
            onSubmitColleaguesLive
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