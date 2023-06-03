<template>
	<view class="cu-card article">
		<view class="cu-item shadow min-margin-tb">
			<view class="flex margin-sm">
				<view class="text-lg text-bold">{{ item.title }}</view>
				<view class="margin-left-sm padding-tb-sm cu-tag light sm round " :class="tagColor">{{ tagName }}</view>
			</view>
			<view class="flex">
				<view class="flex-sub">
					<view class="margin-auto-lr" style="width: 96rpx;">
						<view class="cu-avatar lg round " :style="'background-image:url(' + item.icon + ')'"></view>
					</view>
				</view>
				<view class="flex-treble commend-msg">
					{{ item.message }}</view>
			</view>
			<view class="flex justify-end margin-lr-sm">
				<view class="text-c-msg text-sm">{{ item.time }}</view>
			</view>
		</view>
	</view>
</template>

<script>
import {
	defineComponent,
	toRefs,
	ref,
	reactive,
	computed
} from 'vue'

export default defineComponent({
	name: 'get-commend-cell',
	props: {
		item: {
			type: Object,
			default: {
				title: '内部推荐',
				icon: 'http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png',
				type: 2,
				message: '红红火火恍恍惚惚',
				time: '2020年5月11日 14:00'
			}
		}
	},
	setup(props) {
		const { item } = toRefs(props);
		const tagName =computed(() => {
			if (item.type == 0) {
				return "部门级表彰"
			} else if (item.type == 1) {
				return "公司级表彰"
			} else if (item.type == 2) {
				return "工会级表彰"
			} else  {
				return "员工级表彰"
			}
		})
		const tagColor = computed(() => {
			if (item.type == 0) {
				return "bg-blue"
			} else if (item.type == 1) {
				return "bg-orange"
			} else if (item.type == 2) {
				return "bg-green"
			} else  {
				return "bg-gray"
			}
		})
		return {
			tagName,
			tagColor
		}
	}
})
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