<template>
    <view class="min-h-screen bg-slate-100 py-4">
        <!-- 激活码展示区域 -->
        <view class="bg-white rounded-lg shadow text-center mx-4 py-8">
            <text class="text-2xl font-medium text-gray-800">您的激活码</text>
            <view class="mt-4 flex items-center justify-center">
                <!-- 验证码样式 -->
                <template v-if="activationCode">
                    <view class="gap-2 flex items-center justify-center" @tap="copyActivationCode">
                        <view v-for="(code, index) in activationCode" :key="index"
                            class="bg-gray-100 text-indigo-600 font-bold text-lg px-4 py-2 rounded-md border border-gray-300 cursor-not-allowed select-none">
                            {{ code }}
                        </view>
                    </view>
                </template>
                <view v-else>加载中...</view>
            </view>
            <view class="mt-4 text-sm text-gray-500  select-none">
                温馨提示：点击激活码可复制
            </view>
        </view>
    </view>
</template>
<script>
import { getActivationCode } from '@/api/index.js';
import { ref, onBeforeMount ,unref} from 'vue';
export default {
    setup() {
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

        onBeforeMount(fetchActivationCode)

        return {
            activationCode,
            copyActivationCode,
        };
    },
};
</script>