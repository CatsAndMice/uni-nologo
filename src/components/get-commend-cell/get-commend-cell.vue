<template>
	<view class="cu-card article">
		<view class="cu-item shadow min-mp-tb">
			<view class="flex justify-between margin-lr-12 margin-top-12">
				<view><text class="text-sm text-c-msg2">获得</text>
					<view class="margin-left-sm padding-top-sm cu-tag light sm round " :class="tagColor">
						{{ item.commendationType }}
					</view>
				</view>
				<view class="text-c-msg text-sm">{{ formatDateTimeMDS(item.distributeTime) }}</view>
			</view>
			<view class="flex padding-top-sm">
				<view class=" margin-tp-xs">
					<view class="margin-auto-lr margin-lr-12" style="width: 80rpx;">
						<view class="cu-avatar df-warp radius bg-white"
							:style="'background-image:url(' + noImageDefault(item.commendationIcon) + ')'"></view>
					</view>
				</view>

				<view class=" margin-auto-tb">
					<view class="flex  margin-auto-tb">
						<view class="text-lg text-bold">{{ item.commendationName }}</view>
						<!-- 	<view class="margin-left-sm padding-top-sm cu-tag light sm round " :class="tagColor">
							{{ item.commendationType }}
						</view> -->

					</view>
					<!-- <view class="flex-treble commend-msg line2">{{item.distributeReason}}</view> -->
				</view>

			</view>

			<view class="flex  margin-lr-12 margin-top-8">
				<view class=" commend-msg line2">{{item.distributeReason}}</view>
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
		CommendationType
	} from '../../utils/type.js'
	import {
		formatDateTimeMDS,
		noImageDefault
	} from '../../tools/tool.js'
	export default defineComponent({
		name: 'get-commend-cell',
		props: {
			item: {
				type: Object,
				default: null
			}
		},
		setup(props) {
			const {
				item
			} = toRefs(props);

			const tagColor = computed(() => {
				if (unref(item).commendationType == CommendationType.COMMEND_DEPT) {
					return "bg-blue"
				} else if (unref(item).commendationType == CommendationType.COMMEND_COMPANY) {
					return "bg-orange"
				} else if (unref(item).commendationType == CommendationType.COMMEND_UNION) {
					return "bg-green"
				} else {
					return "bg-gray"
				}
			})
			return {
				tagColor,
				formatDateTimeMDS,
				noImageDefault
			}
		}
	})
</script>

<style lang="scss">
	.min-mp-tb {
		margin-top: 0 !important;
		padding-bottom: 24rpx !important;
		margin-bottom: 24rpx !important;
	}

	.commend-msg {
		line-height: 44rpx;
		color: #4E5969;
	}

</style>