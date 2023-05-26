<template>
	<view>
	<view class="commend-warp">
			<get-commend-cell v-for="item in 5"></get-commend-cell>
			<uni-load-more status=''></uni-load-more>
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
	.commend-warp {
		margin-top: 10rpx;
		margin-bottom:  env(safe-area-inset-bottom);
	}
</style>
