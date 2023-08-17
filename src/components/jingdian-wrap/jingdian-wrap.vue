<template>
	<view class="shadow shadow-theme radius-carp">
		<view class="bg-img m-bg flex justify-between padding-24 radius-carp"
			style="background-image: url('/static/home/m_bg.png');">
			<view class="margin-auto-tb flex flex-direction text-white">
				<view class="text-lg">我的晶点</view>
				<view class="d-font text-sl margin-tb-xs">{{showCount}}</view>
				<view @tap="clickToRecord(RecordType.JINGDIAN)" class="text-sm margin-auto-tb">查询明细<text
						class="cuIcon-right"></text></view>
			</view>
			<view class="margin-auto-tb flex flex-direction">
				<button @click="clickToApplyCommend" hover-class="none" class="cu-btn radius  bg-white theme-color">获取晶点</button>
				<button @click="clickToShop" hover-class="none" class="cu-btn radius  linem-white margin-top">礼品中心</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		toRefs,
		ref,
		unref,
		computed
	} from 'vue'
	import {
		RecordType
	} from '../../utils/type.js'
	import {
		thousands
	} from '../../tools/tool.js'
	export default defineComponent({
		name: 'jingdian-wrap',
		emits: ['clickShowEModal'],
		props: {
			jingdian: {
				type: Number,
				default: 0.0
			}
		},
		setup(props, {
			emit
		}) {
			const {
				jingdian
			} = toRefs(props)
			const showCount = computed(() => {
				const res = thousands(unref(jingdian))
				return res
			})

			const clickToShop = () => {
				// uni.showToast({
				// 	title: '功能尚未上线，敬请期待~',
				// 	icon: 'none'
				// })
				uni.navigateTo({
					url: '/pages/giftStore/giftStore'
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

			return {
				clickToRecord,
				clickToShop,
				clickToApplyCommend,
				RecordType,
				showCount
			}
		}
	})
</script>

<style lang="scss">
	.m-bg {
		// width: 700rpx;
		height: 290rpx;
	}
	.shadow-theme {
		box-shadow:0rpx 8rpx 24rpx rgba(255, 165, 81, 0.3);
	}
	.radius-carp {
		border-radius: 16rpx;
	}
	.linem-white {
		color: #ffffff;
	}
	.cu-btn[class*="linem"]::after {
		border: 4upx solid currentColor;
	}
</style>