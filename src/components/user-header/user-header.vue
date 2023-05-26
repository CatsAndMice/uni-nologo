<template>
	<view class="margin-lr flex">
		<view>
			<view class="cu-avatar round user"
				:style="'background-image:url('+ 'http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png'+')'">
			</view>
		</view>
		<view class="flex flex-direction margin-left-sm">
			<view class="flex">
				<view class="text-xl text-bold margin-right-xs">Hi,某某某</view>
				<view class=" margin-auto-tb text-lv ">Lv2</view>
			</view>
			<view class="margin-top-xs flex flex-direction">
				<view class="text-c-msg text-xs">经验值 <span class="margin-left-xs text-sm">98/100</span></view>
				<view class="cu-progress round " style="width: 240rpx;height: 4rpx;">
					<view class="theme-bg-color" :style="[{ width:true?'61.8%':''}]"></view>
				</view>
			</view>
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
		name: 'user-header',
		props: {
		},
		setup(props) {
	
			return {

			}
		}
	})
</script>

<style lang="scss">
	.cu-avatar.user {
		width: 88upx;
		height: 88upx;
		font-size: 2em;
	}

	.text-lv {
		color: #4E5969;
	}
</style>