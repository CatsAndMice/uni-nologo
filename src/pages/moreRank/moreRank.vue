<template>
    <uni-list :border="false" style="margin-bottom:214rpx">
        <view class="content">
            <rank-cell v-for="(item, index) in listRef" :key="index" :item="item" :showSolid="false"
                :rank-index="item.rank - 1" @click-record="toUserInfoPage(item.userId)" />
            <uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
            <no-data-wrap v-if="!loading && isEmpty(listRef)" :top='100' />
        </view>
    </uni-list>
    <view class="fixed bg-white">
        <view style="background: #FFF7E8;box-shadow: 0px 4px 8px 0px rgba(151,98,0,0.1);margin: 0 32rpx;">
            <rank-cell :item="rankingUser" :showSolid="false" :rank-index="rankingUser.rank - 1"
                @click-record="toUserInfoPage(rankingUser.userId)" />
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
import { userData } from '../../stores/userData.js'
import { storeToRefs } from 'pinia'
import { unref, ref } from "vue"

export default {
    setup() {
        const rankingUser = ref({})
        const userPData = userData()
        const { userInfo } = storeToRefs(userPData)
        let query = { accountType: RecordType.JINGDIAN, page: 1, size: 20, userId: unref(userInfo).userId }
        const { loading, listRef, onLoad: onInfiniteScrollLoad, hasMore } = useInfiniteScroll(query, async () => {
            const [err, result] = await to(getRankTotal(query))
            console.log(result);
            if (!isEmpty(result)) {
                rankingUser.value = result.rankingUser
                return result.userPage
            }
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
            toUserInfoPage,
            rankingUser
        }
    },
}
</script>
<style lang="scss" scoped>
.content {
    margin: 0 32rpx;
}

.fixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    height: 214rpx;
}
</style>