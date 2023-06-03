<template>
	<view class="" :style="'margin-top:'+top+'rpx'">
		<view class="flex flex-direction">
			<view class="bg-img logo">
			</view>
			<view class="show-msg">{{showMsg}}</view>
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
		name: 'no-data-wrap',
		props: {
			showMsg: {
				type: String,
				default: '暂无数据'
			},
			top:{
				type:Number,
				default:200
			}
		},
		setup(props) {
			const {
				showMsg,
				top
			} = toRefs(props);
			return {

			}
		}
	})
</script>

<style lang="scss">

	.logo {
		width: 160rpx;
		height: 160rpx;
		margin: 0 auto;
		background-image: url('../../static/home/pic_nodata.png');
	}

	.show-msg {
		font-size: 24rpx;
		color: #C9CDD4;
		text-align: center;
		margin-top: 40rpx;
	}
</style>