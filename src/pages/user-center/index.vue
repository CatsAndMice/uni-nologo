<template>
    <view class="mt-4 pb-4">
        <view class="mx-4 bg-blue-100 rounded-lg shadow p-6 mb-4 ">
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
                        <text class="text-xm text-gray-500 mt-1 block">+3</text>
                    </view>
                </view>
                <t-button :disabled="callRecord.isChecked" theme="primary" class="!rounded-lg m-0"
                    @tap="onExceedLimit({ ...callRecord, count: 3, isChecked: true })">{{ callRecord.isChecked ? '已签到' :
                        '签到'
                    }}</t-button>
            </view>

            <view class="flex items-center justify-between p-4 border-b border-gray-100">
                <view class="flex items-center">
                    <t-icon name="video" size="48rpx" />
                    <view class="ml-4">
                        <text class="text-base">观看广告</text>
                        <text class="text-xm text-gray-500 mt-1 block">+10</text>
                    </view>
                </view>
                <t-button theme="primary" class="!rounded-lg m-0" @tap="handleWatchAd">看广告</t-button>
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
                <t-cell title="分享给好友" leftIcon="share-1" arrow />
                <t-button open-type="share"
                    style="position: absolute;top:0;left: 0;right: 0;bottom: 0;opacity: 0;height: 100%;">联系客服</t-button>
            </view>
        </view>


        <view class="px-4 mt-4">
            <view class="rounded-lg overflow-hidden shadow bg-white p-4">
                <view class="text-base flex items-center  text-gray-800 mb-3">
                    <t-icon name="app" size="24px" color="#2554d2" class="mr-2" />
                    <text class="text-base text-gray-800">推荐工具</text>
                </view>

                <!-- 推荐项 1 -->
                <view class="flex items-center mb-3 last:mb-0" @tap="jumpToMiniProgram('wxdc301136f090bdce')">
                    <image src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/WechatIMG15507.jpeg"
                        style="width: 60rpx;height: 60rpx;border-radius: 8rpx;" mode="cover" />
                    <view class="ml-3 flex-1">
                        <view class="text-sm text-gray-900">小易拼豆</view>
                        <view class="text-xs text-gray-500 mt-1">拼豆图纸生成器</view>
                    </view>
                    <t-icon name="chevron-right" size="48rpx" color="#999" />
                </view>
            </view>
        </view>
    </view>




    <t-dialog :visible="showDialog" style="--td-spacer-4:48rpx" title="请长按扫码添加开发者">
        <template #content>
            <view class="flex justify-center mt-4">
                <image src="../../static//weixin.png" mode="aspectFit" :show-menu-by-longpress="true" alt="微信二维码" />
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
import { onShow, onLoad } from "@dcloudio/uni-app";
import { useCallLimit } from "../../hooks/useCallLimit";
import { shallowRef, unref } from "vue";
import createRewardedVideoAd from '../../utils/rewardedVideoAd';
export default {
    setup() {
        const showDialog = shallowRef(false);

        const { callRecord, initLoadCall, onExceedLimit } = useCallLimit();


        const { initRewardedVideoAd, showRewardedVideoAd } = createRewardedVideoAd(() => {
            // 用户完整观看，可调用 onExceedLimit 增加次数
            onExceedLimit({ ...unref(callRecord), count: 10 });
            uni.showToast({ title: '奖励已发放 +10 次', icon: 'success' });
        },
            (err) => {
                console.warn('广告未完成或失败:', err?.message);
                uni.showToast({ title: err?.message || '未获取奖励', icon: 'none' });
            }
        )

        const jumpToMiniProgram = (appId) => {
            uni.navigateToMiniProgram({
                appId,
                success: () => {
                    console.log('跳转成功');
                },
                fail: (err) => {
                    console.error('跳转失败:', err);
                    uni.showToast({ title: '跳转失败', icon: 'none' });
                }
            });
        };

        const handleWatchAd = () => {
            showRewardedVideoAd();
        };



        onShow(initLoadCall)
        onLoad(() => {
            initRewardedVideoAd('adunit-0f6a2ca6cd6af968');
        })
        return {
            showDialog,
            callRecord,
            handleWatchAd,
            onExceedLimit,
            jumpToMiniProgram
        };
    },
};
</script>