<template>
    <view v-for="p in personList" :key="p.userId" class="padding-lr-16 flex justify-between align-center"
        style="height: 112rpx;">
        <view class="flex align-center">
            <base-avatar :src="p.avatar" :name="p.name" width="80rpx" height="80rpx" />
            <text class="margin-left-12">{{ p.name }}</text>
        </view>
        <view class="del" @click="onDelete(p)">
            移除</view>
    </view>
</template>
<script>
import { onShow, onLoad } from "@dcloudio/uni-app"
import { ref, unref } from 'vue'
import Cache from '@/utils/cache.js'

export default {
    setup() {
        const personList = ref([])
        let emitType = ''
        const onDelete = (p) => {
            const index = unref(personList).indexOf(p)
            personList.value.splice(index, 1)
            uni.$emit(emitType, unref(personList))
        }

        onShow(() => {
            personList.value = Cache.get('person') || []
        })

        onLoad(({ type }) => {
            emitType = type
        })

        return {
            personList,
            onDelete
        }
    },
}
</script>
<style lang="scss" scoped>
.del {
    background: #FFFFFF;
    border-radius: 12rpx;
    border: 1px solid #DCDCDC;
    text-align: center;
    font-size: 24rpx;
    font-weight: 400;
    padding: 8rpx 16rpx;
    color: rgba(0, 0, 0, 0.9);
}
</style>