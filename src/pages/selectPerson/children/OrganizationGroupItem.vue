<template>
    <view class="organization-group-item flex align-center" :style="{
        height
    }">
        <slot> <base-avatar :src="src" width="64rpx" height="64rpx" :is-round="false" /></slot>
        <text :style="{ marginLeft: '24rpx', ...titleStyle }">{{ title }}</text>
    </view>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: '',
        },
        src: {
            type: String,
            default: '',
        },
        titleStyle: {
            type: Object,
            default: () => ({}),
        },
        height: {
            type: String,
            default: '',
        }
    },
    setup() {

    },
}
</script>
<style lang="scss" scoped>
.organization-group-item {
    background-color: #fff;
}
</style>