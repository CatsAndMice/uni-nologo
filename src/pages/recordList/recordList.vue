<template>
	<view>
		<z-paging ref="paging" v-model="recordList" @query="queryList">
			<template #top>
				<view style="height: 20rpx;"></view>
				<view class="top-wrap margin-lr  bg-gradual-score flex flex-direction" v-if="isIntegral">
					<view class="text-center margin">当前积分</view>
					<view class="d-font text-center text-56  text-bold">{{ showCount }}</view>
				</view>
				<view class="top-wrap margin-lr-12 bg-gradual-score  flex flex-direction" v-else>
					<view class="text-center margin">当前晶点</view>
					<view class="d-font text-center text-56  text-bold">{{ showCount }}</view>
				</view>
			</template>
			<template v-if="recordList.length > 0">
				<view class="radius-lg margin-lr-12 margin-top-12 padding-tb-sm  bg-white">
					<view class="cu-list ">
						<view class="cu-item" v-for="(item, index) in recordList" :key="index">
							<record-cell :item="item"
								:showSolid="index == (recordList.length - 1) ? false : true"></record-cell>
						</view>
					</view>
				</view>
			</template>
		</z-paging>

	</view>
</template>

<script>
import { defineComponent, toRefs, ref, computed, unref } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import { RecordType } from '../../utils/type.js'
import { getAccountStatement } from '../../api/account'
import { userData } from '../../stores/userData.js'
import { storeToRefs } from 'pinia'
import { thousands } from '../../tools/tool.js'
import YWJATRACK from "@/config/jstrack.js"

export default defineComponent({
	props: {
		type: {
			type: String,
			default: ''
		}
	},
	setup(props) {
		const paging = ref(null);
		let recordList = ref([])
		const userPData = userData()
		const {
			accountInfo,
			userInfo
		} = storeToRefs(userPData)

		const showCount = computed(() => {
			const res = thousands(unref(accountInfo).totalScore)
			return res
		})
		const {
			type
		} = toRefs(props);
		const isIntegral = ref(true);
		onLoad(() => {
			//根据type获取数据
			uploadStyle(type.value)
		})

		const uploadStyle = (type) => {
			console.log(type);
			if (type === RecordType.INTEGRAL) {
				isIntegral.value = true;
				uni.setNavigationBarTitle({
					title: '积分明细'
				});
				YWJATRACK.uploadTrack('积分明细页面', 'key7')
			} else {
				isIntegral.value = false
				uni.setNavigationBarTitle({
					title: '晶点明细'
				});
				YWJATRACK.uploadTrack('晶点明细页面', 'key8')
			}
		}

		const queryList = async (pageNo, pageSize) => {
			let query = {
				accountType: type.value,
				page: pageNo,
				size: pageSize,
				userId: userInfo.value.userId
			}

			const {
				code,
				data
			} = await getAccountStatement(query)
			if (code == 200) {
				paging.value.complete(data.data)
			} else {
				paging.value.complete(false)
			}
		}

		return {
			isIntegral,
			recordList,
			showCount,
			queryList,
			paging
		}
	}
})
</script>

<style lang="scss">
.top-wrap {
	height: 192rpx;
	color: #ffffff;
	border-radius: 15rpx;

}

.bg-gradual-score {
	background-image: linear-gradient(45deg, #FFA24A, #FFB74A);
	color: #ffffff;
}

.bg-gradual-jingdian {
	background-image: linear-gradient(45deg, #4E4AFF, #4A92FF);
	color: #ffffff;
}
</style>