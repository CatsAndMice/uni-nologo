<template>
	<view class="page" :class="isAuto?'page-bg-dian':'bg-white'">
		<view class="bg-img logo" v-if='isAuto'>
		</view>
		<view class="" v-else>
			<view class="img-a">
				<view class="t-b">
					您好，
					<br />
					欢迎使用晶点
				</view>
			</view>
			<view class="login-view" style="">
				<view class="t-login">
					<form class="cl">
						<view class="t-a flex margin-bottom-sm">
							<text class="txt margin-auto-tb">账号</text>
							<input type="text"  name="phone" placeholder="请输入您的账号" v-model="account" />
						</view>
						<view class="t-a flex margin-bottom-sm">
							<text class="txt margin-auto-tb">密码</text>
							<input type="text" name="code" :password="true" maxlength="18" placeholder="请输入您的密码" v-model="pwd" />
						</view>
						<button @tap="loginAccount()">登 录</button>
					</form>

				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		ref,
		unref
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import Cache from '@/utils/cache.js'
	import {
		BaseCacheKey,
		BaseDataKey
	} from '@/utils/type.js'
	import {
		dingLogin,
		accountLogin
	} from '../../api/authLogin.js'
	import {
		LoginType
	} from '../../utils/type.js'


	export default defineComponent({
		setup() {
			onLoad(() => {
				// if (process.env.UNI_NODE_ENV !== 'prod') {
				// 	uni.reLaunch({ url: '/pages/handLogin/handLogin' })
				// 	return
				// }
				//调用登录接口--
				loginMethod()
			})
			const loginMethod = () => {
				//钉钉登录
				dingLogin((status) => {
					if (status === LoginType.LOGIN_SUCCESS) {
						//获取用户信息
						// checkENVShow()
						checkEnterStatus()
					} else if (status === LoginType.LOGIN_FAIL) {
						checkENVShow()
						
					} else {
						//无权限--跳转到默认页==
						enterNoAuthPage()
					}
				})
				return
			}
			const checkENVShow = ()=>{
				if(process.env.UNI_NODE_ENV=='prod'){
					//弹窗提示
					uni.showModal({
						title: '提示',
						content: '授权登录失败',
						confirmText: '重试',
						cancelText: '取消',
						success: function(res) {
							if (res.confirm) {
								loginMethod()
							} else if (res.cancel) {
								enterNoAuthPage()
							}
						}
					});
				} else {
					isAuto.value = false
				}
			}
			const enterNoAuthPage = () => {
				uni.reLaunch({
					url: '/pages/noAuthorityPage/noAuthorityPage'
				})
			}
			const checkEnterStatus = () => {
				//检查是否已进入过
				const hasEnter = Cache.get(BaseCacheKey.HAS_ENTER);
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

			const isAuto = ref(true)
			const account = ref('')
			const pwd = ref('Aa123456.')
			const zhuhu = ref(1)
			const loginAccount = () => {

				let params = {
					account: unref(account),
					password: unref(pwd),
				}
				accountLogin(params, (status) => {
					if (status === LoginType.LOGIN_SUCCESS) {
						//获取用户信息
						checkEnterStatus()
					} else {
						uni.showToast({
							icon: 'none',
							title: '登录失败'
						})
					}
				})
				return
			}
			return {
				loginAccount,
				account,
				pwd,
				zhuhu,
				isAuto
			}
		}
	})
</script>

<style>
	.page {
		width: 100vw;
		height: 100vh;
		
	}
	.page-bg-dian {
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

	.txt {
		font-size: 32rpx;
		font-weight: bold;
		color: #333333;
		width: 100rpx;
	}

	.img-a {
		width: 100%;
		height: 450rpx;
		/* background-image: url(../../static/head.png); */
		background-size: 100%;
	}

	.reg {
		font-size: 28rpx;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
		background: #f5f6fa;
		color: #000000;
		text-align: center;
		margin-top: 30rpx;
	}

	.login-view {
		width: 100%;
		position: relative;
		margin-top: -120rpx;
		background-color: #ffffff;
		border-radius: 8% 8% 0% 0;
	}

	.t-login {
		width: 600rpx;
		margin: 0 auto;
		font-size: 28rpx;
		padding-top: 80rpx;
	}

	.t-login button {
		font-size: 28rpx;
		background: #2796f2;
		color: #fff;
		height: 90rpx;
		line-height: 90rpx;
		border-radius: 50rpx;
		font-weight: bold;
	}

	.t-login input {
		height: 90rpx;
		line-height: 90rpx;
		margin-left: 50rpx;
		/* margin-bottom: 50rpx; */
		border-bottom: 1px solid #e9e9e9;
		font-size: 28rpx;
	}

	.t-login .t-a {
		/* position: relative; */
	}

	.t-b {
		text-align: left;
		font-size: 42rpx;
		color: #000;
		padding: 130rpx 0 0 70rpx;
		font-weight: bold;
		line-height: 70rpx;
	}

	.t-login .t-c {
		position: absolute;
		right: 22rpx;
		top: 22rpx;
		background: #5677fc;
		color: #fff;
		font-size: 24rpx;
		border-radius: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		padding: 0 25rpx;
	}

	.t-login .t-d {
		text-align: center;
		color: #999;
		margin: 80rpx 0;
	}

	.t-login .t-e {
		text-align: center;
		width: 250rpx;
		margin: 80rpx auto 0;
	}

	.t-login .t-g {
		float: left;
		width: 50%;
	}

	.t-login .t-e image {
		width: 50rpx;
		height: 50rpx;
	}

	.t-login .t-f {
		text-align: center;
		margin: 150rpx 0 0 0;
		color: #666;
	}

	.t-login .t-f text {
		margin-left: 20rpx;
		color: #aaaaaa;
		font-size: 27rpx;
	}

	.t-login .uni-input-placeholder {
		color: #aeaeae;
	}

	.cl {
		zoom: 1;
	}

	.cl:after {
		clear: both;
		display: block;
		visibility: hidden;
		height: 0;
		content: '\20';
	}
</style>