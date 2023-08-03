<template>
	<view class="">
		<view style="height: 20rpx;"></view>
		<view class="padding-sm margin-lr bg-white radius-lg" style="height: 108rpx;" @tap="clickToMyApply">
			<view class="flex">
				<view class="bg-img apply-img margin-right"></view>
				<view class="text-bold text-lg text-c-title margin-auto-tb">查看我的申请</view>
			</view>
		</view>
		<view class=" apply-wrap">
			<template v-if="commendList.length > 0">
				<commend-apply-cell v-for="item, index in commendList" :data="item" :key="index"
					@clickApply="clickToApply(item)"></commend-apply-cell>
			</template>
			<no-data-wrap v-else showMsg="无可申请表彰项"></no-data-wrap>
		</view>
	</view>
</template>

<script>
import {defineComponent,ref} from 'vue'
import {storeToRefs} from 'pinia'
import {onLoad,onShow} from "@dcloudio/uni-app"
import {getCommendPersonal} from '../../api/commend'
import {userData} from '../../stores/userData.js'
import Cache from '../../utils/cache.js'
import {BaseCacheKey} from '../../utils/type.js'
import YWJATRACK from "@/config/jstrack.js"

export default defineComponent({
	props: {},
	setup(props) {
		const commendList = ref([])
		const userPData = userData()
		const {
			userInfo
		} = storeToRefs(userPData)
		onLoad(() => {
			YWJATRACK.uploadTrack('申请表彰页面', 'key6')
		})
		onShow(() => {
			reqCommendPersonal()
		})
		const reqCommendPersonal = async () => {
			const {
				code,
				data
			} = await getCommendPersonal(userInfo.value.userId)
			if (code == 200) {
				commendList.value = data
			}
		}

		const clickToApply = (item) => {
			Cache.set(BaseCacheKey.APPLY_COMMEND, item)
			//先保存申请项
			uni.navigateTo({
				url: '/pages/applyCommendForm/applyCommendForm'
			})
		}
		const clickToMyApply = () => {
			uni.navigateTo({
				url: '/pages/myApplyList/myApplyList'
			})
		}
		return {
			commendList,
			clickToApply,
			clickToMyApply
		}
	}
})
</script>

<style lang="scss">
.apply-img {
	width: 64rpx;
	height: 64rpx;
	background-image: url('../../static/home/icon_32pt_shenqing@2x.png');
}

.apply-wrap {
	margin-top: 20rpx;
	margin-bottom: env(safe-area-inset-bottom);
}

.cu-list+.cu-list {
	margin-top: 16rpx;
}
</style>