<template>
    <view class="change-opt" style="padding-top: 32rpx;">
        <view class="bg-white flex align-center justify-between" style="height: 108rpx;padding: 0 32rpx;color: #333;
font-size: 16px;
font-style: normal;
font-weight: 400;line-height: 108rpx;" @click="open">
            <view style="margin-right: 32rpx;">切换组织身份</view>
            <view class="flex align-center" style="color:#999;text-align: right;">
                <view class="line1" style="font-size: 14px;max-width: 400rpx;">{{ userInfo.baseDeptName }}</view>
                <text class="cuIcon-right" style="font-size: 20px;"></text>
            </view>
        </view>
    </view>

    <uni-popup ref="popupRef" :is-mask-click="false" type="bottom">
        <view class="popup-content">
            <view style="height: 96rpx;display: flex;align-items: center;position: relative;  padding-left: 32rpx;
    padding-right: 32rpx;">
                <uni-icons type="closeempty" color="#999999" size="20" @click="close" />
                <view class="title">切换组织身份 </view>
            </view>
            <view style="height: 800rpx;overflow-y: auto; ">
                <view
                    style="margin:32rpx;border-radius: 8px;background: rgba(5, 118, 255, 0.10);height: 64px;padding:12px 10px;display: flex;align-items: center;">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <g clip-path="url(#clip0_8308_322)">
                            <path
                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11 15H13V17H11V15ZM11 7H13V13H11V7Z"
                                fill="#0576FF" />
                        </g>
                        <defs>
                            <clipPath id="clip0_8308_322">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
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

export default {
    setup() {
        const { open, close, popupRef } = usePopup()
        const userInfo = Cache.get(BaseDataKey.USER_INFO)
        console.log(userInfo);
        const { list, onLoadList } = useList(async () => {
            const [err, result] = await to(getOpt())
            return result
        })

        const onClick = async (data) => {
            cacheOpt({selectedOpsBaseDeptId: data.opsBaseDeptId})
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
            popupRef
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
    font-weight: 600;
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