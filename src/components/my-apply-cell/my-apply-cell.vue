<template>
	<view class="cu-list menu card-menu margin-top-8" @tap="clickJump">
		<view class="cu-item ">
			<view class="flex flex-direction w-100">
				<view class="flex justify-between">
					<view class="flex margin-tb-sm">
						<view class="text-lg text-bold">{{data.commendationName}}</view>
						<view class="margin-left-sm padding-tb-sm cu-tag light sm round text-center " :class="tagColor">
							{{data.commendationType}}
						</view>
					</view>
					<view class="text-c-msg text-sm margin-auto-tb">{{statusName}}</view>
				</view>
				<view class="flex justify-between margin-bottom w-100">
					<view class="flex w-100">
						<view class="">
							<view class="margin-auto-lr" style="width: 96rpx;">
								<view class="cu-avatar lg radius bg-white"
									:style="'background-image:url('+ noImageDefault(data.commendationIcon) +')'">
								</view>
							</view>
						</view>
						<view class="margin-auto-tb ">
							<view class="margin-left-sm text-c-msg line2" style="max-width: 550rpx;">
								{{data.commendationDescription}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		emit
	} from 'process';
	import {
		defineComponent,
		toRefs,
		ref,
		reactive,
		computed,
		unref
	} from 'vue'
	import {
		CommendationType,
		ApplyStatus
	} from '../../utils/type.js'
	import{noImageDefault} from '../../tools/tool.js'
	export default defineComponent({
		name: 'my-apply-cell',
		emits: ['clickToDetail'],
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
			} = toRefs(props)
			const tagColor = computed(() => {
				if (unref(data).commendationType == CommendationType.COMMEND_DEPT) {
					return "bg-blue"
				} else if (unref(data).commendationType == CommendationType.COMMEND_COMPANY) {
					return "bg-orange"
				} else if (unref(data).commendationType == CommendationType.COMMEND_UNION) {
					return "bg-green"
				} else {
					return "bg-gray"
				}
			})
			const statusName = computed(() => {
				
				if (unref(data).applyStatus == ApplyStatus.WAIT) {
					return "审批中"
				} else if (unref(data).applyStatus == ApplyStatus.APPROVED) {
					return "已通过"
				} else  {
					return "未通过"
				}
			})
			const clickJump = () => {
				emit('clickToDetail')
			}
			return {
				clickJump,
				tagColor,
				statusName,
				noImageDefault
			}
		}
	})
</script>

<style lang="scss">
	.cu-list+.cu-list {
		margin-top: 16rpx;
	}
</style>