<template>
	<view class="">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<view class="main-wrap">
				<user-header></user-header>
				<view class="margin">
					<integral-exchange :score='userScore' :jingdian='userJingdian'
						@clickShowEModal='checkShowEModal'></integral-exchange>
				</view>

				<m-banner img="../../static/home/home_banner.png" link="https://www.baidu.com" :show="!hiddenBanner"
					@close='closeBanner'></m-banner>
				<view class="">
					<view class="flex justify-between margin-lr">
						<view class="text-lg text-bold">近期获得表彰</view>
						<view class="flex" @tap="toCommonedList">
							<view class="text-c-msg text-sm margin-auto-tb">更多</view>
							<view class="bg-img right-icon margin-auto-tb"></view>
						</view>
					</view>
					<template v-if="myCommendsList.length > 0">
						<view class="commend-wrap">
							<get-commend-cell v-for="item, index in myCommendsList" :item="item" :key="index"></get-commend-cell>
							<view v-if="myCommendsList.length == 3" @tap="toCommonedList"
								class="text-c-msg text-sm text-center margin-tb-sm">查看更多表彰内容<text
									class="cuIcon-right text-sm"></text></view>
						</view>
					</template>
					<no-data-wrap v-else :top='150'></no-data-wrap>
				</view>
			</view>
		</view>
		<j-tabbar fixed fill safeBottom current="0" :tabbar="tabbar"></j-tabbar>
		<exchange-modal :show='showModal' :score='12' :jingdian='34' @close="closeModal"
			@exchangeJingdian='exchangeJingdian'></exchange-modal>
	</view>
</template>

<script>
import TabbarConfig from '@/config/tabbar.js'
import {
	defineComponent,
	ref,
	reactive,
	computed
} from 'vue'
import {
	userData
} from '../../stores/userData.js'
import {
	storeToRefs
} from 'pinia'
import {
	onLoad
} from "@dcloudio/uni-app"
import { getAccountDetail } from '../../api/account'
import { getCommendDistribute } from '../../api/commend'
export default defineComponent({
	setup() {
		const tabbar = reactive(TabbarConfig)
		const userPData = userData()
		const { setHiddenBanner } = userPData
		const {
			userInfo,
			accountInfo,
			userJingdian,
			userScore,
			hiddenBanner
		} = storeToRefs(userPData)
		const showModal = ref(false)
		const myCommendsList = reactive([])
		onLoad(() => {

			reqAccountData()
			reqMyCommendList()
		})
		//获取用户信息
		const reqAccountData = async () => {
			const { code, data } = await getAccountDetail(userInfo.value.userId)
			if (code == 200) {
				console.log(data)
				userPData.setAccountInfo(data)
			}
		}
		//获取我的表彰列表
		const reqMyCommendList = async () => {
			const { code, data } = await getCommendDistribute({isSearchAllUsers:'FALSE',page:1,size:3,userId:userInfo.value.userId})
			if (code == 200) {
				console.log(data)
				myCommendsList.value = data.data
			}
		}
		const toCommonedList = () => {
			uni.navigateTo({
				url: '/pages/commendList/commendList'
			})
		}
		const closeBanner = () => {
			//关闭banner
			setHiddenBanner()
			console.log(hiddenBanner);
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
			console.log(showModal)
		}
		return {
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
			myCommendsList
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
	background-image: url('../../static/home/home_hearder_bg@2x.png');
}

.main-wrap {
	position: relative;
	width: 100%;
	padding-top: 200rpx;
}

.commend-wrap {
	margin-top: 10rpx;
	padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
}
</style>