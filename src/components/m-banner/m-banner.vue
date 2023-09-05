<template>
	<view>
		<view class="m-banner margin" v-if="show">
			<image class="m-banner-img" :src="img" mode="widthFix" @tap="gotoDetail"></image>
			<view v-if="showClose" class="bg-img close-img" @tap="clickClose"></view>
		</view>
	</view>
</template>

<script>
import { emit } from 'process'
import {
	defineComponent,
	toRefs,
	ref,
	reactive
} from 'vue'
export default defineComponent({
	name: 'm-banner',
	emits: ['close'],
	props: {
		img: {
			type: String,
			default: '../../static/home/home_banner.png'
		},
		link: {
			type: String,
			default: 'https://www.baidu.com'
		},
		show: {
			type: Boolean,
			default: true
		},
		showClose: {
			type: Boolean,
			default: true
		}
	},
	setup(props, { emit }) {
		const {
			img,
			link,
			show
		} = toRefs(props)
		console.log(img.value)
		console.log(link.value)
		const gotoDetail = () => {
			uni.navigateTo({
				url: `/pages/userManual/userManual`
			})
		}
		const clickClose = () => {
			emit('close')
		}
		return {
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
	background-image: url('../../static/home/home_banner_close.png');

}
</style>