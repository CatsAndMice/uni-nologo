<template>

    <view class="mx-4 bg-blue-100 rounded-lg shadow p-6 mb-4 mt-4">
        <view class="flex items-center justify-between">
            <view class="flex items-center">
                <text class="text-base font-medium text-gray-700">今日剩余去水印次数</text>
            </view>
            <image src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/%E5%8F%AF%E8%BE%BE%E9%B8%AD.png"
                class="w-6 h-6 rounded-full" />
        </view>
        <text class="text-3xl font-bold text-blue-600 mt-2">{{ callRecord.count }}</text>
    </view>


    <view class="mx-4 bg-white rounded-lg shadow overflow-hidden mt-4">
        <view class="p-4 border-b border-gray-100 flex items-center">
            <text class="text-lg font-medium text-gray-800">每日任务

                <text class="text-sm text-gray-500">（完成任务可获更多去水印次数）</text>

            </text>
        </view>
        <view class="flex items-center justify-between p-4 border-b border-gray-100">
            <view class="flex items-center">
                <t-icon name="check-circle" size="54rpx" />
                <view class="ml-4">
                    <text class="text-base">签到</text>
                    <text class="text-xm text-gray-500 mt-1 block">+5</text>
                </view>
            </view>
            <t-button :disabled="callRecord.isChecked" theme="primary" class="!rounded-lg m-0"
                @tap="onExceedLimit({ count: 5, isChecked: true })">{{ callRecord.isChecked ? '已签到' : '签到' }}</t-button>
        </view>
    </view>
</template>
<script>
import { useCallLimit } from "../../hooks/useCallLimit";
export default {
    setup() {
        const { callRecord, onExceedLimit } = useCallLimit();
        return {
            callRecord,
            onExceedLimit
        };
    },
};
</script>