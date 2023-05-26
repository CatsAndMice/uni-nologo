<template>
	<view>
		<view class="m-banner margin" v-if="!isClose">
			<image class="m-banner-img" :src="img" mode="widthFix" @tap="gotoDetail"></image>
			<view class="bg-img close-img" @tap="clickClose"></view>
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
	export default defineComponent({
		name: 'm-banner',
		props: {
			img: {
				type: String,
				default: '../../static/home/home_banner.png'
			},
			link: {
				type: String,
				default: 'https://www.baidu.com'
			}
		},
		setup(props) {
			const {
				img,
				link
			} = toRefs(props)
			console.log(img.value)
			console.log(link.value)
			const isClose = ref(false)
			const gotoDetail = () => {
				uni.navigateTo({
					url: `/pages/webview/webview?url=${link.value}`
				})
			}
			const clickClose = () => {
				isClose.value = true;
			}
			return {
				isClose,
				gotoDetail,
				clickClose
			}
		}
	})
</script>

<style lang="scss">
	.m-banner {
		position: relative;
	}

	.m-banner-img {
		width: 100%;
		border-radius: 15rpx;
	}

	.close-img {
		position: absolute;
		top: 0;
		right: 0;
		width: 32rpx;
		height: 32rpx;
		background-image: url('../../static/home/home_banner_close@2x.png');
	}
</style>