<template>
    <view class="popup-content">
        <view style="position: absolute;top: 32rpx;right: 32rpx;"><uni-icons type="closeempty" color="rgba(0,0,0,0.9)"
                size="24" @click="onClose" /></view>
        <view class=" title">{{ title }}</view>
        <view class="padding-lr-24">
            <view v-for="l in list" :key="l.deptId" class="item padding-lr-16 "
                :class="deptId == l.deptId ? 'is-active' : null" @click="onActive(l)">
                {{ l.deptName }}
                <image class="image" :src="isSelectImage" />
            </view>
        </view>
    </view>
</template>
<script>
import isSelectImage from "@/static/is-select.png"
export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        list: {
            type: Array,
            default: () => ([])
        },
        deptId: {
            type: String,
            default: ''
        }
    },
    emits: ['close', 'change'],
    setup(props, { emit }) {
        const onClose = () => {
            emit('close')
        }

        const onActive = (dept) => {
            emit('change', dept)
            onClose()
        }

        return {
            onClose,
            isSelectImage,
            onActive
        }
    },
}
</script>
<style lang="scss" scoped>
.popup-content {
    width: 480rpx;
    position: relative;
    background-color: #fff;
    z-index: 9999;
    padding-top: 64rpx;
    border-radius: 24rpx;
    padding-bottom: 24rpx;
}

.title {
    height: 52rpx;
    font-size: 36rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    line-height: 52rpx;
    text-align: center;
    padding-bottom: 48rpx;
    box-sizing: content-box;
}

.item {
    height: 112rpx;
    background: #EEEEEE;
    border-radius: 12rpx;
    line-height: 112rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 24rpx;
    border: 4rpx solid transparent;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    &.is-active {
        border-color: #F7AF6C;
        background-color: #fff;

        .image {
            opacity: 1;
        }
    }

    .image {
        position: absolute;
        opacity: 0;
        top: -4rpx;
        left: -4rpx;
        width: 56rpx;
        height: 56rpx;
    }
}
</style>