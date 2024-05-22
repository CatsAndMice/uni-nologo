<template>
    <view style="padding: 32px 24px 16px 24px;height: 56px;box-sizing: content-box;">
        <view style="color:  #333;font-size: 18px;font-style: normal;font-weight: 500;line-height: 26px; ">选择你要登录的组织
        </view>
        <text style="color:#999;font-size: 14px;font-style: normal;font-weight: 400;line-height: 22px; ">以下是你所有组织</text>
    </view>
    <view style="max-height: calc(100vh - 104px);overflow-y: auto;">
        <view
            style="margin: 0px 24px 16px;border-radius: 8px;background: rgba(5, 118, 255, 0.10);height: 64px;padding:12px 10px;display: flex;align-items: center;">
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
        <view v-for="opt in list" :key="opt.opsBaseDeptId" class="cu" @click="onClick(opt)" style="display: flex;align-items: center;justify-content:space-between; height: 24px;line-height: 24px; margin:0 24px 12px 24px;padding: 16px;box-sizing: content-box;border-radius: 8px;
background:  #F5F5F5;">
            <view style="margin-right: 16px;flex-grow: 1;" class="line1"> {{ opt.opsBaseDeptName }}</view>
            <uni-icons color="#999999" type="arrow-right" size="20" />
        </view>
    </view>
</template>
<script>
import { getOpt,cacheOpt } from "@/api/getOps.js"
import { onLoad } from "@dcloudio/uni-app"
import useList from "@/common/useList.js"
import { to } from "await-to-js"
import { getUserInfo } from '@/api/user.js'
import { isUndefined } from '@/tools/tool.js'
import { userData } from '@/stores/userData.js'
import Cache from '@/utils/cache.js'
import { BaseCacheKey } from '@/utils/type.js'

export default {
    setup() {
        const checkEnterStatus = () => {
            //检查是否已进入过
            const hasEnter = Cache.get(BaseCacheKey.HAS_ENTER);
            console.log(hasEnter);
            if (hasEnter) {
                uni.reLaunch({
                    url: '/pages/index/index'
                })
            } else {
                uni.reLaunch({
                    url: '/pages/introducePage/introducePage'
                })
            }
        }

        const getUser = async (data) => {
            console.log(data);
            const [err, result] = await to(getUserInfo(data))
            if (isUndefined(result)) {
                uni.showToast({
                    icon: 'none',
                    title: '登录失败'
                })
                return
            }

            if (result.code === 200 && result.data != null) {
                console.log(result);
                userData().setUserInfo(result.data)
                cacheOpt({
                    selectedOpsBaseDeptId: data.opsBaseDeptId
                })
                checkEnterStatus()
            } else {
                uni.showToast({
                    icon: 'none',
                    title: '登录失败'
                })
            }
        }

        const { list, onLoadList } = useList(async () => {
            const [err, result] = await to(getOpt())
            return result
        })

        const onClick = async (data) => {
            getUser(data)
        }

        onLoad(onLoadList)
        return {
            onClick,
            list
        }
    },
}
</script>