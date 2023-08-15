<template>
    <view style="padding-bottom: 100rpx;">
        <live-tooltip message="外部门同事收到表彰会额外获得奖励" />
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
            :energy-external="energyExternal" @select-person="openSelectPerson" :person="person" />
        <live-input @live-input="onLiveInput" title="点赞理由" placeholder="请描述下同事具体的行为表现，表达你的赞赏，详实的理由能让点赞更加真诚哦！" />
        <view class="flex align-center justify-center" style="padding-top: 8rpx;"><live-button message="提交点赞" /></view>
    </view>
</template>
<script>
import useObject from "@c/useObject.js"
import { onLoad } from "@dcloudio/uni-app"
import { getCommendation } from "@a/commend"
import { to } from "await-to-js"
import { noImageDefault } from '@/tools/tool.js'
import useEnergyScore from "@/pages/colleaguesLike/js/useEnergyScore"
import { toSelectPerson } from "@/pages/colleaguesLike/js/page"
import { ref, unref } from 'vue'
import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'

const type = 'live-dept'
export default {
    setup() {
        const person = ref([])
        const inputValue = ref('')
        const { internal, external, energyInternal, energyExternal, setInternalAndExternal } = useEnergyScore()

        const { obj, onLoadObject } = useObject(async () => {
            const [err, result] = await to(getCommendation({ commendationSource: 'DEPT' }))
            return result
        })

        const onLiveInput = (inputValue) => {
            console.log(inputValue)
        }

        const openSelectPerson = () => {
            toSelectPerson('添加点赞对象', type)
            Cache.set('person', unref(person))
            Cache.set('limit', [Cache.get(BaseDataKey.ACCOUNT_INFO)])
        }

        onLoad(() => {
            onLoadObject()
            uni.$off(type)
            uni.$on(type, (p) => {
                person.value = p
                setInternalAndExternal(p, unref(obj).energy || 0)
            })
        })


        return {
            obj,
            person,
            noImageDefault,
            energyInternal,
            energyExternal,
            onLiveInput,
            internal,
            external,
            openSelectPerson
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
</style>