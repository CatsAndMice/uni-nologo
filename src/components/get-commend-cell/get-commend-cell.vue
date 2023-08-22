<template>
	<view class="cu-card article bg-white" style="margin-bottom: 16rpx;">
		<view class="cu-item shadow min-mp-tb" :class="customClass" :style="customStyle">
			<view class="flex justify-between align-center  margin-top-12">
				<view style="height: 44rpx;" class="flex align-center">
					<text class=" text-c-msg2" style="font-size: 28rpx;">获得</text>
					<view class="margin-left-sm  cu-tag light  round "
						style="padding: 0 12rpx;line-height: 44rpx;text-align: center;font-size: 20rpx" :class="tagColor">
						{{ item.commendationType }}
					</view>
				</view>
				<slot name="initiator">
					<view class="text-c-msg text-sm" v-show="isShowTime">{{ formatDateTimeMDS(item.distributeTime) }}</view>
				</slot>
			</view>

			<slot>
				<slot name="top-initiator"></slot>
				<view class="flex align-center justify-between margin-top-8 bg-white"
					style="height: 176rpx;background: #F3F3F3;border-radius: 12rpx;">
					<view class=" margin-tp-xs">
						<view class="margin-auto-lr margin-lr-12">
							<view class="cu-avatar df-warp radius bg-white"
								:style="'background-image:url(' + noImageDefault(item.commendationIcon) + ');width: 128rpx;height: 128rpx;'">
							</view>
						</view>
					</view>

					<view class="margin-auto-tb text-lg text-bold line1 text-left" style="flex-grow: 1;">
						{{ item.commendationName }}
					</view>

					<view style="text-align: right;margin-right: 32rpx;font-size: 32rpx;font-weight: 600;color: #F7AF6C;white-space: nowrap;flex-shrink: 0;">
						{{ '+' + getScore(item) }} <text class="margin-left-8 ">晶点</text>
					</view>
				</view>
			</slot>
			<slot name="reason">
				<view class="flex  margin-lr-12 margin-top-8" v-show="item.distributeReason">
					<view class="commend-msg line2">{{ item.distributeReason }}</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
import { defineComponent, toRefs, computed, unref } from 'vue'
import { CommendationType } from '../../utils/type.js'
import { formatDateTimeMDS, noImageDefault } from '../../tools/tool.js'
import getScore from '@/utils/getScore'

export default defineComponent({
	name: 'get-commend-cell',
	props: {
		item: {
			type: Object,
			default: null
		},
		customStyle: {
			type: Object,
			default: () => ({})
		},
		customClass: {
			type: Object,
			default: () => ({})
		},
		isShowTime: {
			type: Boolean,
			default: true
		},
		isMargin: {
			type: Boolean,
			default: true
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
			noImageDefault,
			getScore
		}
	}
})
</script>

<style lang="scss">
.min-mp-tb {
	margin-top: 0 !important;
	padding-bottom: 24rpx !important;
	margin-bottom: 0 !important;
	border-radius: 16rpx !important;
}

.commend-msg {
	line-height: 44rpx;
	color: #4E5969;
}
</style>