<template>
    <view :style="{
        padding: '24rpx 0',
        borderBottom: isBorder ? '1px solid #EEE;' : 0
    }" class="bg-white flex justify-between align-center">
        <view>
            <view style="line-height: 44rpx;font-size: 28rpx;color: #333;">{{ card.statementDescription }}</view>
            <view style="font-size: 24rpx;line-height: 40rpx;color:#999;">{{ card.createTime ?
        formatDate(card.createTime) : '-' }}</view>
        </view>
        <view style="font-weight: 700;font-size: 36rpx;color: #F7AF6C;">
            {{ eq(card.operatorType, 'ADD') ? `+${card.statementValue}` : `-${card.statementValue}` }}
        </view>
    </view>
</template>
<script>
import eq from "medash/lib/eq"
export default {
    props: {
        isBorder: {
            type: Boolean,
            default: true
        },
        card: {
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
            eq
        }
    },
}
</script>