<template>
	<view class="page">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<view class="content">
				<view class="nav-msg">广场</view>
				<view class="list-warp">
					<view class="title-warp flex">
						<view class="bg-img title-image"></view>
						<view class="title-msg">总积分榜</view>
					</view>
					<view>
						<uni-list :border="false">
							<!-- <uni-list-item v-for="item in 3" title="列表文字"></uni-list-item>
							<uni-list-item :disabled="true" title="列表禁用状态"></uni-list-item> -->
							<!-- <uni-list-item>
								
							</uni-list-item> -->
						
							<rank-cell v-for="(item,index) in 20" :rank-index="index"></rank-cell>
						</uni-list>
					</view>
				</view>
			</view>
		</view>
		<j-tabbar fixed fill safeBottom current="2" :tabbar="tabbar"></j-tabbar>
	</view>
</template>

<script>
	import TabbarConfig from '@/config/tabbar.js'
	import {
		defineComponent,
		ref,
		reactive
	} from 'vue'
	export default defineComponent({
		setup() {
			const tabbar = reactive(TabbarConfig)
			const count = ref(0)
			const clickAddCount = () => {
				count.value = ++count.value
			}

			return {
				count,
				clickAddCount,
				tabbar
			}
		}
	})
</script>
<style lang="scss">
	.page {
		width: 100vw;
	}

	.top-bg {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 496rpx;
		background-image: url('../../static/home/home_hearder_bg@2x.png');
	}

	.content {
		position: relative;
		width: 100%;
		padding-top: 68rpx;
	}

	.nav-msg {
		font-size: 32rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #191919;
		font-weight: Semibold;
		text-align: center;
		width: 100%;
	}

	.list-warp {
		background-color: #ffffff;
		margin: 40rpx auto;
		border-radius: 10rpx;
		width: calc(100vw - 48rpx);
		min-height: calc(100vh - 310rpx - env(safe-area-inset-bottom));
		margin-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	.title-warp {
		width: 300rpx;
		height: 122rpx;
		position: relative;
		top: -30rpx;
		margin: 0 auto;

		.title-image {
			width: 108rpx;
			height: 122rpx;
			background-image: url('../../static/square/square_logo.png');
		}

		.title-msg {
			font-size: 32rpx;
			font-weight: Medium;
			margin-top: 40rpx;
			margin-left: 20rpx;
			line-height: 80rpx;
		}
	}
</style>