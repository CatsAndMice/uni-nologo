<template>
	<view class="bg-white margin radius">
		<view class="flex flex-direction padding-tb">
			<view class="cu-avatar xl round margin-auto-lr"
				:style="'background-image:url('+ item.commendationIcon+')'">
			</view>
			<view class="text-xl text-bold text-c-title text-center margin">{{item.commendationName}}</view>
			<view class="text-c-msg text-center margin-lr">{{item.commendationDescription}}</view>
			<view class="flex justify-between text-center margin-top">
				<view class="flex-sub ">
					<text class="text-sm text-c-msg"><span
							class="d-font text-bold theme-color text-xxl margin-right-xs">{{item.score}}</span>积分</text>
				</view>
				<view class="line-wrap"></view>
				<view class="flex-sub"><text class="text-sm text-c-msg"><span
							class="d-font text-bold theme-color text-xxl margin-right-xs">{{item.experience}}</span>经验值</text></view>
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
	
	export default defineComponent({
		name: 'commend-info-warp',
		props: {
			item:{
				type:Object,
				default:null
			}
		},
		setup(props) {
			
			return {

			}
		}
	})
</script>

<style lang="scss">
	.line-wrap {
		width: 1rpx;
		height: 30rpx;
		background-color: #86909C;
		margin: auto 0;
	}
</style>