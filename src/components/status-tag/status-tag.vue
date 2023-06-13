<template>
	<view class="flex justify-center" style="height: 88rpx;">
		<view class="cu-avatar sm margin-auto-tb"
			:style="'background-image: url('+ statusImg+');background-color: rgba(0, 0, 0, 0);margin-right: 10rpx;'">
		</view>
		<view class=" text-lg margin-auto-tb text-bold ">{{statusMsg}}</view>
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
	import {ApplyStatus} from '../../utils/type.js'
	export default defineComponent({
		name: 'status-tag',
		props: {
			status: {
				type: String,
				default: ''
			}
		},
		setup(props) {
			const {
				status
			} = toRefs(props)
			const statusMsg = computed(() => {
				if (status.value == ApplyStatus.APPROVED) {
					return "已通过"
				} else if (status.value == ApplyStatus.REJECT) {
					return "已驳回"
				} else {
					return "审核中"
				}
			})
			const statusImg = computed(() => {
				if (status.value == ApplyStatus.APPROVED) {
					return "/static/detail/icon_24pt_pass@2x.png"
				} else if (status.value == ApplyStatus.REJECT) {
					return "/static/detail/icon_24pt_reject@2x.png"
				} else {
					return "/static/detail/icon_24pt_wait@2x.png"
				}
			})
			return {
				statusMsg,
				statusImg
			}
		}
	})
</script>

<style>

</style>