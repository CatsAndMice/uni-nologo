<template>
	<view class="bg-white margin-lr-12 margin-tb-16 radius-lg">
		<view class="flex flex-direction padding-tb">
			<view class="cu-avatar xl-warp radius bg-white margin-auto-lr"
				:style="'background-image:url('+ noImageDefault(icon)+')'">
			</view>
			<view class="text-xl text-bold line-height-56 text-c-title text-center margin-top-8">{{name}}</view>
			<view class="text-c-msg text-center line-height-44 margin-top-8 margin-lr">{{description}}</view>
			<view class="flex justify-between text-center margin-top-8">
				<view class="flex-sub ">
					<text class="text-sm text-c-msg"><span
							class="d-font text-bold theme-color text-xxl margin-right-xs">{{score}}</span>晶点</text>
				</view>
				<view class="line-wrap"></view>
				<view class="flex-sub"><text class="text-sm text-c-msg"><span
							class="d-font text-bold theme-color text-xxl margin-right-xs">{{experience}}</span>经验值</text></view>
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
		noImageDefault
	} from '../../tools/tool.js'
	export default defineComponent({
		name: 'commend-info-warp',
		props: {
			icon:{
				type:String,
				default:''
			},
			name:{
				type:String,
				default:''
			},
			description:{
				type:String,
				default:''
			},
			score:{
				type:Number,
				default:0
			},
			experience:{
				type:Number,
				default:0
			}

		},
		setup(props) {
			
			return {
				noImageDefault
			}
		}
	})
</script>

<style lang="scss">
	.line-wrap {
		width: 1rpx;
		height: 30rpx;
		background-color: #E5E6EB;
		margin: auto 0;
	}
	.line-height-56 {
		line-height: 56rpx;
	}
	.line-height-44 {
		line-height: 44rpx;
	}
</style>