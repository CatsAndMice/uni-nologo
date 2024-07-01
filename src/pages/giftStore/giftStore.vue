<template>
	<view class="flex text-center text-c-msg bg-white" style="height:84rpx;border:1px solid #EEE;color: #333;position: absolute;left: 0;
	top: 0;z-index: 1;right: 0;">
		<view class="cu-item flex-sub text-center" @tap="tabSelect(index, item)"
			style="line-height: 84rpx;font-size: 32rpx;position: relative;"
			:class="index == currentIndex ? 'theme-color font-weight-act is-line' : 'font-weight-rg'"
			v-for="(item, index) in tabList" :key="index" :data-id="index">
			{{ item.name }}
		</view>
	</view>

	<view :class="{ gift: listRef.length > 1 }" style="padding: 24rpx;padding-top: 108rpx;">
		<gift-card v-for="item in listRef" :key="item.productId" :gift="item" @to-detail="toDetail(item)" />
	</view>
	<uni-load-more v-if="loading && hasMore" :icon-size="12" iconType="circle" status="loading" />
	<no-data-wrap v-if="!loading && isEmpty(listRef)" />
</template>

<script>
import { shallowRef } from 'vue';
import { getProduct } from '@/api/product'
import useInfiniteScroll from '@c/useInfiniteScroll'
import { onLoad, onReachBottom } from "@dcloudio/uni-app"
import { to } from "await-to-js"
import isEmpty from 'medash/lib/isEmpty';

export default {
	setup() {
		const currentIndex = shallowRef(0)
		const tabList = [
			{
				"name": "全部",
				"id": 0
			},
			{
				"name": "可兑换",
				"id": 1
			}
		]
		const query = { page: 1, size: 20 }
		const { loading, listRef, onLoad: onInfiniteScrollLoad, onReset, hasMore } = useInfiniteScroll(query, async (params) => {
			if (currentIndex.value) {
				params.productStatus = 'AVAILABLE'
			} else {
				delete params['productStatus']
			}
			const [err, result] = await to(getProduct(params))
			return result
		})

		const tabSelect = (index) => {
			currentIndex.value = index
			onReset()
			onInfiniteScrollLoad()
		}

		const toDetail = (item) => {
			uni.navigateTo({
				url: '/pages/giftDetail/giftDetail?productId=' + item.productId
			})
		}

		onReachBottom(onInfiniteScrollLoad)
		onLoad(onInfiniteScrollLoad)

		return {
			hasMore,
			loading,
			listRef,
			tabSelect,
			tabList,
			toDetail,
			isEmpty,
			currentIndex
		}
	}
}
</script>

<style lang="scss" scoped>
.gift {
	-moz-column-count: 2;
	/* Firefox */
	-webkit-column-count: 2;
	/* Safari �� Chrome */
	column-count: 2;
	/* 将 div 元素中的文本分为2列，并规定列间1rem像素的间隔。 */
	-moz-column-gap: 16rpx;
	-webkit-column-gap: 16rpx;
	column-gap: 16rpx;
}
</style>
<style lang="scss" scoped>
.my-apply-wrap {
	margin-top: 20rpx;
	margin-bottom: env(safe-area-inset-bottom);
}

.font-weight-rg {
	font-weight: 400;
	font-size: 28rpx;
}

.font-weight-act {
	font-weight: 500;
	font-size: 32rpx;
}

.is-line::before {
	content: "";
	position: absolute;
	left: 50%;
	bottom: 0;
	width: 48rpx;
	height: 4rpx;
	margin-left: -24rpx;
	border-radius: 4rpx;
	background: var(--color-brand, #F7AF6C);
}
</style>
