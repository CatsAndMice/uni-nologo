<template>
    <view class="live-commendation" :class="commendation.commendationId == commendationActiveId ? 'active' : null"
        @click="onClick">
        <view class="cu-avatar df-warp radius" :style="{
            marginTop: '32rpx',
            width: '142rpx',
            height: '142rpx',
            backgroundColor: 'transparent',
            backgroundImage: `url(${noImageDefault(commendation.commendationIcon)})`
        }"></view>
        <view class="title margin-top-8 line1" style="max-width: 200rpx;">{{ commendation.commendationName }}</view>
        <view class="score"><text style="margin-right: 8rpx;">{{ commendation.score
        }}</text>晶点
        </view>
    </view>
</template>
<script>
import { noImageDefault } from '@/tools/tool.js'
import { toRefs, unref } from 'vue'

export default {
    props: {
        commendation: {
            type: Object,
            default: () => ({})
        },
        commendationActiveId: {
            type: Number,
            default: 0
        }
    },
    emits:['commendation'],
    setup(props, { emit }) {
        const { commendation } = toRefs(props)
        const onClick = () => {
            emit('commendation', unref(commendation))
        }

        return {
            noImageDefault,
            onClick
        }
    },
}
</script>
<style lang="scss" scoped>
.live-commendation {
    width: 228rpx;
    height: 288rpx;
    background: #fff;
    border-radius: 16rpx;
    opacity: 1;
    border: 2rpx solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    &.active {
        border-color: #F7AF6C;
        background: rgba(247, 175, 108, 0.1);
    }
}

.title {
    height: 40rpx;
    font-size: 24rpx;
    margin-top: 8rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
    line-height: 40rpx;
}

.score {
    height: 40rpx;
    font-size: 24rpx;
    font-weight: 600;
    color: #F7AF6C;
    line-height: 40rpx;
}
</style>