<template>
    <view class="flex align-center" :style="customStyle">
        <image v-if="src" :class="{ 'round': isRound }" :style="{
            width,
            height
        }" :mode="mode" :src="src">
        </image>
        <view v-else class="cu-avatar bg-blue" :class="{ 'round': isRound }" :style="{
            width,
            height
        }">
            <text class="avatar-text">{{ getName(name) }}</text>
        </view>
    </view>
</template>
<script>
import isNull from 'medash/lib/isNull'
export default {
    props: {
        mode: {
            type: String,
            default: 'scaleToFill'
        },
        width: {
            type: String,
            default: '48rpx'
        },
        height: {
            type: String,
            default: '48rpx'
        },
        src: {
            type: String,
            default: ''
        },
        name: {
            type: String,
            default: '佚名'
        },
        isRound: {
            type: Boolean,
            default: true
        },
        customStyle:{
            type:Object,
            default:()=>({})
        }
    },
    setup() {
        const getName = (name = '') => {
            if (isNull(name)) return '无'
            return name.slice(-2)
        }

        return {
            getName
        }
    }

}
</script>