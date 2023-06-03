<template>
	<view class="cu-list menu card-menu " @tap="clickJump">
		<view class="cu-item ">
			<view class="flex flex-direction">
				<view class="flex justify-between">
					<view class="flex margin-tb-sm">
						<view class="text-lg text-bold">{{data.commendationName}}</view>
						<view class="margin-left-sm padding-tb-sm cu-tag bg-blue light sm round ">部门级表彰</view>
					</view>
					<view class="text-c-msg text-sm margin-auto-tb">审批中</view>
				</view>
				<view class="flex justify-between margin-bottom w-100">
					<view class="flex w-100">
						<view class="">
							<view class="margin-auto-lr" style="width: 96rpx;">
								<view class="cu-avatar lg round "
									:style="'background-image:url('+ 'http://file.517070.cn/music/mPhoto/8f0395646e2641618121808a512f8a7b.png'+')'">
								</view>
							</view>
						</view>
						<view class="margin-auto-tb ">
							<view class="margin-left-sm text-c-msg line2" style="max-width: 550rpx;">
								新冠疫织在不会成功的疫织在不会成功的疫织在不会成功的疫织在不会成功的，也不现实。</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		emit
	} from 'process';
	import {
		defineComponent,
		toRefs,
		ref,
		reactive
	} from 'vue'
	export default defineComponent({
		name: 'my-apply-cell',
		emits: ['clickToDetail'],
		props: {
			data: {
				type: Object,
				default: null
			},
		},
		setup(props, {
			emit
		}) {
			const {
				data
			} = toRefs(props);

			function clickJump() {
				emit('clickToDetail')
			}
			return {
				clickJump
			}
		}
	})
</script>

<style lang="scss">

</style>