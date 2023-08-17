<template>

	<view class="cu-modal bottom-modal" :class="show?'show':''">
		<view class="cu-dialog df-bg-color" style="height: 100%;">
			<view class="foot-pop">
				<view class="fixed flex-direction">
					<view :class="show?'animation-slide-bottom':''" :style="[{animationDelay:  2*0.1 + 's'}]" class="margin-lr-24 radius-12 bg-q-blue" @tap="clickItem(1)">
						<view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-bmbz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view
										class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										部门表彰
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										下属表现优秀，鼓励一下
									</view>
								</view>
							</view>
							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>
					<view :class="show?'animation-slide-bottom':''" :style="[{animationDelay:  3*0.1 + 's'}]" class="margin-lr-24 radius-12 bg-q-red" @tap="clickItem(2)">
						<view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-tsdz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view
										class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										同事点赞
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										给优秀的同事送朵小红花
									</view>
								</view>
							</view>

							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>
					<view :class="show?'animation-slide-bottom':''" :style="[{animationDelay:  4*0.1 + 's'}]" class="margin-lr-24 radius-12 bg-q-yellow" @tap="clickItem(3)"> <view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-sqbz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view
										class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										申请表彰
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										诸多表彰奖励，达成即可申请
									</view>
								</view>
							</view>
							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>
					<view :class="show?'animation-slide-bottom':''" :style="[{animationDelay:  5*0.1 + 's'}]" style="margin-top: 98rpx;margin-bottom: 58rpx;" @tap="hideModal">
						<view class="bg-img margin-auto-lr flex justify-center"
							style="background-image:url('./static/commend/bg@2x.png');width: 90rpx;height: 64rpx;">
							<image class="margin-auto-tb" src="../../static/commend/close@2x.png" mode="aspectFit"
								style="width: 48rpx;height: 48rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>


</template>

<script>
	import {
		defineComponent,
		toRefs,
		ref,
		reactive
	} from 'vue'
	export default defineComponent({
		name: 'commend-item-popup',
		emits: ['close', 'jumpPage'],
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		setup(props, {
			emit
		}) {
			const {
				show
			} = toRefs(props)
			const hideModal = () => {
				emit('close');
			}
			const clickItem = (item) => {
				emit('close');
				switch (item) {
					case 1:
					{
						uni.navigateTo({
							url: '/pages/deptLive/deptLive'
						})
					}
						break;
					case 2:
					{
						uni.navigateTo({
							url: '/pages/colleaguesLive/colleaguesLive'
						})
					}
						break;
					case 3:
					{
						uni.navigateTo({
							url: '/pages/commendPage/commendPage'
						})
					}
						break;
					default:
						break;
				}
				//直接跳转吧.不回调页面处理
				// emit('jumpPage',item)
			}
			return {
				hideModal,
				clickItem
			}
		}
	})
</script>

<style lang="scss">
	.foot-pop {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.bg-q-blue {
		background-color: #F2FAFE;
	}

	.bg-q-red {
		background-color: #FDF2EE;
	}

	.bg-q-yellow {
		background-color: #FEF4E0;
	}
</style>