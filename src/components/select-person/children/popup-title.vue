<template>
    <view class="flex justify-between align-center bg-white" style="padding: 0 32rpx;height: 88rpx;">
        <view style="font-weight: 500;font-size: 36rpx;color: #1D2129;">
            <slot>{{ title }}</slot>
        </view>
        <view @click="onSure" style="color: #0057FF;">确定</view>
    </view>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const onSure = () => emit('submit')

        return {
            onSure
        }
    },
}
</script>