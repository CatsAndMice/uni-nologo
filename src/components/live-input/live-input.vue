<template>
    <view class="margin-bottom-12 bg-white bg-white  padding-bottom-8">
        <view class="title padding-lr-16 bg-white"><text style="margin-right: 8rpx;">{{ title }}</text></view>
        <view class="padding-top-12 padding-lr-16" style="padding-bottom: 8rpx;">
            <uni-easyinput type="textarea" placeholder-style="font-size: 28rpx;
font-weight: 400;
color: rgba(0,0,0,0.26);
line-height: 44rpx;" :input-border="false" maxlength="200" v-model="inputValue" :placeholder="placeholder"
                @input="onInput"></uni-easyinput>
        </view>
    </view>
</template>
<script>
import { ref, unref } from "vue"

export default {
    props: {
        title: {
            type: String,
            default: ''
        },
        placeholder: {
            type: String,
            default: ''
        }
    },
    emits: ['live-input'],
    setup(props, { emit }) {
        const inputValue = ref('')
        const onInput = () => {
            emit('live-input', unref(inputValue))
        }

        return {
            inputValue,
            onInput
        }
    },
}
</script>
<style lang="scss" scoped>
.title {
    height: 96rpx;
    border-bottom: 1px solid #E7E7E7;
    font-size: 32rpx;
    line-height: 96rpx;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.9);
}
</style>
