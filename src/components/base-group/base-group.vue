<template>
    <view class="card bg-white " :style="{ height }">
        <view class="title">{{ title }}</view>
        <scroll-view :style="{ padding: '0 16rpx', height: `calc(${height} - 56rpx)` }" @scrolltolower="onLoad"
            scroll-y="true">
            <view style="height: 16rpx;"> </view>
            <slot></slot>


        </scroll-view>
    </view>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        height: {
            type: String,
            default: ''
        }
    },
    emits: ['scroll'],
    setup(props, { emit }) {
        const onLoad = () => {
            console.log(111);
            emit('scroll')
        }
        return {
            onLoad,

        }
    }
}
</script>
<style lang="scss" scoped>
.card {
    width: 344rpx;
    border-radius: 16rpx;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.1);
}

.title {
    height: 56rpx;
    font-size: 24rpx;
    line-height: 56rpx;
    font-weight: 500;
    color: #4E5969;
    padding-left: 16rpx;
    border-bottom: 2rpx solid #E5E6EB;
}
</style>