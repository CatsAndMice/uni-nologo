<template>
	<view class="bg-white flex justify-between margin-lr-12" :class="showSolid?'solidm-bottom':''">
		<view class="margin-lr-sm">
			<view class="flex margin-top-sm ">
				<view class="text-c-title ">{{item.statementDescription}}</view>
				<template v-if="!(item.commendationType==null)">
				<view  class="margin-left-sm padding-tb-sm cu-tag  light sm round "
					:class="tagColor">{{item.commendationType}}</view>
				</template>
			</view>
			<view class="text-c-msg text-sm margin-tb-sm">
				{{formatDateTimeMDS(item.createTime)}}
			</view>
		</view>
		<view class="flex">
			<view class="d-font text-bold text-lg text-c-title margin-auto-tb">
				{{item.operatorType=='ADD'?'+':'-'}}{{item.statementValue}}</view>
		</view>
	</view>
</template>

<script>
	import {
		defineComponent,
		toRefs,
		ref,
		reactive,
		toRef,
		unref,
		computed
	} from 'vue'
	import{formatDateTimeMDS} from '../../tools/tool.js'
	import {CommendationType} from '../../utils/type.js'
	export default defineComponent({
		name: 'record-cell',
		props: {
			item: {
				type: Object,
				default: null
			},
			showSolid:{
				type:Boolean,
				default:true
			}
		},
		setup(props) {
			const {
				item
			} = toRefs(props)

			const tagColor = computed(() => {
				if (unref(item).commendationType ==CommendationType.COMMEND_DEPT) {
					return "bg-blue"
				} else if (unref(item).commendationType == CommendationType.COMMEND_COMPANY) {
					return "bg-orange"
				} else if (unref(item).commendationType == CommendationType.COMMEND_UNION) {
					return "bg-green"
				} else if (unref(item).commendationType == CommendationType.COMMEND_PERSONAL) {
					return "bg-gray"
				} else {
					return ""
				}
			})
			return {
				tagColor,
				formatDateTimeMDS
			}
		}
	})
</script>

<style lang="scss">

</style>