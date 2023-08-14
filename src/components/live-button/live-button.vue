<template>
    <view class="live-button" @click="submit">{{ message }}</view>
</template>
<script>
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    emits: ['submit'],
    setup(props, { emit }) {
        const submit = () => emit('submit')
        return {
            submit
        }
    },
}
</script>
<style lang="scss" scoped>
.live-button {
    width: 194rpx;
    height: 80rpx;
    background-image: url('~@/static/bg-btn.webp');
    background-size: 100% 100%;
    font-size: 32rpx;
    font-weight: 500;
    color: #FFFFFF;
    text-align: center;
    line-height: 80rpx;
}
</style>