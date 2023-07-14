<template>
	<view>
		<view class="content">
			<view class="title-wrap flex" style="margin-left: 24rpx;">
				<view class="title-msg">晶点TOP 5</view>
			</view>
			<view class="bg-white radius-lg margin-lr" style="padding: 24rpx 0;">
				<uni-list :border="false">
					<rank-cell v-for="(item, index) in list" :key="index" :item="item"
						:showSolid="index == list.length - 1 ? false : true" :rank-index="index"></rank-cell>
				</uni-list>
				<uni-load-more v-if="rankLoading" :icon-size="12" iconType="circle" status="loading" />
			</view>
			<view class="title-wrap" style="margin-left: 24rpx;padding: 0;">
				<view class="title-msg">表彰广场</view>
			</view>
			<view class="bg-white" v-for="item in listRef" :key="item.sourceId" style="margin-bottom: 16rpx;">
				<view class="flex align-center justify-between padding-lr-12 padding-top-12">
					<view v-if="isArray(item.userList) && eq(item.userList.length, 1)" class="flex align-center">
						<view class="cu-avatar bg-white margin-auto-tb round"
							:style="'background-image:url(' + noAvatarDefault(item.userList[0].avatar) + ')'">
						</view>
						<view class="margin-left-12">
							<view style="font-size: 28rpx;font-weight: 500;color: #1D2129;">{{ item.userList[0].name }}
							</view>
							<view style="font-size: 20rpx;font-weight: 400;color: #A9AEB8;">{{ item.userList[0].deptName }}
							</view>
						</view>
					</view>

					<view v-else class="flex align-center">
						<view class="cu-avatar-group margin-auto-tb">
							<view v-for="u in item.userList" :key="u.userId" class="cu-avatar bg-white round"
								:style="'background-image:url(' + noAvatarDefault(u.avatar) + ')'">
							</view>
						</view>
						<view class="margin-left-12">
							<view style="font-size: 28rpx;font-weight: 500;color: #1D2129;">
								等{{ item.userList.length }}位同事
							</view>
						</view>
					</view>

					<view class="text-c-msg text-sm">{{ formatDateTimeMDS(item.distributeTime) }}</view>
				</view>
				<get-commend-cell :item="item" custom-class="card" :is-show-time="false">
					<view class="flex align-center justify-between"
						style="border-radius: 16rpx;background-color: #F7F8FA;height: 104rpx;margin-top: 20rpx;">
						<view class="flex align-center">
							<view class="margin-auto-lr margin-lr-12" style="width: 80rpx;height: 80rpx;">
								<view class="cu-avatar df-warp radius bg-white"
									:style="'background-image:url(' + noImageDefault(item.commendationIcon) + ')'"></view>
							</view>

							<view class="margin-auto-tb">
								<view class="flex  margin-auto-tb">
									<view class="text-lg text-bold">{{ item.commendationName }}</view>
								</view>
							</view>
						</view>
						<view class="rank-score">
							{{ '+' + item.score }}
						</view>
					</view>
				</get-commend-cell>
			</view>
			<uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
		</view>

		<j-tabbar fixed fill safeBottom current="2" :tabbar="tabbar"></j-tabbar>
	</view>
</template>

<script>
import TabbarConfig from '@/config/tabbar.js'
import { defineComponent, reactive } from 'vue'
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
import { getRankTotal, getCommendation } from '../../api/rank'
import { RecordType } from '../../utils/type'
import useList from '@c/useList'
import useInfiniteScroll from '@c/useInfiniteScroll'
import { to } from "await-to-js"
import isEmpty from 'medash/lib/isEmpty'
import { formatDateTimeMDS, noImageDefault, noAvatarDefault } from '../../tools/tool.js'
import isArray from 'medash/lib/isArray'
import eq from 'medash/lib/eq'

export default defineComponent({
	setup() {
		const tabbar = reactive(TabbarConfig)
		const query = { page: 1, size: 20 }
		const { loading, listRef, onLoad: onInfiniteScrollLoad } = useInfiniteScroll(query, async (params) => {
			const [err, result] = await to(getCommendation(params))
			return result
		})

		const { list, onLoadList, loading: rankLoading } = useList(async () => {
			let query = { accountType: RecordType.JINGDIAN, page: 1, size: 5 }
			const [err, result] = await to(getRankTotal(query))
			if (!isEmpty(result)) return result.data
			return []
		})

		onReachBottom(onInfiniteScrollLoad)

		onLoad(() => {
			onLoadList()
			onInfiniteScrollLoad()
		})

		return {
			tabbar,
			list,
			listRef,
			loading,
			noImageDefault,
			noAvatarDefault,
			rankLoading,
			formatDateTimeMDS,
			isArray,
			eq
		}
	}
})
</script>
<style lang="scss">
.content {
	background-image: url('../../static/home/home_hearder_bg@2x.png');
	background-size: 100vw 496rpx;
	background-repeat: no-repeat;
	padding-bottom: 170rpx;
}

.radius-top {
	border-top-left-radius: 10rpx;
	border-top-right-radius: 10rpx;
}


.nav-msg {
	font-size: 32rpx;
	height: 88rpx;
	line-height: 88rpx;
	color: #191919;
	font-weight: Semibold;
	text-align: center;
	width: 100%;
}

.list-wrap {
	background-color: #ffffff;
	margin: 40rpx auto;
	border-radius: 10rpx;
	width: calc(100vw - 48rpx);
	min-height: calc(100vh - 310rpx - env(safe-area-inset-bottom));
	margin-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.bottom-warp {
	margin-bottom: calc(140rpx + env(safe-area-inset-bottom));
}

.title-wrap {
	height: 88rpx;
	line-height: 88rpx;
	padding-top: 188rpx;
	box-sizing: content-box;

	.title-msg {
		font-size: 32rpx;
		font-weight: 500;
	}
}

.card {
	margin: 0;
	margin-bottom: 0 !important;
}

.rank-score {
	color: #FFA24A;
	font-size: 40rpx;
	font-weight: 500;
	margin-right: 24rpx;
}
</style>