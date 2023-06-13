<template>
	<view class="bg-white radius">
		<view class="flex flex-direction ">
			<view class="flex justify-between margin">
				<view class="flex flex-direction flex-twice">
					<view class="d-font text-xxl text-bold theme-color text-center margin-bottom-sm">{{score}}</view>
					<view class="flex text-center margin-auto-lr" @tap="clickToRecord(RecordType.INTEGRAL)">
						<view class="text-c-msg text-sm margin-auto-tb">积分</view>
						<view class="bg-img right-icon margin-auto-tb"></view>
					</view>
				</view>
				<view class="flex-sub">
					<view class="bg-img exchange-img margin-auto-lr" @tap="clickShowExchange"></view>
				</view>
				<view class="flex flex-direction flex-twice">
					<view class="d-font text-xxl text-bold theme-color text-center margin-bottom-sm">{{jingdian}}</view>
					<view class="flex text-center margin-auto-lr" @tap="clickToRecord(RecordType.JINGDIAN)">
						<view class="text-c-msg text-sm margin-auto-tb">晶点</view>
						<view class="bg-img right-icon margin-auto-tb"></view>
					</view>
				</view>
			</view>
			<view class="flex justify-between margin-bottom margin-lr">
				<view class="flex-twice">
					<view class="btn-bg-wrap margin-auto-lr " @tap="clickToApplyCommend">
						<view class="flex margin-lr-sm" style="height: 64rpx;">
							<image class="margin-auto-tb" src="../../static/home/icon_24pt_jifen@2x.png"
								style="width: 48rpx;height: 48rpx;"></image>
							<view class="margin-auto-tb text-sm">获取积分</view>
						</view>
					</view>
				</view>
				<view class="flex-sub"></view>
				<view class="flex-twice">
					<view class="btn-bg-wrap margin-auto-lr " @tap="clickToShop">
						<view class="flex margin-lr-sm" style="height: 64rpx;">
							<image class="margin-auto-tb" src="../../static/home/icon_24pt_shangcheng@2x.png"
								style="width: 48rpx;height: 48rpx;"></image>
							<view class="margin-auto-tb text-sm">礼品中心</view>
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
		ref
	} from 'vue'
	import {
		RecordType
	} from '../../utils/type.js'
	export default defineComponent({
		name: 'integral-exchange',
		emits: ['clickShowEModal'],
		props: {
			score: {
				type: Number,
				default: 0.0
			},
			jingdian: {
				type: Number,
				default: 0.0
			}
		},
		setup(props, {
			emit
		}) {
			const {
				score,
				jingdian
			} = toRefs(props)

			const isClose = ref(false)
			const gotoDetail = () => {
				uni.navigateTo({
					url: `/pages/webview/webview?url=${link.value}`
				})
			}
			const clickToShop = () => {
				uni.showToast({
					title: '功能尚未上线，敬请期待~',
					icon: 'none'
				})
			}
			const clickToRecord = (type) => {
				console.log(type)
				uni.navigateTo({
					url: `/pages/recordList/recordList?type=${type}`
				})
			}
			const clickToApplyCommend = () => {
				uni.navigateTo({
					url: '/pages/commendPage/commendPage'
				})
			}
			const clickShowExchange = () => {
				emit('clickShowEModal');
				// uni.showToast({
				// 	title:'暂无可兑换晶点',
				// 	icon:'none'
				// })
			}
			return {
				clickToRecord,
				clickToShop,
				clickToApplyCommend,
				clickShowExchange,
				RecordType
			}
		}
	})
</script>

<style lang="scss">
	.exchange-img {
		width: 108rpx;
		height: 108rpx;
		background-image: url('../../static/home/home_card_duihuan_nor@2x.png');
	}

	.btn-bg-wrap {
		width: 192rpx;
		height: 64rpx;
		background-color: #FFF6ED;
		border-radius: 32rpx;
	}
</style>