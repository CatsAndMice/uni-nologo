<template>
    <image class="goods" :src="goodsImage" />
</template>
<script>
import goodsImage from "@/static/goods.png"
export default {
    setup() {
        return {
            goodsImage
        }
    },
}
</script>
<style lang="scss" scoped>
.goods {
    width: 750rpx;
    height: 1768rpx;
}
</style>