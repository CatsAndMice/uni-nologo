<template>
	<view class="page">
		<view style="height: 88rpx;"></view>
		<status-tag :status='applyCommend.applyStatus'></status-tag>
		<commend-info-wrap :icon="applyCommend.commendationIcon?applyCommend.commendationIcon:''"
			:name="applyCommend.commendationName?applyCommend.commendationName:''"
			:description="applyCommend.commendationDescription?applyCommend.commendationDescription:''"
			:experience="applyCommend.experience?applyCommend.experience:0"
			:score="applyCommend.score?applyCommend.score:0"></commend-info-wrap>

		<view class="margin-lr-12 margin-bottom-16 radius-lg bg-white line-height-22" v-if="applyCommend.applyStatus===ApplyStatus.REJECT">
			<view class="margin-sm padding-bottom-sm">
				<view class="reject-color text-bold text-lg padding-tb-sm">驳回原因</view>
				<view class="text-c-msg2 ">{{applyCommend.replyContent}}</view>
			</view>
		</view>
		<view class="margin-lr-12 margin-bottom-16 radius-lg bg-white line-height-22">
			<view class="margin-sm ">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请时间</view>
				<view class="text-c-msg2 ">{{formatDateTimeMDS(applyCommend.applyTime)}}</view>
			</view>
			<view class="margin-sm">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请理由</view>
				<view class="text-c-msg2 ">
					{{applyCommend.applyReason}}
				</view>
			</view>
			<view class="margin-sm padding-bottom">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请资料</view>
				<view>
					<uni-file-picker :readonly="true" v-model="imgArray" :image-styles="imageStyle"></uni-file-picker>
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
		reactive,
		unref,
		computed
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
	import {
		getCommendApplyDetail
	} from '../../api/commend.js'
	import {
		ApplyStatus
	} from '../../utils/type.js'
	import {
		formatDateTimeMDS
	} from '../../tools/tool.js'
	export default defineComponent({
		props: {},
		setup(props) {
			let applyRecordId = null
			const imgArray = ref([])
			const applyCommend = ref({})
			onLoad((options) => {
				applyRecordId = options.id
				console.log(options)
				//检查
				reqCommendApplyDetail()
			})
			const reqCommendApplyDetail = async () => {
				const {
					code,
					data,
					msg
				} = await getCommendApplyDetail(applyRecordId)
				if (code == 200) {
					applyCommend.value = data
					analyseImageArr()
				} else {
					uni.showToast({
						icon: 'none',
						title: msg?msg:'获取详情失败'
					})
				}
			}
			const imageStyle = computed(() => {
				return {
					"height": 80, // 边框高度
					"width": 80, // 边框宽度
					"border": { // 如果为 Boolean 值，可以控制边框显示与否
						"color": "#eee", // 边框颜色
						"width": "1px", // 边框宽度
						"style": "solid", // 边框样式
						"radius": "10rpx" // 边框圆角，支持百分比
					}
				}
			})
			const analyseImageArr = () => {
				let upImgs = []
				for (let i = 0; i < unref(applyCommend).attachments.length; i++) {
					let item = unref(unref(applyCommend).attachments[i])
					let subitem = {
						name: item.attachmentName,
						url: item.attachmentUrl,
						extname: 'png'
					}
					upImgs.push(subitem)
				}
				imgArray.value = upImgs
			}
			return {
				imgArray,
				applyCommend,
				ApplyStatus,
				formatDateTimeMDS,
				imageStyle
			}
		}
	})
</script>

<style lang="scss">
	.reject-color {
		color: #F53F3F;
	}
</style>