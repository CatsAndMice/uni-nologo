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
                <t-icon name="check-circle" size="48rpx" />
                <view class="ml-4">
                    <text class="text-base">签到</text>
                    <text class="text-xm text-gray-500 mt-1 block">+5</text>
                </view>
            </view>
            <t-button :disabled="callRecord.isChecked" theme="primary" class="!rounded-lg m-0"
                @tap="onExceedLimit({ ...callRecord, count: 5, isChecked: true })">{{ callRecord.isChecked ? '已签到' :
                    '签到'
                }}</t-button>
        </view>

        <view class="flex items-center justify-between p-4 border-b border-gray-100">
            <view class="flex items-center">
                <t-icon name="share" size="48rpx" />
                <view class="ml-4">
                    <text class="text-base">分享给他人</text>
                    <text class="text-xm text-gray-500 mt-1 block">+10</text>
                </view>
            </view>
            <t-button :disabled="callRecord.isShared" theme="primary" open-type="share" class="!rounded-lg m-0"
                @tap="onExceedLimit({ ...callRecord, count: 10, isShared: true })">{{ callRecord.isShared ? '已分享' :
                    '分享'
                }}</t-button>
        </view>
    </view>

    <view class="mx-4 bg-white rounded-lg shadow overflow-hidden mt-4">

        <view class="relative">
            <t-cell title="搭建同款小程序" leftIcon="chat-bubble-smile" arrow @click="showDialog = true" />
        </view>

        <view class="relative">
            <t-cell title="联系客服" leftIcon="service" arrow />
            <t-button open-type="contact"
                style="position: absolute;top:0;left: 0;right: 0;bottom: 0;opacity: 0;height: 100%;">联系客服</t-button>
        </view>

        <view class="relative">
            <t-cell title="意见反馈" leftIcon="assignment" arrow />
            <t-button open-type="feedback"
                style="position: absolute;top:0;left: 0;right: 0;bottom: 0;opacity: 0;height: 100%;">意见反馈</t-button>
        </view>
    </view>

    <t-dialog :visible="showDialog" style="--td-spacer-4:48rpx" title="请长按扫码添加开发者">
        <template #content>
            <view class="flex justify-center mt-4">
                <image src="../../static//weixin.png" mode="aspectFit" 	:show-menu-by-longpress="true" alt="微信二维码" />
            </view>
        </template>
        <template #confirm-btn>
            <view class="px-6 pb-6 w-full">
                <t-button variant="base" block theme="primary" @tap.stop="showDialog = false">关闭</t-button>
            </view>
        </template>
    </t-dialog>
</template>
<script>
import { onShow } from "@dcloudio/uni-app";
import { useCallLimit } from "../../hooks/useCallLimit";
import { shallowRef } from "vue";
export default {
    setup() {
        const showDialog = shallowRef(false);
        const { callRecord, initLoadCall, onExceedLimit } = useCallLimit();
        onShow(initLoadCall)
        return {
            showDialog,
            callRecord,
            onExceedLimit
        };
    },
};
</script>