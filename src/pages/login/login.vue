<template>
	<view class="page">
		<view class="bg-img logo">
		</view>
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
			onLoad(() => {
				//调用登录接口--
				loginMethod()
			})
			const loginMethod = ()=>{
				//无权限==
				//跳转到默认页==
				// uni.reLaunch({
				// 	url:'/pages/noAuthorityPage/noAuthorityPage'
				// })
				// return
				//检查是否已进入过
				const hasEnter = Cache.get(BaseCacheKey.HAS_ENTER);
				console.log(hasEnter);
				if(hasEnter){
					uni.reLaunch({
						url: '/pages/index/index'
					})
				} else {
					uni.reLaunch({
						url: '/pages/introducePage/introducePage'
					})
				}
			}
			return {

			}
		}
	})
</script>

<style>
	.page {
		width: 100vw;
		height: 100vh;
		background-color: #FFA24A;
	}

	.logo {
		position: absolute;
		top: 40%;
		left: 215rpx;
		width: 320rpx;
		height: 320rpx;
		background-image: url('../../static/launch/pic_Bootlogo@2x.png');
	}
</style>