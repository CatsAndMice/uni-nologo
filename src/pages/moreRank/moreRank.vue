<template>
    <uni-list :border="false">
        <view class="content">
            <rank-cell v-for="(item, index) in listRef" :key="index" :item="item" :showSolid="false" :rank-index="index"
                @click-record="toUserInfoPage(item.userId)" />
            <uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
            <no-data-wrap v-if="!loading && isEmpty(listRef)" :top='100' />
        </view>
    </uni-list>

    <view class="fixed bg-white">
        <view style="background: #FFF7E8;box-shadow: 0px 4px 8px 0px rgba(151,98,0,0.1);margin: 0 32rpx;">
            <rank-cell :item="{
                avatar: 'https://static-legacy.dingtalk.com/media/lADPDhJzuyYLpT3NA1DNAyk_809_848.jpg', deptName: '质量部',
                name: '吴艳文', rank: 1, userId: 287193332846725, value: 3719
            }" :showSolid="false" :rank-index="1" @click-record="toUserInfoPage(item.userId)" />
        </view>
    </view>
</template>
<script>
import { getRankTotal } from '../../api/rank'
import { RecordType } from '../../utils/type'
import useInfiniteScroll from '@c/useInfiniteScroll'
import isEmpty from 'medash/lib/isEmpty'
import { toUserInfoPage } from "../squarePage/js/page"
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
import { to } from "await-to-js"

export default {
    setup() {
        let query = { accountType: RecordType.JINGDIAN, page: 1, size: 20 }
        const { loading, listRef, onLoad: onInfiniteScrollLoad, hasMore } = useInfiniteScroll(query, async () => {
            const [err, result] = await to(getRankTotal(query))
            if (!isEmpty(result)) return result
            return []
        })
        onReachBottom(onInfiniteScrollLoad)
        onLoad(() => {
            onInfiniteScrollLoad()
        })

        return {
            loading,
            listRef,
            onInfiniteScrollLoad,
            hasMore,
            isEmpty,
            toUserInfoPage
        }
    },
}
</script>
<style lang="scss" scoped>
.content {
    margin:0 32rpx;
    padding-bottom: 214rpx;
}

.fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 214rpx;
}
</style>