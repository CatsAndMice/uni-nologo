<template>
	<view class="flex margin-xs ">
		<view class="flex">
			<view class="bg-img rank-bg-img-1  " v-if="rankIndex==0"></view>
			<view class="bg-img rank-bg-img-2  " v-else-if="rankIndex==1"></view>
			<view class="bg-img rank-bg-img-3" v-else-if="rankIndex==2"></view>
			<view class="rank-msg" v-else>{{rankIndex+1}}</view>
			<view class="flex ">
				<view class="cu-avatar bg-white" :style="'background-image:url('+ noAvatarDefault(item.avatar)+')'">
				</view>
				
			</view>
		</view>
		<view class="flex justify-between w-100 solidm-bottom padding-bottom-xs">
		<view class="flex flex-direction margin-left-xs ">
			<view class="rank-user">{{item.name}}</view>
			<view class="rank-df">{{item.deptName}}</view>
		</view>
		<view class=" margin-auto-tb ">
			<!-- <view class="flex"> -->
			<!-- <view class="rank-df margin-auto-tb">晶点</view> -->
			<view class="d-font margin-auto-tb rank-score">{{item.value}}</view>
			<!-- </view> -->
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
		noAvatarDefault
	} from '../../tools/tool.js'
	export default defineComponent({
		name: 'rank-cell',
		props: {
			listType: {
				type: Number, //0积分榜
				default: 0
			},

			item:{
				type:Object,
				default:{}
			},
			rankIndex: {
				type: [Number, String],
				default: 999
			},

		},
		setup(props) {
			return {
				noAvatarDefault
			}
		}
	})

</script>

<style lang="scss">

	.rank-bg-img-1 {
		width: 48rpx;
		height: 48rpx;
		margin: auto 4rpx;
		background-image: url('@/static/square/gc_toplist_xunzhang_no1@2x.png');
	}

	.rank-bg-img-2 {
		width: 48rpx;
		height: 48rpx;
		margin: auto 4rpx;
		background-image: url('@/static/square/gc_toplist_xunzhang_no2@2x.png');
	}

	.rank-bg-img-3 {
		width: 48rpx;
		height: 48rpx;
		margin: auto 4rpx;
		background-image: url('@/static/square/gc_toplist_xunzhang_no3@2x.png');
	}
	.rank-msg {
		height: 48rpx;
		width: 48rpx;
		text-align: center;
		line-height: 48rpx;
		font-size: 28rpx;
		color: $jd-text-msg-color;
		font-weight: Medium;
		margin: auto 4rpx;
		
	}
	.rank-user {
		font-size: 28rpx;
		font-weight: Medium;
		line-height: 44rpx;
		color: #1D2129;
	}
	.rank-df {
		font-size: 24rpx;
		line-height: 36rpx;
		color: $jd-text-msg-color;
	}
	.rank-score {
		color: #FFA24A;
		font-size: 40rpx;
	}
	.no-wrap {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>