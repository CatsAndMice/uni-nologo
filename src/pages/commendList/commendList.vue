<template>
	<view>
		<z-paging ref="paging" v-model="myCommendsList" @query="queryList">
			<view style="height: 20rpx;"></view>
			<view class="commend-wrap" >
				<get-commend-cell v-for="item, index in myCommendsList" :item="item" :key="index"></get-commend-cell>
			</view>
		</z-paging>
	</view>
</template>

<script>
import {
	defineComponent,
	toRefs,
	ref,
	reactive
} from 'vue'
import {
	onLoad
} from "@dcloudio/uni-app"
import {
	storeToRefs
} from 'pinia'
import {
	userData
} from '../../stores/userData.js'
import { getCommendDistribute } from '../../api/commend'
import {loadingType} from '../../utils/type'
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
			// reqMyCommendList()
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
