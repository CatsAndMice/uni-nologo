<template>
	<view>
		<view style="height: 20rpx;"></view>
		<!-- <commend-info-wrap :item='applyCommend'></commend-info-wrap> -->

		<view class="margin radius bg-white line-height-22">
			<view class="margin-sm">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请理由</view>
				<view class="solid radius padding-xs">
					<textarea v-model="reason" class="text-c-msg2" style="height: 224rpx;font-size: 28rpx;"
						placeholder="请填写申请理由，至少10个字" maxlength="100"></textarea>
				</view>
			</view>
			<view class="margin-sm padding-bottom">
				<view class="text-c-title text-bold text-lg padding-tb-sm">申请资料</view>
				<view>
					<uni-file-picker ref="files" fileMediatype="image" v-model="imgArray" :auto-upload="false"
						@select="selectImage"></uni-file-picker>
				</view>
			</view>
		</view>

		<view>
			<view class="bg-img margin-auto-lr" @tap="clickReqApply"
				style="width: 192rpx;height: 80rpx; background-image: url('../../static/detail/green_button_tijiao@2x.png');">
			</view>
			<view style="height: 98rpx;"></view>
		</view>
	</view>

</template>

<script>
	import {
		defineComponent,
		toRefs,
		ref,
		reactive,
		unref
	} from 'vue'
	import {
		onLoad,
		onShow
	} from "@dcloudio/uni-app"
	import {
		userData
	} from '../../stores/userData.js'
	import Cache from '../../utils/cache.js'
	import {
		BaseCacheKey
	} from '../../utils/type.js'
	import {
		reqCommendApply
	} from '../../api/commend.js'
	import {
		isUndefined,
		isNull
	} from '../../tools/tool.js'
	import {
		uploadImages
	} from '../../tools/upload.js'
	export default defineComponent({
		props: {},
		setup(props) {
			let applyCommend = null
			onLoad(() => {
				applyCommend = Cache.get(BaseCacheKey.APPLY_COMMEND)
				console.log(applyCommend)
				if (isUndefined(applyCommend) || isNull(applyCommend)) {
					uni.showToast({
						icon: 'none',
						title: '未获取到表彰信息'
					})
					return
				}
			})
			const reason = ref('')
			const imgArray = ref([])
			const clickReqApply = async () => {
				
				let upImgs = []
				for (let i = 0; i < unref(imgArray).length; i++) {
					let item = unref(unref(imgArray)[i])
					let subitem = {
						attachmentName:item.name,
						attachmentUrl:item.url
					}
					upImgs.push(subitem)
				}
				const reqData = {
					applyReason: unref(reason),
					attachments: upImgs,
					commendationId: applyCommend.commendationId
				}
				console.log(reqData)
				// return
				const {
					code,
					data
				} = await reqCommendApply(reqData)
				console.log(data)
				if(code==200){
					uni.showToast({
						icon:'none',
						title:'申请提交成功'
					})
					setTimeout(()=>{
						uni.navigateBack()
					},1500)
				} else {
					uni.showToast({
						icon:'none',
						title:'申请提交失败，请重试'
					})
				}
				//reqCommendApply
			}
			const selectImage = (e) => {
				console.log(e)
				console.log(imgArray)
				uploadImages(e, (upBack) => {
					console.log(upBack)
					imgArray.value = [...unref(imgArray), ...[{
						"name": "aaa.png",
						"extname": "png",
						"url": "http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png"
					}]]
				})
			}
			return {
				imgArray,
				reason,
				applyCommend,
				clickReqApply,
				selectImage
			}
		}
	})
</script>

<style lang="scss">
	.reject-color {
		color: #F53F3F;
	}

	.icon-del-box {
		margin: 0 -10rpx 0 0;

		.icon-del {
			background-color: #ffffff;
		}
	}
</style>