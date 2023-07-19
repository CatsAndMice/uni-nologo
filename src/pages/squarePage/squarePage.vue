<template>
	<view :class="show ? 'is-hidden' : null">
		<view class="content">
			<view id="title1" class="title-wrap flex" :class="isTitle1Top ? 'is-top' : null" style="margin-left: 24rpx;">
				<view class="title-msg">晶点TOP 5</view>
			</view>
			<view class="bg-white radius-lg margin-lr" style="padding: 24rpx 0;">
				<uni-list :border="false">
					<rank-cell v-for="(item, index) in list" :key="index" :item="item" :showSolid="false"
						:rank-index="index" @click-record="toUserInfoPage(item.userId)" />
				</uni-list>
				<uni-load-more v-if="rankLoading" :icon-size="12" iconType="circle" status="loading" />
			</view>
			<view id="title2" class="title-wrap" :class="isTitle2Top ? 'is-top' : null"
				style="margin-left: 24rpx;padding-top: 32rpx;">
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
							<view style="font-size: 28rpx;font-weight: 500;color: #1D2129;">{{ item.userList[0].name }}
							</view>
							<view style="font-size: 20rpx;font-weight: 400;color: #A9AEB8;">{{ item.userList[0].deptName }}
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
						style="border-radius: 16rpx;background-color: #F7F8FA;height: 128rpx;margin-top: 20rpx;">
						<view class="flex align-center">
							<view class="margin-auto-lr margin-lr-12" style="width: 80rpx;height: 80rpx;">
								<view class="cu-avatar df-warp radius" :style="{
									backgroundColor: '#F7F8FA',
									backgroundImage: `url(${noImageDefault(item.commendationIcon)})`
								}"></view>
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

					<template #reason>
						<view class="flex  margin-top-8" v-show="item.distributeReason">
							<view class="commend-msg">{{ item.distributeReason }}</view>
						</view>
					</template>
				</get-commend-cell>


			</view>
			<no-data-wrap v-if="!loading && isEmpty(listRef)" :top='100' />
			<uni-load-more v-if="loading" :icon-size="12" iconType="circle" status="loading" />
		</view>
		<j-tabbar fixed fill safeBottom current="2" :tabbar="tabbar"></j-tabbar>
	</view>
	<uni-popup ref="popupRef" type="bottom" :z-index="1000" :is-mask-click="false">
		<view class="popup-content bg-white" style="height:1148rpx;border-radius: 16rpx 16rpx 0 0;overflow: hidden;">
			<view class="text-center"
				style="height: 88rpx;line-height: 88rpx;color:#1D2129;font-size: 32rpx;font-weight: 500;position: relative;">
				表彰名单
				<view @click="close" class="round flex align-center justify-center"
					style="background-color: #F2F3F5;position: absolute;width: 32rpx;height: 32rpx;top: 50%;right: 32rpx;transform: translateY(-50%);">
					<uni-icons type="closeempty" size="12" color="#A9AEB8;"></uni-icons>
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
import { defineComponent, reactive, onMounted, shallowRef } from 'vue'
import { onLoad, onReachBottom, onPageScroll } from "@dcloudio/uni-app"
import { getRankTotal, getCommendation } from '../../api/rank'
import { RecordType } from '../../utils/type'
import useList from '@c/useList'
import useInfiniteScroll from '@c/useInfiniteScroll'
import { to } from "await-to-js"
import isEmpty from 'medash/lib/isEmpty'
import { formatDateTimeMDS, noImageDefault, noAvatarDefault } from '../../tools/tool.js'
import isArray from 'medash/lib/isArray'
import eq from 'medash/lib/eq'
import { toUserInfoPage } from "./js/page"
import usePopup from "@c/usePopup"
import usePersonList from "./js/usePersonList"
import lt from "medash/lib/lt"

const MARCH_TIME = 90 * 1000 * 60 * 60 * 24
export default defineComponent({
	setup() {
		let title2 = null
		const isTitle1Top = shallowRef(false)
		const isTitle2Top = shallowRef(false)
		const tabbar = reactive(TabbarConfig)
		const query = {
			page: 1,
			size: 20,
			startTime: Date.now() - MARCH_TIME,
			endTime: Date.now()
		}
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

		const { open, popupRef, close, show } = usePopup()

		const { persons, setPerson } = usePersonList()

		const onLookUsers = (item) => {
			setPerson(item.userList)
			open()
		}

		onReachBottom(onInfiniteScrollLoad)

		onPageScroll((options) => {
			if (options.scrollTop) {
				isTitle1Top.value = true
			} else {
				isTitle1Top.value = false
			}
			title2.boundingClientRect(data => {
				if (lt(data.top, 129)) {
					isTitle2Top.value = true
				} else {
					isTitle2Top.value = false
				}
			}).exec();
		})

		const getTwoUsers = (users = []) => {
			return users.slice(0, 2)
		}

		onMounted(() => {
			const query = uni.createSelectorQuery();
			title2 = query.select('#title2')
		})

		onLoad(() => {
			onLoadList()
			onInfiniteScrollLoad()
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
			isTitle1Top,
			isTitle2Top,
			getTwoUsers,
			show,
			isEmpty
		}
	}
})
</script>
<style lang="scss">
.content {
	background-image: url('../../static/home/home_hearder_bg.png');
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

#title2 {
	z-index: 2;

	&.is-top {
		top: 182rpx;
		padding-top: 0 !important;
	}
}

.title-wrap {
	height: 88rpx;
	line-height: 88rpx;
	padding-top: 184rpx;
	box-sizing: content-box;
	top: 0;
	z-index: 1;
	position: sticky;

	&.is-top {
		padding-left: 24rpx !important;
		margin-left: 0 !important;
		background-color: #F7F8FA;
	}

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

.is-hidden {
	overflow: hidden;
	user-select: none;
}
</style>