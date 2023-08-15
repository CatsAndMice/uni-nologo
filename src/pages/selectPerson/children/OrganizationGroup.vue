<template>
    <view class="organization bg-white">
        <slot></slot>
    </view>
</template>
<script>
export default {
    setup() {

    },
}
</script>
<style lang="scss" scoped>
.organization {
    margin-bottom: 24rpx;
    padding: 16rpx 16rpx 16rpx 32rpx;
    border-radius: 16rpx;
    overflow: hidden;
}
</style>