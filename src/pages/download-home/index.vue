<template>
    <view class="min-h-screen bg-slate-100 pt-4">
        <view class="mx-4 bg-white rounded-lg shadow">
            <t-button theme="primary">按钮</t-button>
        </view>

        <view class="mx-4 mt-4 bg-white pb-4 rounded-lg shadow overflow-hidden">
            <t-textarea placeholder="请粘贴视频或图集链接～" :autosize="{
                minHeight: 80
            }" />

            <view class="mx-4 mt-2  flex flex-row gap-2">
                <t-button variant="outline" class="!rounded-lg" icon="clear-formatting-filled">清空</t-button>
                <t-button variant="outline" class="!rounded-lg" icon="file-copy-filled">
                    粘贴
                </t-button>
                <view class="flex-grow">
                    <t-button theme="primary" block class="!rounded-lg m-0">开始解析</t-button>
                </view>
            </view>
        </view>

        <view class="mx-4 mt-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow">
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
export default {
    setup() {
        return {}
    },
}
</script>