<template>
    <view style="background-color: #fff;border-radius:24rpx;overflow: hidden;width: 344rpx;margin-bottom: 16rpx;"
        @click="onClick">
        <view style="border-radius:24rpx;position: relative;">
            <image :src="gift.mainImageUrl" style="border-radius:24rpx;">
            </image>
            <view v-show="eq(gift.exchangeStatus, 'OUT_OF_STOCK')" class="text-white flex justify-center align-center"
                style="position: absolute;font-size: 32rpx;background: rgba(0, 0, 0, 0.45);padding: 24rpx;">
                <text>无库存</text>
            </view>
        </view>
        <view :style="{
            padding: '24rpx',
            color: eq(gift.exchangeStatus, 'OUT_OF_STOCK') ? '#999' : '#333'
        }">
            <view>
                {{ gift.productName }}
            </view>
            <view class="flex justify-between align-center" style="line-height: 24px;margin-top: 10rpx;">
                <view :style="{
            color: eq(gift.exchangeStatus, 'OUT_OF_STOCK') ? '#999' : '#F7AF6C'
        }">
                    <text style="line-height: 24px;font-weight: 500;font-size: 16px;">{{ gift.score || 0 }}</text>
                    <text style="line-height: 22px;font-weight: normal;font-size: 14px;">晶点</text>
                </view>
                <text style="line-height: 22px;font-size: 28rpx;font-weight: normal;color:#999;">剩余{{ gift.stock || 0
                    }}</text>
            </view>
        </view>
    </view>
</template>
<script>
import eq from "medash/lib/eq"
import { exchangeStatus } from "@/utils/type.js"
export default {
    props: {
        gift: {
            type: Object,
            default: () => ({})
        }
    },
    emits: ['to-detail'],
    setup(props, { emit }) {

        const onClick = () => {
            emit('to-detail')
        }

        return {
            onClick,
            eq,
            exchangeStatus
        }
    },
}
</script>
<style lang="scss" scoped></style>