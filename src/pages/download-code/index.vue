<template>
    <view class="min-h-screen bg-[#F5F5F5] py-4">
        <view class="bg-white rounded-lg text-center mx-4 py-8 px-5">
            <view class="inline-flex items-center justify-center w-14 h-14 bg-[#4A90D9] rounded-xl mb-4">
                <t-icon name="lock-on" size="28" color="#fff" />
            </view>
            <text class="text-lg font-medium text-[#333333] block mb-1">您的激活码</text>
            <text class="text-xs text-[#999999]">点击激活码即可复制</text>
            <view class="mt-5 flex items-center justify-center">
                <template v-if="activationCode">
                    <view class="gap-2 flex flex-wrap justify-center" @tap="copyActivationCode">
                        <view v-for="(code, index) in activationCode" :key="index"
                            class="bg-[#F0F0F0] text-[#333333] font-medium text-base px-3 py-2 rounded-lg select-none min-w-[40px] text-center">
                            {{ isLooked ? code : '*' }}
                        </view>
                    </view>
                </template>
                <view v-else class="text-[#999999]">加载中...</view>
            </view>
            <view class="mt-4 text-xs text-[#999999] select-none flex items-center justify-center">
                <t-icon name="info-circle" size="12" class="mr-1" />
                温馨提示：点击激活码可复制
            </view>
        </view>

        <view class="mt-4 px-4">
            <t-button variant="base" :disabled="!activationCode" @tap="showRewardedVideoAd" block theme="primary" class="!rounded-lg !h-10 text-sm">
                <template #icon>
                    <t-icon name="play-circle" size="18" class="mr-1" />
                </template>
                观看广告展示完整激活码
            </t-button>
        </view>

        <view class="mx-4 mt-4">
            <ad-custom unit-id="adunit-71e06c83a6e274ef"></ad-custom>
        </view>
    </view>
</template>
<script>
import { getActivationCode } from '@/api/index.js';
import { ref, onBeforeMount, unref } from 'vue';
import createRewardedVideoAd from '../../utils/rewardedVideoAd';
import { onLoad } from "@dcloudio/uni-app";
export default {
    setup() {
        const isLooked = ref(false);
        // 定义激活码
        const activationCode = ref("");
        // 获取激活码的方法
        const fetchActivationCode = async () => {
            const code = await getActivationCode()
            if (code) {
                activationCode.value = code
                return
            }
            activationCode.value = ''
            uni.showToast({
                title: "获取激活码失败，请重试",
                icon: "none",
                duration: 1500,
            });
        }

        // 复制激活码到剪贴板
        const copyActivationCode = () => {
            if (!unref(isLooked)) {
                uni.showToast({ title: '请观看完整广告解锁', icon: 'none' });
                return
            }
            uni.setClipboardData({
                data: unref(activationCode),
                success: () => {
                    uni.showToast({
                        title: "激活码已复制",
                        icon: "success",
                        duration: 1500,
                    });
                },
                fail: () => {
                    uni.showToast({
                        title: "复制失败，请重试",
                        icon: "none",
                        duration: 1500,
                    });
                },
            });
        };


        const { initRewardedVideoAd, showRewardedVideoAd } = createRewardedVideoAd(() => {
            isLooked.value = true
        },
            (err) => {
                console.warn('广告未完成或失败:', err?.message);
                uni.showToast({ title: err?.message || '请观看完整广告解锁', icon: 'none' });
            }
        )

        onLoad(() => {
            initRewardedVideoAd('adunit-0f6a2ca6cd6af968');
        })
        onBeforeMount(fetchActivationCode)

        return {
            isLooked,
            activationCode,
            copyActivationCode,
            showRewardedVideoAd,
        };
    },
};
</script>