<template>
    <view class="change-opt" style="padding-top: 32rpx;">
        <view class="bg-white flex align-center justify-between" style="height: 108rpx;padding: 0 32rpx;color: #333;
font-size: 16px;
font-style: normal;
font-weight: 400;line-height: 108rpx;" @click="open">
            <view style="margin-right: 32rpx;">切换组织身份</view>
            <view class="flex align-center" style="color:#999;text-align: right;">
                <view class="line1" style="font-size: 14px;max-width: 400rpx;">{{ userInfo.baseDeptName }}</view>
                <image :src="rightImage" style="
    width:40rpx;
    height:40rpx;"></image>
            </view>
        </view>
    </view>

    <uni-popup ref="popupRef" :is-mask-click="false" type="bottom">
        <view class="popup-content">
            <view style="height: 96rpx;display: flex;align-items: center;position: relative;  padding-left: 32rpx;
    padding-right: 32rpx;">
                <uni-icons type="closeempty" color="#999999" size="20" @click="close" />
                <view class="title">切换组织身份</view>
            </view>
            <view style="height: 800rpx;overflow-y: auto; ">
                <view
                    style="margin:32rpx;border-radius: 8px;background: rgba(5, 118, 255, 0.10);height: 64px;padding:12px 10px;display: flex;align-items: center;">
                    <view style="transform: rotateZ(180deg);"> <uni-icons type="info" size="24"
                            color="#0576FF"></uni-icons></view>
                    <text
                        style="color:#0576FF;font-size: 14px;font-style: normal;font-weight: 400;line-height: 22px;margin-left: 8px;">
                        各组织晶点单独结算不互通，用户随时可在设置中切换组织身份
                    </text>
                </view>
                <view v-for="(opt, index) in list" :key="opt.opsBaseDeptId" @click="onClick(opt)"
                    :style="['display: flex;align-items: center;justify-content:space-between; height: 112rpx;line-height: 112rpx;margin-left: 32rpx;padding-right: 32rpx;', list.length - 1 !== index ? 'border-bottom: 1px solid  #EEE;' : '']">
                    <view style="margin-right: 16px;flex-grow: 1;" class="line1"> {{ opt.opsBaseDeptName }}</view>
                    <view v-show="eq(opt.opsBaseDeptId, userInfo.baseDeptId)">
                        <uni-icons color="#0576FF" type="checkmarkempty" size="24" />
                    </view>
                </view>
            </view>
        </view>
    </uni-popup>
</template>
<script>
import useList from "@/common/useList.js"
import { getOpt, cacheOpt } from "@/api/getOps.js"
import usePopup from "@c/usePopup.js"
import { to } from "await-to-js"
import { onLoad } from "@dcloudio/uni-app"
import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'
import eq from "medash/lib/eq"
import { userData } from '@/stores/userData.js'
import { getUserInfo } from '@/api/user.js'
import isUndefined from "medash/lib/isUndefined"
import rightImage from "@/static/right.png"

export default {
    setup() {
        const { open, close, popupRef } = usePopup()
        const userInfo = Cache.get(BaseDataKey.USER_INFO)
        const { list, onLoadList } = useList(async () => {
            const [err, result] = await to(getOpt())
            return result
        })

        const onClick = async (data) => {
            if (eq(data.opsBaseDeptId, userInfo.baseDeptId)) return
            cacheOpt({ selectedOpsBaseDeptId: data.opsBaseDeptId })
            const [err, result] = await to(getUserInfo(data))
            if (isUndefined(result)) {
                uni.showToast({
                    icon: 'none',
                    title: '切换组织身份失败'
                })
                return
            }

            if (result.code === 200 && result.data != null) {
                userData().setUserInfo(result.data)

                uni.reLaunch({
                    url: '/pages/index/index?form=changeOpt'
                })
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '切换组织身份失败'
                })
            }
        }

        onLoad(onLoadList)
        return {
            onClick,
            eq,
            userInfo,
            list,
            open,
            close,
            popupRef,
            rightImage
        }
    },
}
</script>
<style lang="scss" scoped>
.change-opt {
    height: 100vh;
    background-color: #F5F5F5;
}

.popup-content {
    width: 100vw;
    background-color: #fff;
    z-index: 9999;
    border-top-left-radius: 24rpx;
    border-top-right-radius: 24rpx;
}

.title {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 36rpx;
    font-weight: 500;
    color: #333;
    text-align: center;
    box-sizing: content-box;
}

.item {
    height: 112rpx;
    background: #EEEEEE;
    border-radius: 12rpx;
    line-height: 112rpx;
    font-size: 32rpx;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.9);
    margin-bottom: 24rpx;
    border: 4rpx solid transparent;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;

    &.is-active {
        border-color: #F7AF6C;
        background-color: #fff;

        .image {
            opacity: 1;
        }
    }

    .image {
        position: absolute;
        opacity: 0;
        top: -4rpx;
        left: -4rpx;
        width: 56rpx;
        height: 56rpx;
    }
}
</style>