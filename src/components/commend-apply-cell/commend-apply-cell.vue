<template>
	<view class="cu-list menu card-menu radius-lg" :class="canApply?'':'un-item'" @tap="clickJump">
		<view class="cu-item ">
			<view class="flex justify-between margin-tb w-100">
				<view class="flex w-100">
					<view class="">
						<view class="margin-auto-lr" style="width: 112rpx;">
							<view class="cu-avatar lg-warp radius bg-white "
								:style="'background-image:url('+ noImageDefault(data.commendationIcon) +')'"></view>
						</view>
					</view>
					<view class="margin-auto-tb ">
						<view class="margin-left-sm line-height-24 text-c-title text-bold text-lg">
							{{data.commendationName}}
						</view>
						<view class="margin-left-sm margin-top-8 line-height-22 text-c-msg line1" style="max-width: 460rpx;">
							{{data.commendationDescription}}
						</view>
					</view>
				</view>
				<view class="bg-img right-icon-sec margin-auto-tb"></view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		toRefs,
		ref,
		reactive,
		computed,
		unref
	} from 'vue'
	import {
		noImageDefault
	} from '../../tools/tool.js'
	export default defineComponent({
		name: 'commend-apply-cell',
		emits: ['clickApply'],
		props: {
			data: {
				type: Object,
				default: null
			},
		},
		setup(props, {
			emit
		}) {
			const {
				data
			} = toRefs(props);
			const clickJump = () => {
				if (unref(data).isApplying === 'TRUE') {
					uni.showToast({
						icon: 'none',
						title: '申请中，请等待'
					})
					return
				} else if (unref(data).isExceeded === 'TRUE') {
					uni.showToast({
						icon: 'none',
						title: '不可重复申请'
					})
					return
				}
				emit('clickApply')
			}
			const canApply = computed(() => {
				if (unref(data).isApplying === 'FALSE' && unref(data).isExceeded === 'FALSE') {
					return true
				}
				return false
			})
			return {
				clickJump,
				canApply,
				noImageDefault
			}
		}
	})
</script>

<style lang="scss">
	.min-margin-tb {
		margin-top: 10rpx !important;
		margin-bottom: 5rpx !important;
	}

	.commend-msg {
		line-height: 44rpx;
		color: #4E5969;
	}

	.un-item {
		-webkit-filter: grayscale(100%);
		/* Chrome, Safari, Opera */
		filter: grayscale(100%);
	}
	
</style>