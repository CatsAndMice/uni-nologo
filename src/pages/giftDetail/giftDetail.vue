<template>
    <view class="bg-white"
        :style="['width: 100vw;min-height: 100vh;', isIos() ? 'padding-bottom:164rpx;' : 'padding-bottom:148rpx;']">
        <view style="position: relative;">
            <uni-swiper-dot class="uni-swiper-dot-box" :info="obj.imageUrlList" mode="dot" :current="current"
                :dots-styles="{
            backgroundColor: '#E5E6EB',
            border: 0,
            width: 6,
            selectedBorder: 0,
            selectedBackgroundColor: '#F7AF6C'
        }" field="content">
                <swiper class="swiper-box" @change="change">
                    <swiper-item v-for="imageUrl in obj.imageUrlList " :key="imageUrl">
                        <view class="swiper-item" :class="'swiper-item' + index">
                            <image :src="imageUrl" width="100vw" height="100%">
                            </image>
                        </view>
                    </swiper-item>
                </swiper>
            </uni-swiper-dot>
            <view v-show="eq(obj.exchangeStatus, 'OUT_OF_STOCK')" class="text-white flex justify-center align-center"
                style="position: absolute;inset: 0;font-size: 32rpx;background: rgba(0, 0, 0, 0.45);">
                <text>无库存</text>
            </view>
        </view>

        <view style="padding:24rpx;border-top: 16rpx solid #F5F5F5;border-bottom: 16rpx solid #F5F5F5;"
            class="bg-white">
            <view>
                {{ obj.productName }}
            </view>
            <view class="flex justify-between align-center" style="line-height: 24px;margin-top: 10rpx;">
                <view style="color: #F7AF6C;">
                    <text style="line-height: 140%;font-weight: 500;font-size:48rpx;">{{ obj.score }}</text>
                    <text style="line-height: 40rpx;font-weight: 500;font-size: 24rpx;">晶点</text>
                </view>
                <text style="line-height: 40rpx;font-size: 24rpx;font-weight: normal;color:#999;">剩余{{ obj.stock
                    }}</text>
            </view>
        </view>

        <view style="padding:24rpx;" class="bg-white">
            <view style="color:#333;font-size: 32rpx;font-weight: 500;line-height: 48rpx;">
                描述
            </view>
            <view style="line-height: 44rpx;margin-top: 16rpx;font-size: 28rpx;color: #666;">
                {{ obj.productDescription }}
            </view>
        </view>
        <view
            style="padding: 24rpx;border-top: 1px solid var(--color-divider, #EEE);position: fixed;left: 0;bottom: 0;right: 0;"
            :class="{
            flex: true,
            'bg-white': true,
            ios: isIos()
        }">
            <button class="round theme-bg-color" @tap="onSubmit" :style="{
            flexGrow: 1,
            height: '98rpx',
            color: '#FFF',
            backgroundColor: eq(obj.exchangeStatus, 'AVAILABLE') ? '#F7AF6C' : '#FCDFB6'
        }" :disabled="!eq(obj.exchangeStatus, 'AVAILABLE')">{{
            exchangeStatus[obj.exchangeStatus] }}</button>
        </view>
    </view>
    <uni-popup ref="popupRef" type="dialog">
        <view class="bg-white" style="border-radius: 32rpx;overflow: hidden;">
            <view class="text-center"
                style="padding: 40rpx 24rpx;width:512rpx;color: #333;font-size: 30rpx;line-height: 48rpx">是否确认兑换？</view>
            <view class="flex justify-between align-center line" style="border-top: 1px solid #EEE;">
                <button
                    style="border: 0;height: 100rpx; flex-grow: 1;color: #0576FF;font-size: 36rpx;font-weight: 400;line-height: 100rpx;"
                    @tap="close">取消</button>
                <button
                    style="border: 0;height: 100rpx;flex-grow: 1;color: #0576FF;font-size: 36rpx;font-weight: 500;line-height: 100rpx;"
                    @tap="onSubmitExchange">确认</button>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import { shallowRef } from 'vue'
import { onLoad } from "@dcloudio/uni-app"
import useObject from '@c/useObject'
import usePopup from '@c/usePopup'
import { getProductDetail } from '@/api/product'
import { exchangeStatus } from "@/utils/type.js"
import eq from "medash/lib/eq"
import isEmpty from "medash/lib/isEmpty"
import isIos from "@/tools/isIos"

export default {
    setup() {
        let productId = 0
        const current = shallowRef(0)

        const { obj, loading, onLoadObject } = useObject(async () => {
            if (!productId) return {}
            const data = await getProductDetail(productId)
            if (isEmpty(data.imageUrlList)) {
                data.imageUrlList = [data.mainImageUrl]
            }
            return data
        })

        const { open, close, show, popupRef } = usePopup()

        const change = (e) => {
            current.value = e.detail.current;
        }

        const onSubmit = () => {
            open()
        }

        const onSubmitExchange = () => {
            uni.redirectTo({
                url: '/pages/exchangeGift/exchangeGift?productId=' + productId
            })
        }

        onLoad((options) => {
            productId = options.productId
            onLoadObject()
        })

        return {
            onSubmitExchange,
            close,
            popupRef,
            eq,
            obj,
            current,
            change,
            onSubmit,
            exchangeStatus,
            isIos
        }
    },
}
</script>
<style lang="scss" scoped>
.swiper-item {
    height: 750rpx;
}

.line {
    position: relative;
}

.line::before {
    content: "";
    position: absolute;
    left: 50%;
    width: 2rpx;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    background-color: #EEE;
}

.ios {
    padding-bottom: 40rpx;

}
</style>