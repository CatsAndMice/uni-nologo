<template>
	<view>
		<view style="height: 88rpx;"></view>
		<status-tag :status='1'></status-tag>
		<commend-info-wrap></commend-info-wrap>

		<view class="margin radius bg-white line-height-22" v-if="status==1">
			<view class="margin-sm padding-bottom-sm">
				<view class="reject-color text-bold text-lg padding-tb-sm">驳回原因</view>
				<view class="text-c-msg2 ">{{}}</view>
			</view>
		</view>
		<view class="margin radius bg-white line-height-22">
			<view class="margin-sm ">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请时间</view>
				<view class="text-c-msg2 ">{{}}</view>
			</view>
			<view class="margin-sm">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请理由</view>
				<view class="text-c-msg2 ">
					{{}}
				</view>
			</view>
			<view class="margin-sm padding-bottom">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请资料</view>
				<view>
					<uni-file-picker :readonly="true" v-model="imgArray"></uni-file-picker>
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
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		storeToRefs
	} from 'pinia'
	import {
		userData
	} from '../../stores/userData.js'
	import {getCommendApplyDetail} from '../../api/commend.js'
	export default defineComponent({
		props: {},
		setup(props) {
			let applyRecordId = null 
			const imgArray = ref([])
			const commendDetail = reactive({})
			onLoad((options) => {
				applyRecordId = options.id
				console.log(options)
				//检查
				reqCommendApplyDetail()
			})
			const reqCommendApplyDetail = async () => {
				const {
					code,
					data
				} = await getCommendApplyDetail(applyRecordId)
				if (code == 200) {
					commendDetail.value = data
				}
			}
			return {
				imgArray,
				commendDetail
			}
		}
	})
</script>

<style lang="scss">
.reject-color {
	color: #F53F3F;
}
</style>