<!-- components/top-notice.vue -->
<template>
    <view v-if="showNotice">
        <t-notice-bar suffixIcon="close" theme="warning" :prefix-icon="false" visible @click="onClickNotice">
            <template #content>
                <text>🌟 设为"我的小程序"更便捷</text>
            </template>

            <template #operation>
                <t-link theme="primary" class="ml-2" content="查看指引" />
            </template>
        </t-notice-bar>

        <!-- 引导弹窗 -->
        <t-popup v-model:visible="showGuideModal" placement="center" :close-on-overlay-click="true" @close="closeGuide">
            <view class="bg-white relative rounded-xl shadow-xl overflow-hidden w-full text-left">
                <!-- 内容区域 -->
                <view class="p-6 space-y-6 text-left">
                    <!-- 步骤1 -->
                    <view class="flex items-center space-x-2">
                        <view class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <text class="text-blue-600 font-bold">1</text>
                        </view>
                        <view class="flex-1">
                            <text
                                class="text-gray-700 text-left text-center block whitespace-nowrap">点击右上角"..."菜单</text>
                        </view>
                    </view>

                    <!-- 步骤2 -->
                    <view class="flex items-center space-x-2">
                        <view class="flex-shrink-0 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <text class="text-blue-600 font-bold">2</text>
                        </view>
                        <view class="flex-1 flex items-center">
                            <text class="whitespace-nowrap text-gray-700">选择</text>
                            <image class="w-5 h-5 mx-1" src="../static/guide-add.png" mode="aspectFit">
                            </image>
                            <text class="whitespace-nowrap text-gray-700">"添加到我的小程序"</text>
                        </view>
                    </view>
                    <t-button theme="primary" block class="!rounded-lg mt-4 m-0" @tap="closeGuide">知道啦</t-button>
                </view>
            </view>
        </t-popup>
    </view>
</template>

<script>
import { ref, onMounted } from 'vue'

export default {
    name: 'TopNotice',
    setup() {
        const showNotice = ref(true)
        const showGuideModal = ref(false)

        const closeNotice = () => {
            showNotice.value = false
            uni.setStorageSync('hasCloseTopNotice', true)
        }

        const showGuide = () => {
            showGuideModal.value = true
        }

        const closeGuide = () => {
            showGuideModal.value = false
        }

        const onClickNotice = (e) => {
            const type = e.detail.trigger;
            if (type === 'operation') {
                showGuide()
                return
            }

            if (type === 'suffix-icon') {
                closeNotice()
                return
            }

        }

        onMounted(() => {
            const hasClosed = uni.getStorageSync('hasCloseTopNotice')
            if (hasClosed) {
                showNotice.value = false
            }
        })

        return {
            showNotice,
            showGuideModal,
            closeNotice,
            showGuide,
            closeGuide,
            onClickNotice
        }
    }
}
</script>
<style scoped>
.close-btn {
    position: absolute;
    left: 50%;
    margin-left: -32rpx;
    /* bottom: -32rpx; */
}
</style>
