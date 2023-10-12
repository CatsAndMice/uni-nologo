<template>
	<view :class="show ? 'is-hidden' : null">
		<view class="content">
			<view class="title-wrap flex" style="margin-left: 24rpx;">
				<view class="title-msg">晶点TOP 5</view>
			</view>
			<view class="bg-white radius-lg margin-lr" style="padding: 24rpx 0 0 0;margin-bottom: 32rpx;overflow: hidden;">
				<uni-list :border="false">
					<rank-cell v-for="(item, index) in list" :key="index" :item="item" :showSolid="false"
						:rank-index="item.rank - 1" @click-record="toUserInfoPage(item.userId)" />

					<view style="background: #FFF7E8;position: relative;">
						<image :src="meImage" style="width: 72rpx;height: 48rpx;position: absolute;top: 0;left: 0;" />
						<rank-cell :item="rankingUser" :showSolid="false" :rank-index="rankingUser.rank - 1"
							@click-record="toUserInfoPage(rankingUser.userId)" />
					</view>

					<view @click="toMoreRankPage" class="text-center radius-lg"
						style="height: 88rpx;line-height: 88rpx;overflow: hidden;color: rgba(0,0,0,0.4);font-size: 24rpx;">
						查看更多排名 <uni-icons type="forward" size="12" color="rgba(0,0,0,0.4)"></uni-icons>
					</view>
				</uni-list>
				<uni-load-more v-if="rankLoading" :icon-size="12" iconType="circle" status="loading" />
			</view>
			<view class="title-wrap" style="padding-left: 24rpx;">
				<view class="title-msg">表彰广场</view>
			</view>

			<view class="bg-white" v-for="item in listRef" :key="item.sourceId" style="margin-bottom: 16rpx;">
				<view class="flex align-center justify-between padding-lr-12 padding-top-12">
					<view v-if="isArray(item.userList) && eq(item.userList.length, 1)" class="flex align-center"
						@click="toUserInfoPage(item.userList[0].userId)">
						<view class="cu-avatar bg-white margin-auto-tb round" :style="{
							backgroundImage: `url(${noAvatarDefault(item.userList[0].avatar)})`,
							width: '80rpx',
							height: '80rpx'
						}
							">
						</view>
						<view class="margin-left-12">
							<view style="font-size: 28rpx;font-weight: 500;color: #1D2129;line-height: 44rpx;">{{
								item.userList[0].name }}
							</view>
							<view style="font-size: 20rpx;font-weight: 400;color: #A9AEB8;line-height: 32rpx;">{{
								item.userList[0].deptName }}
							</view>
						</view>
					</view>

					<view v-else class="flex align-center" @click="onLookUsers(item)">
						<view class="cu-avatar-group margin-left-12" style="padding: 0;">
							<view v-for="u in getTwoUsers(item.userList)" :key="u.userId" class="cu-avatar bg-white round"
								:style="{
									backgroundImage: `url(${noAvatarDefault(u.avatar)})`,
									width: '80rpx',
									height: '80rpx',
									borderColor: '#fff',
									marginLeft: '-16rpx'
								}
									">
							</view>
						</view>
						<view class="margin-left-12">
							<view style="font-size: 28rpx;font-weight: 500;color: #1D2129;">
								等{{ item.userList?.length }}位同事
							</view>
						</view>
					</view>

					<view class="text-c-msg text-sm">{{ formatDateTimeMDS(item.distributeTime) }}</view>
				</view>
				<get-commend-cell :item="item" custom-class="card" :is-show-time="false" :is-margin="false">
					<view class="flex align-center justify-between"
						style="border-radius: 12rpx;background-color: #F7F8FA;height: 176rpx;margin-top: 20rpx;">

						<view class="margin-auto-lr margin-lr-12" style="flex-shrink: 0;">
							<view class="cu-avatar df-warp radius" :style="{
								width: '128rpx',
								height: '128rpx',
								backgroundColor: '#F7F8FA',
								backgroundImage: `url(${noImageDefault(item.commendationIcon)})`
							}"></view>
						</view>
						<view class="margin-auto-tb text-lg text-bold line1 text-left" style="flex-grow: 1;">
							{{ item.commendationName }}
						</view>
						<view class="rank-score line1 margin-left-8" style="white-space: nowrap;flex-shrink: 0;">
							{{ '+' + getScore(item) }}
							<text class="margin-left-8 line1">晶点</text>
						</view>
					</view>

					<template #initiator>
						<view v-show="['DEPT', 'LIKE'].includes(item.source)" class="flex align-center"
							style="border-radius: 6rpx;border: 2rpx solid #F7AF6C;">
							<view
								style="width: 104rpx;height: 48rpx;line-height: 48rpx;text-align: center; background: #F7AF6C;font-size: 24rpx;font-weight: 600;color: #FFFFFF;">
								提名人</view>
							<view class="padding-lr-16" style="font-size: 24rpx;font-weight: 400;">{{
								item.initiator.deptName + '-' + item.initiator.name }}</view>
						</view>
					</template>

					<template #reason>
						<view class="flex  margin-top-8" v-show="item.distributeReason">
							<view class="commend-msg">{{ item.distributeReason }}</view>
						</view>
					</template>
				</get-commend-cell>
			</view>
			<no-data-wrap v-if="!loading && isEmpty(listRef)" :top='100' />
			<uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
			<view v-show="!isEmpty(listRef) && !hasMore"
				style="height: 40rpx;font-size: 24rpx;font-weight: 400;color: rgba(0,0,0,0.4);line-height: 40rpx;text-align: center;">
				到底啦，展示近3个月的表彰动态…</view>
		</view>
		<j-tabbar fixed fill safeBottom current="2" :tabbar="tabbar" @click-center="openModal"></j-tabbar>
		<commend-item-popup :show='showModal' @close="closeModal" />
	</view>
	<uni-popup ref="popupRef" type="bottom" :z-index="9999" :is-mask-click="false">
		<view class="popup-content bg-white" style="height:1148rpx;border-radius: 16rpx 16rpx 0 0;overflow: hidden;">
			<view class="text-center"
				style="height: 88rpx;line-height: 88rpx;color:#1D2129;font-size: 32rpx;font-weight: 500;position: relative;">
				表彰名单
				<view @click="close" class="round flex align-center justify-center"
					style="background-color: #F2F3F5;position: absolute;width: 54rpx;height: 54rpx;top: 50%;right: 32rpx;transform: translateY(-50%);">
					<uni-icons type="closeempty" size="24" color="#A9AEB8;"></uni-icons>
				</view>
				<view class="grid col-4 padding-lr-xl" style="padding-top: 20rpx;max-height: 1060rpx;overflow: scroll;">
					<view class="flex justify-start align-center" @click="toUserInfoPage(p.userId)"
						style="flex-direction: column;margin-bottom: 64rpx;" v-for="p in persons" :key="p.userId">
						<view class="cu-avatar bg-white margin-auto-tb round"
							:style="'background-image:url(' + noAvatarDefault(p.avatar) + ')'">
						</view>
						<view
							style="font-size: 28rpx;font-weight: 400;line-height: 44rpx;margin-top: 8rpx;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;max-width: 158rpx;">
							{{ p.name }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import TabbarConfig from '@/config/tabbar.js'
import { defineComponent, reactive, unref, ref } from 'vue'
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
import { toUserInfoPage, toMoreRankPage } from "./js/page"
import usePopup from "@c/usePopup"
import usePersonList from "./js/usePersonList"
import YWJATRACK from "@/config/jstrack.js"
import useModal from "@/pages/index/js/useModal"
import getScore from '@/utils/getScore'
import meImage from "@/static/square/me.webp"
import { userData } from '../../stores/userData.js'
import { storeToRefs } from 'pinia'

const MARCH_TIME = 90 * 1000 * 60 * 60 * 24
export default defineComponent({
	setup() {
		const tabbar = reactive(TabbarConfig)
		const userPData = userData()
		const { userInfo } = storeToRefs(userPData)
		const query = {
			page: 1,
			size: 20,
			startTime: Date.now() - MARCH_TIME,
			endTime: Date.now()
		}
		const rankingUser = ref({})
		const { loading, listRef, onLoad: onInfiniteScrollLoad, hasMore } = useInfiniteScroll(query, async (params) => {
			const [err, result] = await to(getCommendation(params))
			return result
		})

		const { list, onLoadList, loading: rankLoading } = useList(async () => {
			let query = { accountType: RecordType.JINGDIAN, page: 1, size: 5, userId: unref(userInfo).userId }
			const [err, result] = await to(getRankTotal(query))

			if (!isEmpty(result)) {
				rankingUser.value = result.rankingUser
				return result.userPage.data
			}
			return []
		})

		const { open, popupRef, close, show } = usePopup()

		const { persons, setPerson } = usePersonList()

		const { showModal, closeModal, openModal } = useModal()

		const onLookUsers = (item) => {
			setPerson(item.userList)
			open()
		}

		onReachBottom(onInfiniteScrollLoad)

		const getTwoUsers = (users = []) => {
			return users.slice(0, 2)
		}

		onLoad(() => {
			onLoadList()
			onInfiniteScrollLoad()
			YWJATRACK.uploadTrack('广场页面', 'key3')
		})

		return {
			popupRef,
			tabbar,
			list,
			listRef,
			loading,
			noImageDefault,
			noAvatarDefault,
			rankLoading,
			formatDateTimeMDS,
			isArray,
			eq,
			toUserInfoPage,
			onLookUsers,
			persons,
			close,
			getTwoUsers,
			show,
			isEmpty,
			rankingUser,
			showModal,
			closeModal,
			openModal,
			hasMore,
			getScore,
			toMoreRankPage,
			meImage
		}
	}
})
</script>
<style lang="scss">
.content {
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
	box-sizing: content-box;
	top: 0;
	z-index: 1;
	position: sticky;
	background-color: #F7F8FA;

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
	font-size: 36rpx;
	font-weight: 600;
	padding-right: 24rpx;
}

.is-hidden {
	overflow: hidden;
	user-select: none;
}
</style>