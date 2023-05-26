<template>
	<view class="page">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<view class="content">
				<user-header></user-header>
				<view class="margin">
					<integral-exchange></integral-exchange>
				</view>

				<m-banner img="../../static/home/home_banner.png" link="https://www.baidu.com"></m-banner>
				<view class="">
					<view class="flex justify-between margin-lr">
						<view class="text-lg text-bold">近期获得表彰</view>
						<view class="flex" @tap="toCommonedList">
							<view class="text-c-msg text-sm margin-auto-tb">更多</view>
							<view class="bg-img right-icon margin-auto-tb"></view>
						</view>
					</view>
					<view class="commend-warp">
						<get-commend-cell v-for="item in 3"></get-commend-cell>
						<uni-load-more status='noMore'></uni-load-more>
					</view>
				</view>
			</view>
		</view>
		<j-tabbar fixed fill safeBottom current="0" :tabbar="tabbar"></j-tabbar>
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
			const toCommonedList = ()=>{
				uni.navigateTo({
					url:'/pages/commendList/commendList'
				})
			}
			return {
				count,
				clickAddCount,
				toCommonedList,
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
		padding-top: 200rpx;
	}
	.commend-warp {
		margin-top: 10rpx;
		margin-bottom: calc(100rpx + env(safe-area-inset-bottom));
	}
</style>