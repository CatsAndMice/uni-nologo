<template>
    <view class="pb-5">
        <view class="mx-4 mt-4 bg-[#4A90D9] rounded-lg p-5 mb-4">
            <view class="flex items-center justify-between">
                <view class="flex items-center">
                    <text class="text-sm text-white/90">今日剩余去水印次数</text>
                </view>
                <view class="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
                    <image src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/%E5%8F%AF%E8%BE%BE%E9%B8%AD.png"
                        class="w-6 h-6 rounded-full" />
                </view>
            </view>
            <text class="text-4xl font-bold text-white mt-2 block">{{ callRecord.count }}</text>
            <view class="mt-3 flex items-center text-white/70 text-xs">
                <t-icon name="info-circle" size="12" />
                <text class="ml-1">每日0点重置</text>
            </view>
        </view>


        <view class="mx-4 bg-white rounded-lg overflow-hidden mt-3">
            <view class="px-4 py-3 border-b border-[#EEEEEE]">
                <text class="text-base font-medium text-[#333333]">每日任务
                    <text class="text-xs text-[#999999] ml-1">（完成任务可获更多去水印次数）</text>
                </text>
            </view>
            <view class="flex items-center justify-between px-4 py-3 border-b border-[#EEEEEE]">
                <view class="flex items-center">
                    <view class="w-9 h-9 bg-[#E8F5E9] rounded-lg flex items-center justify-center">
                        <t-icon name="check-circle" size="18" color="#4CAF50" />
                    </view>
                    <view class="ml-3">
                        <text class="text-sm text-[#333333]">签到</text>
                        <text class="text-xs text-[#999999] ml-1">+3</text>
                    </view>
                </view>
                <t-button :disabled="callRecord.isChecked" theme="primary" class="!rounded-lg !h-8 px-3"
                    @tap="onExceedLimit({ ...callRecord, count: 3, isChecked: true })">{{ callRecord.isChecked ? '已签到' :
                        '签到'
                    }}</t-button>
            </view>

            <view class="flex items-center justify-between px-4 py-3">
                <view class="flex items-center">
                    <view class="w-9 h-9 bg-[#FFF8E1] rounded-lg flex items-center justify-center">
                        <t-icon name="video" size="18" color="#FFA000" />
                    </view>
                    <view class="ml-3">
                        <text class="text-sm text-[#333333]">观看广告</text>
                        <text class="text-xs text-[#999999] ml-1">+10</text>
                    </view>
                </view>
                <t-button theme="primary" class="!rounded-lg !h-8 px-3" @tap="handleWatchAd">看广告</t-button>
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg overflow-hidden mt-3">
            <view class="px-4 py-3 border-b border-[#EEEEEE]">
                <text class="text-base font-medium text-[#333333]">更多功能</text>
            </view>
            <view class="relative">
                <t-cell title="搭建同款小程序" leftIcon="chat-bubble-smile" arrow @click="showDialog = true" />
            </view>

            <view class="relative">
                <t-cell title="联系客服" leftIcon="service" arrow />
                <button open-type="contact"
                    style="position: absolute;top:0;left: 0;right: 0;bottom:0;opacity: 0;height: 100%;">联系客服</button>
            </view>
            <view class="relative">
                <t-cell title="分享给好友" leftIcon="share-1" arrow />
                <button open-type="share"
                    style="position: absolute;top:0;left: 0;right: 0;bottom:0;opacity: 0;height: 100%;">分享</button>
            </view>
        </view>


        <view class="px-4 mt-4">
            <view class="rounded-lg overflow-hidden bg-white p-4">
                <text class="text-base font-medium text-[#333333] mb-3 block">推荐工具</text>

                <view class="flex items-center py-2" @tap="jumpToMiniProgram('wxdc301136f090bdce')">
                    <image src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/WechatIMG15507.jpeg"
                        style="width: 40px;height: 40px;border-radius: 8px;" mode="cover" />
                    <view class="ml-3 flex-1">
                        <view class="text-sm text-[#333333]">小易拼豆</view>
                        <view class="text-xs text-[#999999] mt-0.5">拼豆图纸生成器</view>
                    </view>
                    <t-icon name="chevron-right" size="16" color="#999999" />
                </view>
            </view>
        </view>
    </view>




    <t-dialog :visible="showDialog" style="--td-spacer-4:48rpx" title="请长按扫码添加开发者">
        <template #content>
            <view class="flex justify-center mt-4">
                <image src="../../static//weixin.png" mode="aspectFit" :show-menu-by-longpress="true" alt="微信二维码"
                    class="w-48 h-48" />
            </view>
        </template>
        <template #confirm-btn>
            <view class="px-6 pb-6 w-full">
                <t-button variant="base" block theme="primary" class="!rounded-lg"
                    @tap.stop="showDialog = false">关闭</t-button>
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