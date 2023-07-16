<template>
    <view class="padding-lr-12 content">
        <view class="flex align-center" style=" height: 156rpx;margin: 0 -24rpx;">
            <user-header :avatar='noEmpty(obj.avatar)' :name='noEmpty(obj.name)' :level='noEmpty(obj.currentLevel)'
                avatar-size="120rpx">
                <view style="font-size: 24rpx;font-weight: 400;color: #A9AEB8;margin-top: 8rpx;">{{ noEmpty(obj.deptName) }}
                </view>
            </user-header>
        </view>
        <view class="title-wrap" :class="{
            'is-top': isTop
        }">
            <view class="title-msg">个人表彰动态</view>
        </view>
        <view style="margin: 0 -24rpx;">
            <get-commend-cell custom-style="padding-left: 24rpx;padding-right: 24rpx;" :is-margin="false" v-for="(item, index) in listRef"
                :key="index" :item="item">
                <view class="flex align-center justify-between"
                    style="border-radius: 16rpx;height: 104rpx;margin-top: 20rpx;">
                    <view class="flex align-center">
                        <view class="margin-auto-lr " style="width: 80rpx;height: 80rpx;">
                            <view class="cu-avatar df-warp radius bg-white"
                                :style="'background-image:url(' + noImageDefault(item.commendationIcon) + ')'"></view>
                        </view>

                        <view class="margin-auto-tb margin-lr-12">
                            <view class="flex  margin-auto-tb">
                                <view class="text-lg text-bold">{{ item.commendationName }}</view>
                            </view>
                        </view>
                    </view>
                    <view class="rank-score">
                        {{ '+' + item.score }}
                    </view>
                </view>
            </get-commend-cell>
            <uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
        </view>
    </view>
</template>
<script>
import { onLoad, onReachBottom, onPageScroll } from "@dcloudio/uni-app"
import { getAccountDetail } from "@a/account"
import { getCommendation } from "@a/rank"
import { to } from "await-to-js"
import useObject from "@c/useObject"
import eq from "medash/lib/eq"
import isEmpty from "medash/lib/isEmpty"
import { noEmpty } from '../../tools/tool.js'
import useInfiniteScroll from '@c/useInfiniteScroll'
import { RecordType } from '../../utils/type'
import { noImageDefault } from '../../tools/tool.js'
import { ref, onMounted } from "vue"
import lte from "medash/lib/lte"
export default {
    setup() {
        let userId = '',
            el = null
        const isTop = ref(false)
        const query = { page: 1, size: 20, accountType: RecordType.JINGDIAN }
        const { loading, listRef, onLoad: onInfiniteScrollLoad } = useInfiniteScroll(query, async (params) => {
            params.userId = userId
            const [err, result] = await to(getCommendation(params))
            return result
        })

        const { obj, onLoadObject } = useObject(async () => {
            if (isEmpty(userId)) return {}
            const [err, result] = await to(getAccountDetail(userId))
            if (isEmpty(result)) return {}
            if (eq(result.code, 200)) {
                return result.data
            }
            return {}
        })

        onReachBottom(onInfiniteScrollLoad)

        onPageScroll(() => {
            if (isEmpty(el)) return
            el.boundingClientRect(data => {
                if (lte(data.top, 35)) {
                    isTop.value = true
                } else {
                    isTop.value = false
                }
            }).exec();
        })

        onMounted(() => {
            const query = uni.createSelectorQuery();
            el = query.select('.title-wrap')
        })

        onLoad(async (options) => {
            userId = options.userId
            onLoadObject()
            onInfiniteScrollLoad()

        })

        return {
            obj,
            noEmpty,
            loading,
            listRef,
            noImageDefault,
            isTop
        }
    },
}
</script>
<style lang="scss" scoped>
.content {
    background-image: url('../../static/home/home_hearder_bg@2x.png');
    background-size: 100vw 300rpx;
    background-repeat: no-repeat;
    padding-top: 176rpx;
}

.title-wrap {
    height: 88rpx;
    line-height: 88rpx;
    box-sizing: content-box;
    position: sticky;
    padding-top: 48rpx;
    top: 0;
    z-index: 999;

    &.is-top {
        padding-top: 176rpx;
        background-color: #F7F8FA;
    }

    .title-msg {
        font-size: 32rpx;
        font-weight: 500;
    }
}

.rank-score {
    color: #FFA24A;
    font-size: 40rpx;
    font-weight: 500;
}
</style>