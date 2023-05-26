<template>
	<view>
		<view style="height: 20rpx;"></view>
		<view class="top-warp margin-lr  bg-gradual-score flex flex-direction" v-if="isIntegral">
			<view class="text-center margin">当前积分</view>
			<view class="d-font text-center text-56  text-bold">28900</view>
		</view>
		<view class="top-warp margin-lr  bg-gradual-jingdian flex flex-direction" v-else>
			<view class="text-center margin">当前晶点</view>
			<view class="d-font text-center text-56  text-bold">28900</view>
		</view>
		<view class="margin ">
			<view class="cu-list radius">
				<view class="cu-item" v-for="item in 20">
					<record-cell></record-cell>
				</view>
			</view>
			<uni-load-more status="noMore"></uni-load-more>
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
		onLoad,
		onPullDownRefresh
	} from "@dcloudio/uni-app"
	import {RecordType} from '../../utils/type.js'
	export default defineComponent({
		props: {
			type:{
				type:String,
				default:''
			}
		},
		setup(props) {
			const {type} = toRefs(props);
			const isIntegral = ref(true);
			onLoad(() => {
				//根据type获取数据
				uploadStyle(type.value)
				requestListData()
			})
			onPullDownRefresh(()=>{
				
			})
			const uploadStyle = (type)=>{
				console.log(type);
				if(type === RecordType.INTEGRAL){
					isIntegral.value = true;
					uni.setNavigationBarTitle({
						title: '积分明细'
					});
				} else {
					isIntegral.value = false
					uni.setNavigationBarTitle({
						title: '晶点明细'
					});
				}
			}
			
			const requestListData = (type)=>{
				//请求对应数据
			}
			return {
				isIntegral
			}
		}
	})
</script>

<style lang="scss">
	.top-warp {
		height: 192rpx;
		color: #ffffff;
		border-radius: 15rpx;

	}

	.bg-gradual-score {
		background-image: linear-gradient(45deg, #FFA24A, #FFB74A);
		color: #ffffff;
	}
		
	.bg-gradual-jingdian {
		background-image: linear-gradient(45deg, #4E4AFF, #4A92FF);
		color: #ffffff;
	}
</style>