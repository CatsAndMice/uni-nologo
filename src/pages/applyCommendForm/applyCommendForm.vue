<template>
	<view>
		<view style="height: 20rpx;"></view>
		<commend-info-wrap :icon="applyCommend.commendationIcon ? applyCommend.commendationIcon : ''"
			:name="applyCommend.commendationName ? applyCommend.commendationName : ''"
			:description="applyCommend.commendationDescription ? applyCommend.commendationDescription : ''"
			:experience="applyCommend.experience ? applyCommend.experience : ''"
			:score="applyCommend.score ? applyCommend.score : ''"></commend-info-wrap>

		<view class="margin-lr-12 radius-lg bg-white line-height-22">
			<view class="margin-sm">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请理由</view>
				<view class="solidm radius-lg padding-12">
					<textarea v-model="reason" class="text-c-msg2" style="height: 224rpx;font-size: 28rpx;"
						placeholder="请填写申请理由，至少10个字" maxlength="100"></textarea>
				</view>
			</view>
			<view class="margin-sm padding-bottom">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请资料</view>
				<view>
					<uni-file-picker ref="files" fileMediatype="image" :image-styles="imageStyle" :sizeType="sizeType"
						limit='5' v-model="imgArray" :auto-upload="false" @select="selectImage">
						<slot name='default'>
							<image src="/static/home/icon_40pt_plus@2x.png" style="width: 80rpx;height: 80rpx;"
								mode="widthFix"></image>
						</slot>
					</uni-file-picker>
				</view>
			</view>
		</view>

		<view class="margin-tb-16">
			<view class="bg-img margin-auto-lr" @tap="clickReqApply"
				style="width: 194rpx;height: 80rpx; background-image: url('../../static/detail/green_button_tijiao@2x.png');">
			</view>
			<view style="height: 98rpx;"></view>
		</view>
	</view>
</template>

<script>
import { defineComponent, ref, unref, computed } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { userData } from '../../stores/userData.js'
import Cache from '../../utils/cache.js'
import { BaseCacheKey } from '../../utils/type.js'
import { reqCommendApply } from '../../api/commend.js'
import { isUndefined, isNull } from '../../tools/tool.js'
import { uploadImages } from '../../tools/upload.js'
import YWJATRACK from "@/config/jstrack.js"
export default defineComponent({
	props: {},
	setup(props) {
		const {
			osName
		} = userData()
		const applyCommend = ref({
			commendationIcon: '',
			commendationName: '',
			commendationDescription: '',
			experience: '',
			score: ''
		})
		onLoad(() => {
			applyCommend.value = Cache.get(BaseCacheKey.APPLY_COMMEND)
			console.log(applyCommend)
			if (isUndefined(applyCommend.value) || isNull(applyCommend.value)) {
				uni.showToast({
					icon: 'none',
					title: '未获取到表彰信息'
				})
				return
			}
		})
		const sizeType = computed(() => {
			if (osName == 'ios') {
				return ['original', 'compressed']
			} else {
				return 'compressed'
			}
		})
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
		const reason = ref('')
		const imgArray = ref([])
		const clickReqApply = async () => {
			//检查数据
			let reasonStr = unref(reason)
			reasonStr = reasonStr.replace(/^\s*|\s*$/g, "")
			console.log(reasonStr)
			if (reasonStr.length < 10) {
				uni.showToast({
					icon: 'none',
					title: '申请理由至少10个字'
				})
				return
			}
			let upImgs = []
			console.log(unref(imgArray));
			for (let i = 0; i < unref(imgArray).length; i++) {
				let item = unref(unref(imgArray)[i])
				let subitem = {
					attachmentName: item.name,
					attachmentUrl: item.url
				}
				upImgs.push(subitem)
			}
			if (upImgs.length == 0) {
				uni.showToast({
					icon: 'none',
					title: '至少上传1张图片'
				})
				return
			}
			uni.showLoading()
			const reqData = {
				applyReason: unref(reason),
				attachments: upImgs,
				commendationId: unref(applyCommend).commendationId
			}
			console.log(reqData)
			// return
			const {
				code,
				data,
				msg
			} = await reqCommendApply(reqData)
			uni.hideLoading()
			console.log(data)
			if (code == 200) {
				YWJATRACK.uploadTrack('提交表彰申请', 'key9')
				uni.showToast({
					icon: 'none',
					title: '申请提交成功'
				})
				setTimeout(() => {
					uni.navigateBack()
				}, 1500)
			} else {
				uni.showToast({
					icon: 'none',
					title: msg ? msg : '申请提交失败，请重试'
				})
			}
			//reqCommendApply
		}
		const selectImage = (e) => {
			console.log(e)
			console.log(imgArray)
			uploadImages(e, (upBack) => {
				console.log(upBack)
				if (upBack.status) {
					imgArray.value = [...unref(imgArray), ...[{
						"name": upBack.name,
						"extname": "png",
						"url": upBack.url
					}]]
				}
			})
		}
		return {
			imgArray,
			reason,
			applyCommend,
			clickReqApply,
			selectImage,
			sizeType,
			imageStyle
		}
	}
})
</script>

<style lang="scss">
.reject-color {
	color: #F53F3F;
}

.padding-12 {
	padding: 24rpx;
}

.icon-del-box {
	margin: 0 -10rpx 0 0;
	width: 30rpx;
	height: 30rpx;

	.icon-del {
		background-color: #ffffff;
		width: 20rpx;
	}
}
</style>