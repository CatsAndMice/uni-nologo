<template>
	<view class="margin-lr flex">
		<view>
			<view class="cu-avatar round user"
				:style="{ backgroundImage: `url(${noAvatarDefault(avatar)})`, width: avatarSize, height: avatarSize }">
			</view>
		</view>
		<view class="flex flex-direction margin-left-sm justify-center">
			<view class="flex">
				<view class=" text-bold margin-right-xs line1" style="max-width: 320rpx;font-size: 32rpx;">{{ name }}
				</view>
				<view class=" margin-auto-tb text-lv">
					<image :src="picLvImage" style="font-size: 0;width: 26rpx;height: 28rpx;" />
					<text style="height: 32rpx;display: inline-block;line-height: 32rpx;">{{ level }}</text>
				</view>
			</view>
			<slot>
				<view class="margin-top-xs flex flex-direction">
					<view v-if="(currentLevelTotalExperience - experience) >= 0" class="text-c-msg text-xs ">距下一级还需
						{{ currentLevelTotalExperience - experience + 1 }} 点经验 </view>
					<view v-else class="text-c-msg text-xs">恭喜，你已达到最高等级</view>
					<view class="cu-progress round margin-top-xs" style="width: 240rpx;height: 6rpx;">
						<view class="theme-bg-color" :style="[{ width: true ? percet : '' }]"></view>
					</view>
				</view>
			</slot>
		</view>
	</view>
</template>

<script>
import { defineComponent, toRefs, computed, unref } from 'vue'
import { noAvatarDefault } from '../../tools/tool.js'
import picLvImage from "@/static/home/pic_Lv.png"

export default defineComponent({
	name: 'user-header',
	props: {
		name: {
			type: String,
			default: '晶点用户'
		},
		avatar: {
			type: String,
			default: ''
		},
		level: {
			type: String,
			default: 'Lv0'
		},
		experience: {
			type: Number,
			default: 0
		},
		currentLevelTotalExperience: {
			type: Number,
			default: 0
		},
		avatarSize: {
			type: String,
			default: '88rpx'
		}

	},
	setup(props) {
		const { experience, currentLevelTotalExperience } = toRefs(props)

		const percet = computed(() => {
			if (unref(currentLevelTotalExperience) == 0 || unref(currentLevelTotalExperience) == '') {
				return '0%'
			}
			if (unref(experience) > unref(currentLevelTotalExperience)) {
				return '100%'
			}
			let data = ((unref(experience) / unref(currentLevelTotalExperience)).toFixed(3)) * 100 +
				"%"
			return data
		})
		return {
			percet,
			noAvatarDefault,
			picLvImage
		}
	}
})
</script>

<style lang="scss">
.cu-avatar.user {
	width: 88rpx;
	height: 88rpx;
	font-size: 2em;
}

.text-lv {
	padding: 0px 8rpx;
	height: 32rpx;
	border-radius: 8rpx;
	background: #888786;
	font-size: 20rpx;
	font-style: normal;
	display: flex;
	justify-content: center;
	align-items: center;
	font-weight: 400;
	color: #FFF;
	background: #888786;
}
</style>