<template>
	<view class="cu-list menu card-menu " :class="canApply?'un-item':''" @tap="clickJump">
		<view class="cu-item ">
			<view class="flex justify-between margin-tb w-100">
				<view class="flex w-100">
					<view class="">
						<view class="margin-auto-lr" style="width: 96rpx;">
							<view class="cu-avatar lg radius "
								:style="'background-image:url('+ noImageDefault(data.commendationIcon) +')'"></view>
						</view>
					</view>
					<view class="margin-auto-tb ">
						<view class="margin-left-sm margin-bottom-xs text-c-title text-bold text-lg">
							{{data.commendationName}}
						</view>
						<view class="margin-left-sm text-c-msg line1" style="max-width: 500rpx;">
							{{data.commendationDescription}}
						</view>
					</view>
				</view>
				<view class="bg-img right-icon margin-auto-tb"></view>
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
		computed
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
				if (data.isApplying === 'FALSE') {
					uni.showToast({
						icon: 'none',
						title: '正在申请中'
					})
					return
				} else if (data.isExceeded === 'TRUE') {
					uni.showToast({
						icon: 'none',
						title: '超出申请限制'
					})
					return
				}
				emit('clickApply')
			}
			const canApply = computed(() => {
				if (data.isApplying === 'FALSE' || data.isExceeded === 'TRUE') {
					return false
				}
				return true
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