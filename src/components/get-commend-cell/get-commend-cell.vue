<template>
	<view class="cu-card article">
		<view class="cu-item shadow min-margin-tb">
			
			<view class="flex padding-top-sm">
				<view class="flex-sub margin-tp-xs">
					<view class="margin-auto-lr" style="width: 96rpx;">
						<view class="cu-avatar lg radius " :style="'background-image:url(' + noImageDefault(item.commendationIcon) + ')'"></view>
					</view>
				</view>
			<!-- 	<view class="flex-treble commend-msg">
					{{ item.message }}</view> -->
					<view class="flex-treble margin-xs">
						<view class="flex  ">
							<view class="text-lg text-bold">{{ item.commendationName }}</view>
							<view class="margin-left-sm padding-top-sm cu-tag light sm round " :class="tagColor">{{ item.commendationType }}</view>
							
						</view>
						<view class="flex-treble commend-msg line2">{{item.distributeReason}}</view> 
					</view>
				
			</view>
		
			<view class="flex justify-end margin-lr-sm margin-top">
				<view class="text-c-msg text-sm">{{ formatDateTimeMDS(item.distributeTime) }}</view>
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
import {CommendationType} from '../../utils/type.js'
import{formatDateTimeMDS,noImageDefault} from '../../tools/tool.js'
export default defineComponent({
	name: 'get-commend-cell',
	props: {
		item: {
			type: Object,
			default: null
		}
	},
	setup(props) {
		const { item } = toRefs(props);

		const tagColor = computed(() => {
			if (unref(item).commendationType == CommendationType.COMMEND_DEPT) {
				return "bg-blue"
			} else if (unref(item).commendationType == CommendationType.COMMEND_COMPANY) {
				return "bg-orange"
			} else if (unref(item).commendationType == CommendationType.COMMEND_UNION) {
				return "bg-green"
			} else  {
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
.min-margin-tb {
	margin-top: 10rpx !important;
	margin-bottom: 5rpx !important;
}

.commend-msg {
	line-height: 44rpx;
	color: #4E5969;
}
</style>