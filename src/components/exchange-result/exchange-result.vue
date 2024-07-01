<template>
    <view :style="{
        padding: '24rpx',
        marginBottom: '16rpx',
        borderRadius: '8rpx',
        overflow: 'hidden'
    }" class="bg-white ">
        <view class="flex justify-between">
            <view class="flex justify-center align-center">
                <image :src="exchangeInfo.mainImageUrl" style="border-radius:16rpx;width: 138rpx;
height: 138rpx;">
                </image>
                <view style="margin-left: 24rpx;">
                    <view style="line-height: 48rpx;font-size: 32rpx;color: #333;">{{ exchangeInfo.productName }}</view>
                    <view style="color:#F7AF6C;line-height: 44rpx;font-size: 28rpx;">
                        <text style="font-weight: 500;">{{ exchangeInfo.score }}</text>
                        <text style="font-weight: 400;">晶点</text>
                    </view>
                    <view style="font-size: 24rpx;line-height: 40rpx;color:#999;">{{
        formatDate(exchangeInfo.exchangeTime || Date.now()) }}</view>
                </view>
            </view>
            <view
                :style="['font-size: 30rpx;line-height: 48rpx;', eq(exchangeInfo.exchangeStatus, 'DELIVERED') ? 'color: #F7AF6C;' : 'color: #999;']">
                {{ text[exchangeInfo.exchangeStatus] }}
            </view>
        </view>

        <view v-show="eq(exchangeInfo.exchangeStatus, 'RETURNED')" class="flex  align-center"
            style="margin-top: 16rpx;padding:16rpx 24rpx;border-radius: 16rpx;background-color: #F5F5F5;line-height: 44rpx;font-size: 28rpx;">
            <view class="flex  align-center " style="flex-shrink: 0;">
                <image :src="infoImage" style="width: 48rpx;height: 48rpx;">
                </image>
                <text style="color:#666;margin-left: 16rpx;">取消原因：</text>
            </view>
            <text style="color:#999; ">{{ exchangeInfo.remark }}</text>
        </view>
    </view>
</template>
<script>
import infoImage from "@/static/info.png"
import eq from "medash/lib/eq"

const text = {
    PENDING: '待发放',
    DELIVERED: '已发放',
    RETURNED: '已取消'
}

export default {
    props: {
        isBorder: {
            type: Boolean,
            default: true
        },
        exchangeInfo: {
            type: Object,
            default: () => ({})
        },
    },
    setup() {
        const formatDate = (date1) => {
            const d1 = new Date(date1);
            const d2 = new Date();

            const year1 = d1.getFullYear();
            const year2 = d2.getFullYear();
            const month1 = d1.getMonth() + 1;
            const day1 = d1.getDate();


            const pad = (n) => (n < 10 ? '0' + n : n);

            if (year1 === year2) {
                return `${pad(month1)}月${pad(day1)}日 ${pad(d1.getHours())}:${pad(d1.getMinutes())}`;
            } else {
                return `${year1}年${pad(month1)}月${pad(day1)}日 ${pad(d1.getHours())}:${pad(d1.getMinutes())}`;
            }
        }


        return {
            formatDate,
            infoImage,
            eq,
            text
        }
    },
}
</script>