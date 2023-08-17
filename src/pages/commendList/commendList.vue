<template>
	<view>
		<z-paging ref="paging" v-model="myCommendsList" @query="queryList">
			<view style="height: 20rpx;"></view>
			<view class="commend-wrap">
				<get-commend-cell v-for="item, index in myCommendsList" :item="item" :key="index">
					<template #top-initiator>
						<view v-show="['DEPT', 'LIKE'].includes(item.source)" class="align-center margin-top-8"
							style="border-radius: 6rpx;border: 2rpx solid #F7AF6C;display: inline-flex;">
							<view
								style="width: 104rpx;height: 48rpx;line-height: 48rpx;text-align: center; background: #F7AF6C;font-size: 24rpx;font-weight: 600;color: #FFFFFF;">
								提名人</view>
							<view class="padding-lr-16" style="font-size: 24rpx;font-weight: 400;display: inline-block;">{{
								item.initiator.deptName + '-' + item.initiator.name }}</view>
						</view>
					</template>
				</get-commend-cell>
			</view>
		</z-paging>
	</view>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { storeToRefs } from 'pinia'
import { userData } from '../../stores/userData.js'
import { getCommendDistribute } from '../../api/commend'
import YWJATRACK from "@/config/jstrack.js"

export default defineComponent({
	props: {
	},
	setup(props) {
		const paging = ref(null);
		const myCommendsList = ref([])
		const userPData = userData()
		const {
			userInfo
		} = storeToRefs(userPData)

		onLoad(() => {
			YWJATRACK.uploadTrack('查看更多表彰内容', 'key2')
		})

		//获取我的表彰列表
		const queryList = async (pageNo, pageSize) => {
			let query = {
				isSearchAllUsers: 'FALSE',
				page: pageNo,
				size: pageSize,
				userId: userInfo.value.userId
			}

			const {
				code,
				data
			} = await getCommendDistribute(query)
			if (code == 200) {
				console.log(data)
				paging.value.complete(data.data);
			} else {
				paging.value.complete(false);
			}
		}
		return {
			myCommendsList,
			queryList,
			paging
		}
	}
})
</script>

<style lang="scss">
.commend-wrap {
	margin-top: 10rpx;
	margin-bottom: env(safe-area-inset-bottom);
}
</style>
