<template>
	<view>
		<view style="position: relative;">
			<!-- <view class="bg-img top-bg"></view> -->
			<view class="main-wrap">
				<view style="padding: 24rpx 0;">
					<user-header :avatar='noEmpty(accountInfo.avatar)' :name='noEmpty(accountInfo.name)'
						:level='accountInfo?.currentLevel' :experience='noEmpty(accountInfo?.experience)'
						:currentLevelTotalExperience='noEmpty(accountInfo?.currentLevelTotalExperience)'
						avatar-size="120rpx" />
				</view>

				<view class="margin">
					<jingdian-wrap :jingdian='noEmpty(accountInfo?.totalScore)'></jingdian-wrap>
				</view>
				<m-banner img="../../static/home/m_banner.png" :link="dianWord" :showClose="false" :show="true"
					@close='closeBanner'></m-banner>
				<view>
					<view class="flex justify-between align-center margin-lr" style="height: 88rpx;">
						<view class="text-lg text-bold">近期获得表彰</view>
						<view class="flex" @tap="toCommonedList">
							<view class="text-c-msg text-sm margin-auto-tb">更多</view>
							<view class="bg-img right-icon margin-auto-tb"></view>
						</view>
					</view>
					<template v-if="myCommendsList.length > 0">
						<view class="commend-wrap">
							<get-commend-cell v-for="item, index in myCommendsList" :item="item"
								:key="index"></get-commend-cell>
							<view @tap="toCommonedList" v-if="myCommendsList.length == 3"
								class="text-c-msg text-sm text-center margin-top-8 margin-bottom-16">查看更多表彰内容<text
									class="cuIcon-right text-sm"></text></view>
						</view>
					</template>
					<no-data-wrap v-else :top='100'></no-data-wrap>
				</view>
			</view>
		</view>
		<j-tabbar fixed fill safeBottom current="0" :z-index="show ? 0 : 1000" :tabbar="tabbar"></j-tabbar>
		<exchange-modal :show='showModal' :score='12' :jingdian='34' @close="closeModal"
			@exchangeJingdian='exchangeJingdian'></exchange-modal>
	</view>

	<uni-popup ref="popupRef" :is-mask-click="false">
		<view class="popup-content radius-lg bg-white" style="width: 562rpx;overflow: hidden;">
			<view class="flex margin-auto-lr justify-between align-center" style="margin:48rpx 84rpx 26rpx 84rpx;">
				<image :src="picDecorationImage" style="width:48rpx;height:48rpx" />
				<text style="font-size: 32rpx;font-weight: 500;line-height: 48rpx; ">恭喜你获得新表彰</text>
				<image :src="picDecorationImage" style="width:48rpx;height:48rpx" />
			</view>

			<view class="commend flex align-center" style="flex-direction: column;">
				<view class="cu-avatar radius bg-white"
					:style="'background-image:url(' + noImageDefault(commendInfo.commendationIcon) + ');width:200rpx;height:200rpx'">
				</view>
				<view style="font-size: 32rpx;font-weight: 500;line-height: 48rpx;margin-top: 32rpx;">{{
					commendInfo.commendationName }}
				</view>
			</view>

			<view class="flex align-center justify-center" style="padding: 48rpx 0;margin: auto;">
				<button @click="onAcceptCommend(commendInfo)" class="cu-btn round"
					style="border: 2rpx solid #F7AF6C;background-color: transparent;color:  #F7AF6C;line-height: 48rpx;font-size: 32rpx;font-weight: 400;padding: 0 86rpx;">太棒了</button>
			</view>
		</view>
	</uni-popup>
</template>

<script>
import TabbarConfig from '@/config/tabbar.js'
import { defineComponent, ref, reactive, unref } from 'vue'
import { userData } from '../../stores/userData.js'
import { storeToRefs } from 'pinia'
import { onLoad } from "@dcloudio/uni-app"
import { getAccountDetail } from '../../api/account'
import { getUserInfo } from '../../api/user.js'
import { getCommendDistribute } from '../../api/commend'
import { noEmpty, isUndefined } from '../../tools/tool.js'
import { dianWord } from '../../config/app'
import { toCommonedList } from "./js/page"
import useWaitCommend from "./js/useWaitCommend"
import picDecorationImage from "@/static/home/pic-decoration.png"
import { noImageDefault } from '../../tools/tool.js'
import YWJATRACK from "@/config/jstrack.js"

export default defineComponent({
	setup() {
		const tabbar = reactive(TabbarConfig)
		const userPData = userData()
		const { setHiddenBanner } = userPData
		const { userInfo, accountInfo, userJingdian, userScore, hiddenBanner } = storeToRefs(userPData)
		const showModal = ref(false)
		const myCommendsList = ref([])

		const { popupRef, show, commendInfo, onAcceptCommend } = useWaitCommend()

		//获取用户信息
		const reqUserInfo = async () => {
			const { code, data } = await getUserInfo({})
			if (code == 200 && !isUndefined(data.userId)) {
				userPData.setUserInfo(data)
				reqAccountData()
				reqMyCommendList()
			} else {
				uni.showModal({
					title: '提示',
					content: '获取用户信息失败',
					confirmText: '重试',
					cancelText: '取消',
					success: function (res) {
						if (res.confirm) {
							reqUserInfo()
						} else if (res.cancel) {

						}
					}
				});
			}
		}

		//获取用户信息
		const reqAccountData = async () => {
			const { code, msg, data } = await getAccountDetail(unref(userInfo).userId)
			if (code == 200) {
				userPData.setAccountInfo(data)
			} else {
				uni.showToast({
					icon: 'none',
					title: msg ? msg : '未获取到用户数据'
				})
			}
		}

		//获取我的表彰列表
		const reqMyCommendList = async () => {
			const { code, data } = await getCommendDistribute({
				isSearchAllUsers: 'FALSE',
				page: 1,
				size: 3,
				userId: userInfo.value.userId
			})
			if (code == 200) {
				myCommendsList.value = data.data
			}
		}

		const closeBanner = () => {
			//关闭banner
			setHiddenBanner()
		}

		const checkShowEModal = () => {
			//检查是否有兑换
			showModal.value = true
		}

		const exchangeJingdian = () => {
			//调用兑换
			closeModal()
		}

		const closeModal = () => {
			showModal.value = false
		}

		onLoad(() => {
			YWJATRACK.uploadTrack('首页','key1')
			//先检查用户信息
			if (isUndefined(unref(userInfo).userId)) {
				//先去获取用户信息
				reqUserInfo()
				return
			}
			reqAccountData()
			reqMyCommendList()
		})

		return {
			popupRef,
			show,
			toCommonedList,
			tabbar,
			userJingdian,
			userScore,
			hiddenBanner,
			closeBanner,
			checkShowEModal,
			showModal,
			exchangeJingdian,
			closeModal,
			myCommendsList,
			accountInfo,
			userInfo,
			noEmpty,
			dianWord,
			picDecorationImage,
			commendInfo,
			noImageDefault,
			onAcceptCommend
		}
	}
})
</script>
<style lang="scss">
.page {
	width: 100vw;
}

.top-bg {
	position: absolute;
	top: 0;
	width: 100vw;
	height: 496rpx;
	background-image: url('../../static/home/home_hearder_bg.png');
}

.main-wrap {
	position: relative;
	width: 100%;
	// padding-top: 200rpx;
}

.commend-wrap {
	// margin-top: 24rpx;
	padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}

.commend {
	width: 498rpx;
	height: 360rpx;
	margin: auto;
	background-image: url('~@/static/home/background-tc.png');
	background-size: 100% 100%;
	background-repeat: no-repeat;
}
</style>