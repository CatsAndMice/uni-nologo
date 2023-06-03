<template>
	<view>
		<swiper class="screen-swiper  " :current="current" indicator-active-color="#FFA24A" :indicator-dots="true"
			@change="swiperChange">
			<swiper-item v-for="(item,index) in swiperList" :key="index">
				<view class="page-swiper">
					<image class="image-wrap" :src="item.url" mode="aspectFit" v-if="item.type=='image'"></image>
				</view>
			</swiper-item>
		</swiper>
		<button v-if="current==2" class="enter-btn" @click="enterMainPage">立即体验</button>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref,
		reactive
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import Cache from '@/utils/cache.js'
	import {
		BaseCacheKey
	} from '@/utils/type.js'
	export default defineComponent({
		setup() {
			onLoad(() => {})
			const current = ref(0);
			const swiperList = reactive(
				[{
					id: 0,
					type: 'image',
					url: '/static/launch/pic_Bootpage1@2x.png'
				}, {
					id: 1,
					type: 'image',
					url: '/static/launch/pic_Bootpage2@2x.png',
				}, {
					id: 2,
					type: 'image',
					url: '/static/launch/pic_Bootpage3@2x.png'
				}])

			const swiperChange = (e) => {
				current.value = e.detail.current
				console.log(current.value)
			}
			const enterMainPage = () => {
				Cache.set(BaseCacheKey.HAS_ENTER, true);
				uni.reLaunch({
					url: '/pages/index/index'
				})
			}
			return {
				current,
				swiperList,
				swiperChange,
				enterMainPage

			}
		}
	})
</script>

<style>
	.page-swiper {
		width: 100vw;
		height: calc(100vh - 300rpx);
	}

	.enter-btn {
		width: 440rpx;
		height: 80rpx;
		background-color: #FFA24A;
		font-size: 28rpx;
		line-height: 80rpx;
		font-weight: Medium;
		color: #ffffff;
		border-radius: 40rpx;
		margin: 80rpx auto;

	}
</style>