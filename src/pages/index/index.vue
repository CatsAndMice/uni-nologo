<template>
	<view class="">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<view class="main-wrap">
				<user-header :avatar='noEmpty(userInfo.avatar)' :name='noEmpty(userInfo.name)'
					:level='noEmpty(accountInfo.currentLevel)' :experience='noEmpty(accountInfo.experience)'
					:currentLevelTotalExperience='noEmpty(accountInfo.currentLevelTotalExperience)'></user-header>
				<view class="margin">
					<!-- 	<integral-exchange :score='userScore' :jingdian='userJingdian'
						@clickShowEModal='checkShowEModal'></integral-exchange> -->
					<jingdian-wrap :jingdian='noEmpty(accountInfo.totalScore)'></jingdian-wrap>
				</view>

				<m-banner img="../../static/home/m_banner.png" :link="dianWord" :showClose="false" :show="true"
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
							<get-commend-cell v-for="item, index in myCommendsList" :item="item"
								:key="index"></get-commend-cell>
							<view  @tap="toCommonedList" v-if="myCommendsList.length == 3"
								class="text-c-msg text-sm text-center margin-top-8 margin-bottom-16">查看更多表彰内容<text
									class="cuIcon-right text-sm"></text></view>
						</view>
					</template>
					<no-data-wrap v-else :top='100'></no-data-wrap>
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
		computed,
		unref
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
	import {
		getAccountDetail
	} from '../../api/account'
	import {
		getUserInfo
	} from '../../api/user.js'
	import {
		getCommendDistribute
	} from '../../api/commend'
	import {
		noEmpty,
		isUndefined
	} from '../../tools/tool.js'
	import {
		dianWord
	} from '../../config/app'
	export default defineComponent({
		setup() {
			const tabbar = reactive(TabbarConfig)
			const userPData = userData()
			const {
				setHiddenBanner
			} = userPData
			const {
				userInfo,
				accountInfo,
				userJingdian,
				userScore,
				hiddenBanner
			} = storeToRefs(userPData)
			const showModal = ref(false)
			const myCommendsList = ref([])
			onLoad(() => {
				//先检查用户信息
				if (isUndefined(unref(userInfo).userId)) {
					//先去获取用户信息
					reqUserInfo()
					return
				}
				reqAccountData()
				reqMyCommendList()
				
			})
			//获取用户信息
			const reqUserInfo = async () => {
				const {
					code,
					data
				} = await getUserInfo({})
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
						success: function(res) {
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
				const {
					code,
					msg,
					data
				} = await getAccountDetail(unref(userInfo).userId)
				if (code == 200) {
					userPData.setAccountInfo(data)
				} else {
					uni.showToast({
						icon: 'none',
						title: msg?msg:'未获取到用户数据'
					})
				}
			}
			//获取我的表彰列表
			const reqMyCommendList = async () => {
				const {
					code,
					data
				} = await getCommendDistribute({
					isSearchAllUsers: 'FALSE',
					page: 1,
					size: 3,
					userId: userInfo.value.userId
				})
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
				myCommendsList,
				accountInfo,
				userInfo,
				noEmpty,
				dianWord
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
		margin-top: 24rpx;
		padding-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
</style>