<template>
	<view class="page">
		<view class="content">
		<view class="bg-img logo">
		</view>
		<view class="show-msg">暂无权限使用该小程序</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
.page {
		width: 100vw;
		height: 100vh;
		background-color: #ffffff;
	}
	.content {
		position: absolute;
		top: 30%;
		left: 135rpx;
	}
	.logo {
		width: 480rpx;
		height: 480rpx;
		background-image: url('../../static/launch/pic_noadmin@2x.png');
	}
	.show-msg {
		font-size: 24rpx;
		color: $jd-text-msg-color;
		text-align: center;
		margin-top: 40rpx;
	}
</style>
