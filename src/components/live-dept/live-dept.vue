<template>
    <view class="live-dept padding-lr-16 flex justify-between align-center" :style="customStyle">
        <text class="title">表彰发起部门</text>
        <view class="flex align-center" @click="selectDept">
            <text style="margin-right: 8rpx; font-size: 32rpx;font-weight: 400;color: rgba(0,0,0,0.4);">{{ deptName
            }}</text>
            <uni-icons color="rgba(0,0,0,0.4)" type="forward" size="24" />
        </view>
    </view>
</template>
<script>
export default {
    props: {
        customStyle: {
            type: Object,
            default: () => ({})
        },
        deptName: {
            type: String,
            default: ''
        }
    },
    emits: ['select'],
    setup(props, { emit }) {
        const selectDept = () => {
            emit('select')
        }
        return {
            selectDept
        }
    },
}
</script>
<style lang="scss" scoped>
.title {
    font-size: 32rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
}

.live-dept {
    height: 112rpx;
    background: #FFFFFF;
}
</style>