<template>


    <view class="mx-4 bg-white rounded-lg shadow overflow-hidden mt-4">
        <view class="p-4 border-b border-gray-100 flex items-center">
            <text class="text-lg font-medium text-gray-800">每日任务</text>
        </view>
        <view v-for="(task, index) in tasks" :key="index"
            class="flex items-center justify-between p-4 border-b border-gray-100 last:border-none">
            <view class="flex items-center">
                <image :src="task.icon" class="w-8 h-8 mr-3" />
                <view>
                    <text class="text-base">{{ task.title }}</text>
                    <text class="text-sm text-gray-500 mt-1 block">+3</text>
                </view>
            </view>
            <t-button variant="base" theme="primary" class="!rounded-lg px-4 py-2">去完成</t-button>
        </view>
    </view>







    <view class="bg-gray-100 flex-1 px-4 py-6">
        <view class="bg-white rounded-lg shadow-sm overflow-hidden">
            <!-- 在线客服 -->
            <view class="flex items-center justify-between p-4 border-b border-gray-200">
                <view class="flex items-center">
                    <image src="/static/icons/customer-service.png" class="w-6 h-6 mr-3" />
                    <text class="text-base">在线客服</text>
                </view>
                <t-icon name="chevron-right" size="16" color="#999" />
            </view>

            <!-- 分享朋友 -->
            <view class="flex items-center justify-between p-4">
                <view class="flex items-center">
                    <image src="/static/icons/share.png" class="w-6 h-6 mr-3" />
                    <text class="text-base">分享朋友</text>
                </view>
                <t-icon name="chevron-right" size="16" color="#999" />
            </view>
        </view>
    </view>
</template>
<script>
import { ref } from "vue";

export default {
    setup() {
        const tasks = ref([
            {
                icon: "/static/icons/video.png",
                title: "签到",
                reward: "+3",
            },
            {
                icon: "/static/icons/comment.png",
                title: "分享给朋友",
                reward: "+3",
            },
        ]);

        return {
            tasks,
        };
    },
};
</script>