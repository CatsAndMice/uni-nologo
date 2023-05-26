<template>
	<view class="flex margin-sm justify-between">
		<view class="flex">
			<view class="bg-img rank-bg-img-1  " v-if="rankIndex==0"></view>
			<view class="bg-img rank-bg-img-2  " v-else-if="rankIndex==1"></view>
			<view class="bg-img rank-bg-img-3" v-else-if="rankIndex==2"></view>
			<view class="rank-msg" v-else>{{rankIndex}}</view>
			<view class="flex ">
				<view class="cu-avatar radius" :style="'background-image:url('+ iconUrl+')'">
				</view>
				<view class="flex flex-direction margin-left-xs">
					<view class="rank-user">李云迪</view>
					<view class="rank-df">数字信息部</view>
				</view>
				
			</view>
		</view>
		<view class="  ">
			<view class="flex">
			<view class="rank-df margin-auto-tb">积分</view>
			<view class="d-font margin-left-sm rank-score">26000080</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		props: {
			listType: {
				type: Number, //0积分榜
				default: 0
			},
			iconUrl: {
				type: String,
				default: 'http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png'
			},
			userName: {
				type: String,
				default: '走韵用户'
			},
			rankIndex: {
				type: [Number, String],
				default: 999
			},

		},
		computed: {
			// 控制显示的内容
			showUserName() {
				// return this.userName;
				if (!this.userName) {
					return '';
				} else if (this.userName.length > 7) {
					return this.userName.substr(0, 7) + '...';
				} else {
					return this.userName;
				}
			}
		},
		methods: {

		}
	}
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
		color: #1D2129;
	}
	.rank-df {
		font-size: 24rpx;
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