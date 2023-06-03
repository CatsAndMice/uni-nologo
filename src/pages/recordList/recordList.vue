<template>
	<view>
		<z-paging ref="paging" v-model="recordList" @query="queryList">
			<!-- 需要固定在顶部不滚动的view放在slot="top"的view中，如果需要跟着滚动，则不要设置slot="top" -->
			<!-- 注意！此处的z-tabs为独立的组件，可替换为第三方的tabs，若需要使用z-tabs，请在插件市场搜索z-tabs并引入，否则会报插件找不到的错误 -->
			<template #top>
				<view style="height: 20rpx;"></view>
				<view class="top-wrap margin-lr  bg-gradual-score flex flex-direction" v-if="isIntegral">
					<view class="text-center margin">当前积分</view>
					<view class="d-font text-center text-56  text-bold">{{total}}</view>
				</view>
				<view class="top-wrap margin-lr  bg-gradual-jingdian flex flex-direction" v-else>
					<view class="text-center margin">当前晶点</view>
					<view class="d-font text-center text-56  text-bold">{{total}}</view>
				</view>
			</template>
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="cu-list radius margin">
				<view class="cu-item" v-for="item,index in recordList" :key="index">
					<record-cell :item="item"></record-cell>
				</view>
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
		RecordType,
		loadingType
	} from '../../utils/type.js'
	import {
		getAccountStatement
	} from '../../api/account'
	import {
		userData
	} from '../../stores/userData.js'
	import {
		storeToRefs
	} from 'pinia'
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
			const {
				type
			} = toRefs(props);
			const isIntegral = ref(true);
			onLoad(() => {
				//根据type获取数据
				uploadStyle(type.value)
				// paging.value.reload()
			})

			const uploadStyle = (type) => {
				console.log(type);
				if (type === RecordType.INTEGRAL) {
					isIntegral.value = true;
					uni.setNavigationBarTitle({
						title: '积分明细'
					});
				} else {
					isIntegral.value = false
					uni.setNavigationBarTitle({
						title: '晶点明细'
					});
				}
			}

			const total = ref(0)
			const userPData = userData()
			const {
				userInfo
			} = storeToRefs(userPData)

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
					console.log(data)
					paging.value.complete(data.data);
				} else {
					paging.value.complete(false);
				}
			}

			return {
				isIntegral,
				recordList,
				total,
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