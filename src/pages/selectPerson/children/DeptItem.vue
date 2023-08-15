<template>
    <view @click="onClick" class="dept flex justify-between align-center" :class="{
        'is-line': isLine
    }">
        <text>{{ title }}</text>
        <uni-icons type="forward" size="16"></uni-icons>
    </view>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        isLine: {
            type: Boolean,
            default: true
        }
    },
    emits: ['dept-click'],
    setup(props, { emit }) {
        const onClick = () => emit('dept-click')

        return {
            onClick
        }
    },
}
</script>
<style lang="scss" scoped>
.dept {
    height: 108rpx;
    margin-left: 32rpx;
    padding-right: 32rpx;

    &.is-line {
        border-top: 1px solid #F2F3F5;
    }
}
</style>