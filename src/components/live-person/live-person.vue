<template>
    <view class="margin-bottom-12 bg-white  person  padding-bottom-8">
        <view class="title padding-lr-16 bg-white"><text style="margin-right: 8rpx;"> 选择点赞对象</text> <uni-icons
                type="help-filled" color="#999999" size="16" /></view>
        <view class="padding-lr-16">
            <!-- 我的能量 -->
            <view class="flex justify-between margin-top-8 item">
                <view style="color: rgba(0, 0, 0, 0.9);">我的能量</view>
                <view class="flex align-center">
                    <view><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{ energyInternal }}</text>内部能量</view>
                    <view class="margin-left-8"><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">{{
                        energyExternal }}</text>外部能量
                    </view>
                </view>
            </view>

            <!-- 我消耗的能量 -->
            <view class="flex justify-between item" style="margin-top: 8rpx;">
                <view style="color: rgba(0, 0, 0, 0.9);">我消耗的能量</view>
                <view class="flex align-center">
                    <view><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">0</text>内部能量</view>
                    <view class="margin-left-8"><text style="margin-right: 4rpx;color: rgba(0, 0, 0, 0.9);">0</text>外部能量
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    props: {
        // 内容能量
        energyInternal: {
            type: Number,
            default: 0
        },
        //外部能量
        energyExternal: {
            type: Number,
            default: 0
        }
    },
    setup() {

    },
}
</script>
<style lang="scss" scoped>
.title {
    height: 96rpx;
    border-bottom: 1px solid #E7E7E7;
    font-size: 32rpx;
    line-height: 96rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
}

.item {
    height: 20px;
    font-size: 12px;
    font-family: PingFang SC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.6);
    line-height: 20px;
}
</style>