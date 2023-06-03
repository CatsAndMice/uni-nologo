<template>

	<view class="cu-modal" :class="show?'show':''">
		<view class="cu-dialog bg-white">
			<view class="cu-bar bg-white justify-end">
				<view class="content text-c-title text-bold">折算晶点</view>
				<view class="action" @tap="hideModal">
					<text class="cuIcon-close text-c-msg"></text>
				</view>
			</view>
			<view class="flex justify-center">
				<view class="text-left">
					<view>可结算积分:<span class="margin-left-xs d-font theme-color text-xxl">{{score}}</span></view>
					<view>预计可领取晶点:<span class="margin-left-xs d-font theme-color text-xxl">{{jingdian}}</span></view>
				</view>
			</view>
			<view class="cu-bar bg-white justify-center margin-tb">
				<button class="cu-btn margin-lr text-white round theme-bg-color" style="width: 80%;height: 80rpx; "
					@tap="exchange">立即兑换</button>
			</view>
			<view class="text-c-msg margin-bottom">
				<view>兑换比例会按照参与人数动态浮动哦！</view>
				<view class="margin-top-sm">本月新获得的积分不参与兑换。</view>
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
		name: 'exchange-modal',
		emits: ['close','exchangeJingdian'],
		props: {
			show: {
				type: Boolean,
				default: false
			},
			score: {
				type: Number,
				default: 0.0
			},
			jingdian: {
				type: Number,
				default: 0.0
			}
		},
		setup(props,{emit}) {
			const {
				show,
				score,
				jingdian
			} = toRefs(props)
			const hideModal = ()=>{
				// show.value = false
				emit('close');
			}
			const exchange = ()=>{
				// show.value = false
				emit('exchangeJingdian')
			}
			return {
				hideModal,
				exchange
			}
		}
	})
</script>

<style>

</style>