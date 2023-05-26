<template>
	<view class="cu-card article" >
		<view class="cu-item shadow min-margin-tb">
			<view class="flex margin-sm">
				<view class="text-lg text-bold">内部推荐</view>
				<view class="margin-left-sm padding-tb-sm cu-tag bg-blue light sm round ">部门级表彰</view>
			</view>
			<view class="flex">
				<view class="flex-sub">
					<view class="margin-auto-lr" style="width: 96rpx;">
					<view class="cu-avatar lg round " :style="'background-image:url('+ iconUrl+')'"></view>
				</view>
				</view>
				<view class="flex-treble commend-msg">
					新冠疫情仍在全球蔓延。图为3月12日，中国与世界卫生组织在北京以视频连线方式举办新冠肺炎防治中国经验国际通报会。以色列内盖夫本-古里安大学公共卫生系主任纳达夫·戴维诺维奇也表示，针对大流行病起诉一个国家是不会成功的，也不现实。
				</view>
			</view>
			<view class="flex justify-end margin-lr-sm">
				<view class="text-c-msg text-sm">2022年5月11日 14:00</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "get-commend-cell",
		data() {
			return {
iconUrl:'http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png'
			};
		}
	}
</script>

<style lang="scss">
.min-margin-tb {
	margin-top: 10rpx !important;
	margin-bottom: 5rpx !important;
}

.commend-msg {
	line-height: 44rpx;
	color: #4E5969;
}
</style>