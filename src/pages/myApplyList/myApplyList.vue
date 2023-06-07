<template>
	<view>
		<z-paging ref="paging" v-model="myApplyList" @query="queryList">
			<template #top>
				<scroll-view scroll-x class=" nav">
					<view class="flex text-center text-c-msg">
						<view class="cu-item flex-sub" :class="index==currentIndex?'theme-color':''"
							v-for="(item,index) in tabList" :key="index" @tap="tabSelect(index)" :data-id="index">
							{{item.name}}
						</view>
					</view>
				</scroll-view>
			</template>
			<view class="my-apply-wrap">
				<my-apply-cell v-for="item,index in myApplyList" :data='item' :key="index"
					@clickToDetail="clickToApplyDetail(item)"></my-apply-cell>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import {
		defineComponent,
		toRefs,
		unref,
		ref,
		reactive,
		computed
	} from 'vue'
	import {
		getCommendApplyRecord
	} from '../../api/commend.js'
	import {
		userData
	} from '../../stores/userData.js'
	import {
		storeToRefs
	} from 'pinia'
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		RecordType,
		loadingType
	} from '../../utils/type.js'
	export default defineComponent({
		props: {},
		components: {},
		setup(props) {
			const currentIndex = ref(0)
			const tabList = [{
					"name": "全部",
					"id": 0
				},
				{
					"name": "待审核",
					"id": 1
				},
				{
					"name": "已通过",
					"id": 2
				},
				{
					"name": "未通过",
					"id": 3
				}
			]
			const tabSelect = (index)=> {
				console.log(index)
				currentIndex.value = index
				paging.value.reload()
			}
			const paging = ref(null);
			let myApplyList = ref([])
			const userPData = userData()
			const {
				userInfo
			} = storeToRefs(userPData)

			onLoad(() => {

			})
			const applyStatus = ()=>{
				 if(unref(currentIndex)==1){
					return 'WAIT'
				} else if(unref(currentIndex) == 2){
					return 'APPROVED'
				} else if(unref(currentIndex)==3){
					return 'REJECT'
				} else {
					return ''
				}
			} 
			const queryList = async (pageNo, pageSize) => {
				let query = {
					applyStatus:applyStatus(),
					page: pageNo,
					size: pageSize,
					userId: userInfo.value.userId
				}

				const {
					code,
					data
				} = await getCommendApplyRecord(query)
				if (code == 200) {
					console.log(data)
					paging.value.complete(data.data);
				} else {
					paging.value.complete(false);
				}
			}

			const clickToApplyDetail=(item)=> {
				uni.navigateTo({
					url: `/pages/applyCommendDetail/applyCommendDetail?id=${item.applyRecordId}`
				})
			}

			return {
				currentIndex,
				tabList,
				tabSelect,
				paging,
				myApplyList,
				queryList,
				clickToApplyDetail
			}
		}
	})
</script>

<style lang="scss">
	.my-apply-wrap {
		margin-top: 20rpx;
		margin-bottom: env(safe-area-inset-bottom);
	}
</style>