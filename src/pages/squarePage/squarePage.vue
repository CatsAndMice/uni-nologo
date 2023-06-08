<template>
	<view class="">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<z-paging ref="paging" v-model="showList" @query="queryList" :refresher-enabled="false" :loading-more-enabled="false">
				<template #top>
					<view style="height: 98rpx;"></view>
				</template>
				<view class=" margin-lr ">
				<view class="title-wrap flex">
					<view class="bg-img title-image"></view>
					<view class="title-msg">总晶点榜</view>
				</view>

				<!-- </template> -->
				<view class="bg-white radius-lg padding-tb">
					<view class="bg-white" style="height: 80rpx;"></view>
					<uni-list :border="false">
						<rank-cell v-for="(item, index) in showList" :key="index" :item="item"
							:rank-index="index"></rank-cell>
					</uni-list>
				</view>
				<view class="bottom-warp"></view>
				</view>
			</z-paging>
		</view>
		<j-tabbar fixed fill safeBottom current="2" :tabbar="tabbar"></j-tabbar>
	</view>
</template>

<script>
	import TabbarConfig from '@/config/tabbar.js'
	import {
		defineComponent,
		ref,
		reactive
	} from 'vue'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		getRankTotal
	} from '../../api/rank'
	import {
		RecordType
	} from '../../utils/type'
	export default defineComponent({
		setup() {
			const paging = ref(null);
			const showList = ref([])
			onLoad(() => {
				//调用登录接口--
				// reqRankData()
			})
			const tabbar = reactive(TabbarConfig)

			// const reqRankData = async () => {
			// 	const {
			// 		code,
			// 		data
			// 	} = await getRankTotal(reqData)
			// 	if (code == 200) {
			// 		showList.value = data.data
			// 		console.log(showList.value)
			// 	}

			// }
			const queryList = async (pageNo, pageSize) => {

				let query = {
					accountType: RecordType.JINGDIAN,
					page: pageNo,
					size: pageSize
				}
				const {
					code,
					data
				} = await getRankTotal(query)
				if (code == 200) {
					console.log(data)
					paging.value.complete(data.data);
				} else {
					paging.value.complete(false);
				}
			}
			return {
				tabbar,
				showList,
				queryList,
				paging
			}
		}
	})
</script>
<style lang="scss">
	.top-bg {
		position: absolute;
		top: 0;
		width: 100vw;
		height: 496rpx;
		background-image: url('../../static/home/home_hearder_bg@2x.png');
	}

	.radius-top {
		border-top-left-radius: 10rpx;
		border-top-right-radius: 10rpx;
	}


	.nav-msg {
		font-size: 32rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #191919;
		font-weight: Semibold;
		text-align: center;
		width: 100%;
	}

	.list-wrap {
		background-color: #ffffff;
		margin: 40rpx auto;
		border-radius: 10rpx;
		width: calc(100vw - 48rpx);
		min-height: calc(100vh - 310rpx - env(safe-area-inset-bottom));
		margin-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	.bottom-warp {
		margin-bottom: calc(140rpx + env(safe-area-inset-bottom));
	}

	.title-wrap {
		width: 300rpx;
		height: 122rpx;
		position: relative;
		margin: 0 auto;
		bottom: -80rpx;
		z-index: 2;

		.title-image {
			width: 108rpx;
			height: 122rpx;
			background-image: url('../../static/square/square_logo.png');
		}

		.title-msg {
			font-size: 32rpx;
			font-weight: Medium;
			margin-top: 40rpx;
			margin-left: 20rpx;
			line-height: 80rpx;
		}
	}
</style>