<template>
    <view class="bg-white flex justify-center" style="height: 100vh;width: 100vw;">
        <view style="margin-top: 410rpx;">

            <view v-if="eq(type, 'loading')" class="flex justify-center align-center" style="flex-direction: column;">
                <image src="https://ywja-public-bucket.oss-cn-hangzhou.aliyuncs.com/jingyu/exchange-loading.png" style="width: 144rpx;
height: 144rpx;">
                </image>
                <view style="margin: 24rpx 0 16rpx 0;color: #333;font-size: 36rpx;
line-height: 52rpx; ">兑换中</view>
                <view style="color:#999;font-size: 28rpx;
line-height: 44rpx;">请不要离开该页面</view>
            </view>


            <view v-else-if="eq(type, 'success')" class="flex justify-center align-center"
                style="flex-direction: column;">
                <image src="https://ywja-public-bucket.oss-cn-hangzhou.aliyuncs.com/jingyu/%20exchange-success.png"
                    style="width: 144rpx;
height: 144rpx;">
                </image>
                <view style="margin: 24rpx 0 40rpx 0;color: #333;font-size: 36rpx;
line-height: 52rpx;">兑换成功</view>
                <view class="flex justify-center align-center" style="gap: 16rpx;">
                    <button type="default" @tap="onTap"
                        style="padding: 10rpx 32rpx;height: 64rpx;line-height: 54rpx;font-size: 28rpx;line-height: 44rpx;border-radius: 12rpx;">返回上级</button>
                    <button type="primary" @tap="toExchangeDetails"
                        style="padding: 10rpx 32rpx;height: 64rpx;line-height: 54rpx;font-size: 28rpx;line-height: 44rpx;border-radius: 12rpx;">查看订单</button>
                </view>
            </view>

            <view v-else="eq(type,'fail')" class="flex justify-center align-center" style="flex-direction: column;">
                <image src="https://ywja-public-bucket.oss-cn-hangzhou.aliyuncs.com/jingyu/exchange-fail.png" style="width: 144rpx;
height: 144rpx;">
                </image>
                <view style="margin: 24rpx 0 16rpx 0;color: #333;font-size: 36rpx;
line-height: 52rpx; ">兑换失败</view>
                <view style="margin: 0 0 40rpx 0;color: #999;font-size: 28rpx;
line-height: 44rpx; ">{{ msg }} </view>
                <view class="flex justify-center align-center" style="gap: 16rpx;">
                    <button type="default" @tap="onTap"
                        style="padding: 10rpx 32rpx;height: 64rpx;line-height: 54rpx;font-size: 28rpx;line-height: 44rpx;border-radius: 12rpx;">返回上级</button>
                </view>
            </view>
        </view>

    </view>
</template>

<script>
import { shallowRef } from 'vue'
import eq from "medash/lib/eq"
import { onLoad } from "@dcloudio/uni-app"
import { exchange } from '@/api/product'

export default {
    setup() {
        const type = shallowRef('loading')
        const msg = shallowRef('')
        const onTap = () => {
            uni.navigateBack()
        }


        const toExchangeDetails = () => {
            uni.navigateTo({
                url: '/pages/exchangeDetails/exchangeDetails'
            })
        }

        onLoad(async (options) => {
            const data = await exchange({
                productId: options.productId,
                exchangeSize: 1
            })
            if (data.isSuccess) {
                type.value = 'success'
            } else {
                type.value = 'fail'
                msg.value = data.msg
            }
        })
        return {
            toExchangeDetails,
            msg,
            type,
            eq,
            onTap
        }
    },
}
</script>