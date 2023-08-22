<template>
	<view class="cu-modal bottom-modal" :class="show ? 'show' : ''">
		<view class="cu-dialog df-bg-color" style="height: 100%;">
			<view class="foot-pop">
				<view class="fixed flex-direction">

					<view v-show="!isEmpty(list)" :class="show ? 'animation-slide-bottom' : ''"
						:style="[{ animationDelay: 2 * 0.1 + 's' }]" class="margin-lr-24 radius-12 bg-q-blue"
						@tap="onClickDept">
						<view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-bmbz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										部门表彰
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										下属表现优秀，鼓励一下
									</view>
								</view>
							</view>
							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>

					<view :class="show ? 'animation-slide-bottom' : ''" :style="[{ animationDelay: 3 * 0.1 + 's' }]"
						class="margin-lr-24 radius-12 bg-q-red" @tap="clickItem(colleaguesLive)">
						<view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-tsdz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										同事表扬
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										给优秀的同事送朵小红花
									</view>
								</view>
							</view>

							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>
					<view :class="show ? 'animation-slide-bottom' : ''" :style="[{ animationDelay: 4 * 0.1 + 's' }]"
						class="margin-lr-24 radius-12 bg-q-yellow" @tap="clickItem(commendPage)">
						<view class="flex justify-between margin-tb w-100">
							<view class="flex w-100">
								<view class="margin-12">
									<view class="margin-auto-lr" style="width: 96rpx;">
										<view class="cu-avatar lg-warp radius  bg-clear"
											style="background-image:url('./static/commend/icon-48px-sqbz@2x.png')">
										</view>
									</view>
								</view>
								<view class="margin-auto-tb ">
									<view class="margin-left-sm line-height-24 text-c-title text-bold text-lg text-left">
										申请表彰
									</view>
									<view class="margin-left-sm margin-top-8 line-height-20 text-c-msg line1"
										style="max-width: 460rpx;">
										诸多表彰奖励，达成即可申请
									</view>
								</view>
							</view>
							<view class="margin-auto-tb margin-right-12" style="width: 48rpx;">
								<view class="cu-avatar  bg-clear "
									style="background-image:url('./static/commend/chevron-right@2x.png')"></view>
							</view>
						</view>
					</view>
					<view :class="show ? 'animation-slide-bottom' : ''" :style="[{ animationDelay: 5 * 0.1 + 's' }]"
						style="margin-top: 98rpx;margin-bottom: 58rpx;" @tap="hideModal">
						<view class="bg-img margin-auto-lr flex justify-center"
							style="background-image:url('./static/commend/bg@2x.png');width: 90rpx;height: 64rpx;">
							<image class="margin-auto-tb" src="../../static/commend/close@2x.png" mode="aspectFit"
								style="width: 48rpx;height: 48rpx;"></image>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

	<uni-popup ref="popupRef" :is-mask-click="false">
		<live-popup-content title='选择发起部门' :list="list" @change="onChange" @close="close" />
	</uni-popup>
</template>

<script>
import { defineComponent, onBeforeMount, unref } from 'vue'
import useList from "@c/useList.js"
import { getDept } from "@a/live"
import { to } from "await-to-js"
import isEmpty from 'medash/lib/isEmpty'
import usePopup from "@c/usePopup.js"
import YWJATRACK from "@/config/jstrack.js"

export default defineComponent({
	name: 'commend-item-popup',
	emits: ['close', 'jumpPage'],
	props: {
		show: {
			type: Boolean,
			default: false
		}
	},
	setup(props, { emit }) {
		const colleaguesLive = '/pages/colleaguesLive/colleaguesLive'
		const commendPage = '/pages/commendPage/commendPage'
		const deptLive = '/pages/deptLive/deptLive'

		const { open, close, popupRef } = usePopup()

		const { list, onLoadList } = useList(async () => {
			const [err, result] = await to(getDept())
			return result
		})

		const hideModal = () => {
			emit('close');
		}

		const pageNavigateTo = (url) => {
			uni.navigateTo({ url })
		}

		const clickItem = (url) => {
			hideModal()
			pageNavigateTo(url)
		}

		const onClickDept = () => {
			hideModal()
			const unrefList = unref(list) || []
			if (unrefList.length > 1) {
				open()
				YWJATRACK.uploadTrack('跳转部门表彰页面前选择部门','dept')
				return
			}
			pageNavigateTo(deptLive)
		}

		const onChange = (dept) => {
			const { deptId, deptName, energyExternal, energyInternal } = dept
			const url = deptLive + `?deptId=${deptId}&deptName=${deptName}&energyExternal=${energyExternal}&energyInternal=${energyInternal}`
			pageNavigateTo(url)
		}

		onBeforeMount(() => {
			onLoadList()
		})

		return {
			list,
			isEmpty,
			hideModal,
			clickItem,
			colleaguesLive,
			commendPage,
			open,
			close,
			popupRef,
			onChange,
			onClickDept
		}
	}
})
</script>

<style lang="scss">
.foot-pop {
	position: fixed;
	bottom: 0;
	width: 100%;
	padding-bottom: env(safe-area-inset-bottom);
}

.bg-q-blue {
	background-color: #F2FAFE;
}

.bg-q-red {
	background-color: #FDF2EE;
}

.bg-q-yellow {
	background-color: #FEF4E0;
}
</style>