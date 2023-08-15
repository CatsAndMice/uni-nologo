<template>
    <view class="flex align-center item" :style="customStyle">
        <base-avatar width="64rpx" height="64rpx" :src="avatar" :name="name"></base-avatar>
        <view style="margin-left: 24rpx;font-size: 32rpx">
            <view>{{ name }}</view>
            <slot></slot>
        </view>
        <slot name="right"></slot>
    </view>
</template>
<script>
import { defineComponent } from "vue"

export default defineComponent({
    props: {
        avatar: {
            type: String,
            default: ""
        },
        name: {
            type: String,
            default: ""
        },
        customStyle: {
            type: Object,
            default: () => ({
                height: '108rpx'
            })
        }
    }
})
</script>
<style lang="scss" scoped>
.item {
    border-top: 2rpx solid #F2F3F5;
    color: #1D2129;
}
</style>