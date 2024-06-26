<template>
    <view style="width: 100vw;height: 100vh;background-color: #fff;">
        <view style="padding: 32px 24px 16px 24px;height: 56px;box-sizing: content-box;">
            <view style="color:  #333;font-size: 18px;font-style: normal;font-weight: 500;line-height: 26px; ">选择你要登录的组织
            </view>
            <text
                style="color:#999;font-size: 14px;font-style: normal;font-weight: 400;line-height: 22px;margin-top: 8px;display: inline-block;">以下为你所有组织</text>
        </view>
        <view style="max-height: calc(100vh - 104px);overflow-y: auto;">
            <view
                style="margin: 0px 24px 16px;border-radius: 8px;background: rgba(5, 118, 255, 0.10);height: 64px;padding:12px 10px;display: flex;align-items: center;">
                <view style="transform: rotateZ(180deg);"> <uni-icons type="info" size="24" color="#0576FF"></uni-icons>
                </view>
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
    </view>

</template>
<script>
import { getOpt, cacheOpt } from "@/api/getOps.js"
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
            const hasEnter = Cache.get(BaseCacheKey.HAS_ENTER)

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
            cacheOpt({ selectedOpsBaseDeptId: data.opsBaseDeptId })
            const [err, result] = await to(getUserInfo(data))
            if (isUndefined(result)) {
                uni.showToast({
                    icon: 'none',
                    title: '登录失败'
                })
                return
            }

            if (result.code === 200 && result.data != null) {
                userData().setUserInfo(result.data)
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