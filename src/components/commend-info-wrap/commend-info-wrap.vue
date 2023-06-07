<template>
	<view class="bg-white margin radius">
		<view class="flex flex-direction padding-tb">
			<view class="cu-avatar xl radius margin-auto-lr"
				:style="'background-image:url('+ noImageDefault(icon)+')'">
			</view>
			<view class="text-xl text-bold text-c-title text-center margin">{{name}}</view>
			<view class="text-c-msg text-center margin-lr">{{description}}</view>
			<view class="flex justify-between text-center margin-top">
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
		background-color: #86909C;
		margin: auto 0;
	}
</style>