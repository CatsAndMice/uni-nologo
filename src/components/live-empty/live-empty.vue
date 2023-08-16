<template>
    <view class="flex justify-center align-center" style="flex-direction:column">
        <image class="empty" :src="liveEmpty" />
        <view class="margin-top-16" style="font-size: 28rpx;font-weight: 400;color: rgba(0,0,0,0.4);">{{ message }}</view>
    </view>
</template>
<script>
import liveEmpty from "@/static/live-empty.webp"
export default {
    props: {
        message: {
            type: String,
            default: ''
        }
    },
    setup() {

        return {
            liveEmpty
        }
    },
}
</script>
<style lang="scss" scoped>
.empty {
    width: 240rpx;
    height: 240rpx;
}
</style>