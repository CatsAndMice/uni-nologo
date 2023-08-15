<template>
    <view class="margin-bottom-16" style=" height: 96rpx; "></view>
    <view class="header flex align-center padding-lr-16 ">
        <view class="flex align-center" style="transform: rotate(180deg);">
            <uni-icons color="#FF8917" type="info-filled" size="22" />
        </view>
        <text class="margin-left-8 line-height-22"
            style="height: 44rpx;font-size: 28rpx;font-weight: 400;color: rgba(0,0,0,0.9);">{{ message }}</text>
    </view>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.header {
    width: 100vw;
    position: fixed;
    left: 0;
    top: 0;
    height: 96rpx;
    z-index: 999;
    background: #FFF7E8;
}
</style>