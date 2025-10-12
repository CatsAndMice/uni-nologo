<template>
    <view class="min-h-screen bg-slate-100 pt-4">
        <view class="mx-4 bg-white rounded-lg shadow overflow-hidden">
            <view class="p-4 border-b border-gray-100 flex items-center">
                <text class="text-lg font-medium text-gray-800">支持平台<text
                        class="text-sm text-gray-500">（可点击图标测试）</text></text>
            </view>
            <view class="grid grid-cols-4 gap-4 p-4">
                <view v-for="l in list" :key="l.url" @tap="content = l.url"
                    class="flex flex-col items-center justify-center  rounded-lg hover:bg-gray-50 transition-colors">
                    <view
                        class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-2">
                        <t-icon v-if="l.icon" :name="l.icon" size="30" color="#4f46e5" />
                        <text v-else class="text-indigo-600 font-medium text-sm">{{ l.appName.substring(0, 1) }}</text>
                    </view>
                    <text class="text-xs text-gray-700 text-center">{{ l.appName }}</text>
                </view>
            </view>
        </view>

        <view class="mx-4 mt-4 bg-white pb-4 rounded-lg shadow overflow-hidden">
            <t-textarea v-model:value="content" placeholder="请粘贴视频或图集链接～" :autosize="{
                minHeight: 100,
                maxHeight: 200
            }" />

            <view class="mx-4 mt-2  flex flex-row gap-2">
                <t-button variant="outline" style="--td-button-border-radius:16rpx" icon="clear-formatting-filled"
                    @tap="content = ''">清空</t-button>
                <t-button variant="outline" style="--td-button-border-radius:16rpx" icon="file-copy-filled">
                    粘贴
                </t-button>
                <view class="flex-grow">
                    <t-button :loading="loading" :disabled="loading" theme="primary" block class="!rounded-lg m-0"
                        @tap="getFileDetail">开始解析</t-button>
                </view>
            </view>
        </view>

        <view class="mx-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow" @click="goToTutorial">
            <view class="flex items-center justify-between">
                <view class="flex items-center">
                    <text class="text-lg font-medium">使用教程</text>
                    <text class="ml-2 text-sm text-gray-500">新手必看</text>
                </view>
                <t-icon name="chevron-right" size="16" color="#999" />
            </view>
            <view class="mt-2 text-sm text-gray-600">
                <text>查看详细使用说明和常见问题解答</text>
            </view>
        </view>
    </view>
</template>
<script>
import { getPlatform } from '@/api/index.js';
import useList from '../../hooks/useList';
import { onBeforeMount, shallowRef } from "vue";
import { extractUrl } from "../../utils/common.js";
import useDownloadDetail from "../../store/useDownloadDetail.js"

export default {
    setup() {
        const content = shallowRef('');
        const { list, getList } = useList(getPlatform);
        const { loading, getDownloadDetail } = useDownloadDetail();
        const getFileDetail = async () => {
            if (!content.value) return
            const url = extractUrl(content.value)
            if (!url) return
            const data = await getDownloadDetail(url)
            if (data) {
                uni.navigateTo({
                    url: '/pages/download-detail/index'
                })
            }
        }

        const goToTutorial = () => {
            uni.navigateTo({
                url: '/pages/download-tutorial/index'
            })
        }

        onBeforeMount(getList)

        return {
            list,
            content,
            loading,
            goToTutorial,
            getFileDetail
        }
    },
}
</script>