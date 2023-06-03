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
	import {
		dingLogin
	} from '../../api/authLogin.js'
	import {
		LoginType
	} from '../../utils/type.js'
	export default defineComponent({
		setup() {
			onLoad(() => {
				//调用登录接口--
				loginMethod()
			})
			const loginMethod = () => {
				//钉钉登录
				dingLogin((status) => {
					if (status === LoginType.LOGIN_SUCCESS) {
						//获取用户信息
						checkEnterStatus()
					} else if(status === LoginType.LOGIN_FAIL) {
						//弹窗提示
						uni.showModal({
							title: '提示',
							content: '授权登录失败',
							confirmText:'重试',
							cancelText:'取消',
							success: function (res) {
								if (res.confirm) {
									loginMethod()
								} else if(res.cancel){
									enterNoAuthPage()
								} 
							}
						});
					} else {
						//无权限--跳转到默认页==
						enterNoAuthPage()
					}
				})
				return
			}
			const enterNoAuthPage = ()=>{
				uni.reLaunch({
					url:'/pages/noAuthorityPage/noAuthorityPage'
				})
			}
			const checkEnterStatus = ()=>{
				//检查是否已进入过
				const hasEnter = Cache.get(BaseCacheKey.HAS_ENTER);
				console.log(hasEnter);
				if (hasEnter) {
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