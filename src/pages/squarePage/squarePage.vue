<template>
	<view class="">
		<view style="position: relative;">
			<view class="bg-img top-bg"></view>
			<view class="content">
				<view class="nav-msg">广场</view>
				<view class="list-wrap">
					<view class="title-wrap flex">
						<view class="bg-img title-image"></view>
						<view class="title-msg">总积分榜</view>
					</view>
					<view>
						<uni-list :border="false">
							<rank-cell v-for="(item, index) in showList.value" :item="item" :rank-index="index"></rank-cell>
						</uni-list>
					</view>
				</view>
			</view>
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
import { getRankTotal } from '../../api/rank'
import { RecordType } from '../../utils/type'
export default defineComponent({
	setup() {
		const reqData = reactive({ accountType: RecordType.INTEGRAL, page: 1, size: 15 })
		const showList = reactive([])
		onLoad(() => {
			//调用登录接口--
			reqRankData()
		})
		const tabbar = reactive(TabbarConfig)
		const count = ref(0)

		const reqRankData = async () => {
			const { code, data } = await getRankTotal(reqData)
			if (code == 200) {
				showList.value = data.data
				console.log(showList.value)
			}

		}
		return {
			tabbar,
			showList
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

.content {
	position: relative;
	width: 100%;
	padding-top: 68rpx;
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

.title-wrap {
	width: 300rpx;
	height: 122rpx;
	position: relative;
	top: -30rpx;
	margin: 0 auto;

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