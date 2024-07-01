<template>
    <view>
        <z-paging ref="paging" v-model="recordList" @query="queryList" :safe-area-inset-bottom="true"
            empty-view-text="无数据">
            <template #top>
                <view class="bg-white" style="padding: 32rpx 32rpx 16rpx 32rpx;color: var(--color-brand, #F7AF6C);
font-size: 80rpx;
font-weight: 700;
line-height: 96rpx;
border-bottom: 1px solid #EEE;">
                    {{ getThousandsChar(accountInfo.score) }}
                </view>
                <view class="flex text-center text-c-msg bg-white" style="height:84rpx;color: #333;">
                    <view class="cu-item flex-sub text-center" @tap="tabSelect(index, item)"
                        style="line-height: 84rpx;font-size: 32rpx;position: relative;"
                        :class="index == currentIndex ? 'theme-color font-weight-act is-line' : 'font-weight-rg'"
                        v-for="(item, index) in tabList" :key="index" :data-id="index">
                        {{ item.name }}
                    </view>
                </view>

                <view v-if="!currentIndex">
                    <view class="flex " style="gap:24rpx;padding: 0 32rpx;margin: 48rpx 0 24rpx;">
                        <button v-for="(but, index) in butList" type="default" @tap="butSelect(index, item)" style="padding: 0 32rpx;height: 64rpx;font-size: 28rpx;
font-weight: 400;line-height: 64rpx;border-radius: 40rpx;border: 0;display: inline-block;color: #333;"
                            :class="index == currentButIndex ? 'is-select' : null">{{ but.name
                            }}</button>
                    </view>
                </view>
            </template>
            <template>
                <view v-if="currentIndex" style="margin: 24rpx 24rpx 0;">
                    <exchange-result v-for="l in recordList" :key="l" :exchange-info="l" />
                </view>
                <view v-else style="padding: 0 24px;margin: 0 24rpx;border-radius: 16rpx;" class="bg-white">
                    <exchange-card v-for="l in recordList" :key="l" :card="l" />
                </view>
            </template>
            <template #loadingMoreNoMore>
                <view v-show="!isEmpty(recordList)"
                    style="height: 120rpx;color: #999;font-size: 26rpx;line-height: 120rpx;text-align: center">
                    已加载至底部
                </view>
            </template>
        </z-paging>
    </view>
</template>
<script>
import { shallowRef, ref, unref } from 'vue';
import getThousandsChar from "medash/lib/getThousandsChar";
import { getExchangedList } from '@/api/product';
import { to } from "await-to-js";
import isEmpty from 'medash/lib/isEmpty';
import { userData } from '@/stores/userData.js'
import { storeToRefs } from 'pinia'
import { getAccountStatement } from '@/api/account';
import eq from "medash/lib/eq";

export default {
    setup() {
        const currentIndex = shallowRef(0)
        const currentButIndex = shallowRef(0)
        const paging = ref(null);
        const recordList = ref([]);
        const userPData = userData();
        const { accountInfo } = storeToRefs(userPData);
        const tabList = [
            {
                "name": "晶点收支明细",
                "id": 0
            },
            {
                "name": "兑换记录",
                "id": 1
            }
        ]

        const butList = [
            {
                "name": "全部",
                "id": 0
            },
            {
                "name": "已获取",
                "id": 1
            },
            {
                "name": "已使用",
                "id": 3
            }
        ]

        const tabSelect = (index) => {
            currentIndex.value = index
            paging.value.reload()
        }

        const butSelect = (index) => {
            currentButIndex.value = index
            paging.value.reload()
        }

        const queryList = async (pageNo, pageSize) => {
            const params = {
                page: pageNo,
                size: pageSize
            }

            if (unref(currentIndex)) {
                const [err, result] = await to(getExchangedList(params))
                if (err) {
                    paging.value.complete(false)
                }
                paging.value.complete(result.data)
                return
            }
            params.accountType = 'SCORE'
            if (unref(currentButIndex)) {
                params.operatorType = eq(unref(currentButIndex), 1) ? 'ADD' : 'SUBTRACT'
            }
            const {
                code,
                data
            } = await getAccountStatement(params)
            if (code == 200) {
                paging.value.complete(data.data)
            } else {
                paging.value.complete(false)
            }
        }

        return {
            accountInfo,
            recordList,
            paging,
            queryList,
            butList,
            currentIndex,
            currentButIndex,
            tabList,
            tabSelect,
            butSelect,
            getThousandsChar,
            isEmpty
        }
    },
}
</script>
<style lang="scss" scoped>
.is-select {
    color: #FFF !important;
    background-color: #F7AF6C;
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