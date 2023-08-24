<template>
    <view class="card padding-tb-12 padding-lr-16" style="border-top: 1px solid #E7E7E7;">
        <view style="height: 44rpx;" class="flex justify-between align-center margin-bottom-8">
            <view class="flex align-center">
                <view style="font-size: 28rpx;font-weight: 600;color: rgba(0,0,0,0.9);">{{ commendation.commendationName }}
                </view>
                <view class="margin-left-8"
                    style="color: #F77234;height: 40rpx;background: #FFF3E8;border-radius: 6rpx;padding: 0 12rpx;font-size: 20rpx;line-height: 40rpx;text-align: center;">
                    {{ enumName }}</view>
            </view>
            <view style="font-size: 24rpx;font-weight: 400;color: rgba(0,0,0,0.4);">每人次消耗<text
                    style="margin: 0 8rpx;color: #F7AF6C;">{{ commendation.energy }}</text> 能量</view>
        </view>
        <view style="font-size: 24rpx;font-weight: 400;color: rgba(0,0,0,0.6);line-height: 40rpx;">
            {{ commendation.commendationDescription }}</view>
    </view>
</template>
<script>
export default {
    props: {
        commendation: {
            type: Object,
            default: () => ({})
        },
        enumName: {
            type: String,
            default: ''
        }
    },
    setup() {

    },
}
</script>
