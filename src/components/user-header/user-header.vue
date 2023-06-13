<template>
	<view class="margin-lr flex">
		<view>
			<view class="cu-avatar round user" :style="'background-image:url('+ noAvatarDefault(avatar) +')'">
			</view>
		</view>
		<view class="flex flex-direction margin-left-sm">
			<view class="flex">
				<view class="text-xl text-bold margin-right-xs">Hi,{{name}}</view>
				<view class=" margin-auto-tb text-lv ">{{level}}</view>
			</view>
			<view class="margin-top-xs flex flex-direction">
				<view v-if="(currentLevelTotalExperience - experience)>=0" class="text-c-msg text-xs ">距下一级还需 {{currentLevelTotalExperience - experience + 1}} 点经验 </view>
				<view v-else class="text-c-msg text-xs">恭喜，你已达到最高等级</view>
				<view class="cu-progress round margin-top-xs" style="width: 240rpx;height: 4rpx;">
					<view class="theme-bg-color" :style="[{ width:true?percet:''}]"></view>
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
		reactive,
		computed,
		unref
	} from 'vue'
	import {
		noAvatarDefault
	} from '../../tools/tool.js'
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
			}

		},
		setup(props) {
			const {
				experience,
				currentLevelTotalExperience
			} = toRefs(props)
			const percet = computed(() => {
				if (unref(currentLevelTotalExperience) == 0 || unref(currentLevelTotalExperience) == '') {
					return '0%'
				}
				if(unref(experience)>unref(currentLevelTotalExperience)){
					return '100%'
				}
				let data = ((unref(experience) / unref(currentLevelTotalExperience)).toFixed(3)) * 100 +
					"%"
				return data
			})
			return {
				percet,
				noAvatarDefault
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