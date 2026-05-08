<template>
    <t-dialog :visible="showShareDialog" style="--td-spacer-4:48rpx" content='您今日去水印次数已用完，请切换到"我的"页面完成任务获取更多去水印次数'
        title="完成任务即可解锁">
        <template #confirm-btn>
            <view class="px-6 pb-6 w-full">
                <t-button variant="base" block theme="primary" @tap.stop="showShareDialog = false">知道了</t-button>
            </view>
        </template>
    </t-dialog>
    <view class="min-h-screen bg-[#F5F5F5]">
        <view class="px-4 py-4" v-if="groupedHistory.length > 0">
            <view v-for="(group, gIndex) in groupedHistory" :key="gIndex" class="mb-4">
                <view class="text-sm text-[#999999] mb-2 px-1">{{ group.label }}</view>
                <view v-for="(item, index) in group.list" :key="index" class="bg-white rounded-lg p-4 mb-2"
                    @click="goToDetail(item)">
                    <view class="flex items-center">
                        <view class="w-10 h-10 bg-[#E3F2FD] rounded-lg flex items-center justify-center mr-3">
                            <t-icon v-if="item.type === 'video'" name="video" size="20" color="#4A90D9" />
                            <t-icon v-else name="image" size="20" color="#4A90D9" />
                        </view>
                        <view class="flex-1">
                            <text class="text-sm text-[#333333] line-clamp-1">{{ item.title || '无标题' }}</text>
                            <text class="text-xs text-[#999999]">{{ item.platform }}</text>
                        </view>
                        <t-icon name="chevron-right" size="16" color="#999999" />
                    </view>
                    <view class="text-xs text-[#999999] mt-2" style="display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;">{{ item.url }}</view>
                </view>
            </view>
        </view>
        <view v-else class="flex flex-col items-center justify-center pt-20">
            <t-icon name="history" size="48" color="#CCCCCC" />
            <text class="text-sm text-[#999999] mt-3">暂无历史记录</text>
        </view>
    </view>
</template>
<script>
import { onShow } from "@dcloudio/uni-app";
import { computed, shallowRef } from "vue";
import useHistory from "../../store/useHistory.js";
import useDownloadDetail from "../../store/useDownloadDetail.js";
import { extractUrl } from "../../utils/common.js";
import { useCallLimit } from "../../hooks/useCallLimit.js";

export default {
    setup() {
        const { history, loadHistory } = useHistory();
        const { obj, getDownloadDetail } = useDownloadDetail();
        const { checkCallLimit, initLoadCall } = useCallLimit();
        const showShareDialog = shallowRef(false);

        const groupedHistory = computed(() => {
            const now = new Date();
            const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
            const yesterday = today - 24 * 60 * 60 * 1000;
            const dayBeforeYesterday = today - 2 * 24 * 60 * 60 * 1000;

            const groupMap = new Map();

            history.value.forEach(item => {
                const itemDate = new Date(item.timestamp).setHours(0, 0, 0, 0);
                let label;
                if (itemDate === today) {
                    label = '今天';
                } else if (itemDate === yesterday) {
                    label = '昨天';
                } else if (itemDate === dayBeforeYesterday) {
                    label = '前天';
                } else {
                    const date = new Date(item.timestamp);
                    label = `${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                }

                if (!groupMap.has(label)) {
                    groupMap.set(label, { label, list: [] });
                }
                groupMap.get(label).list.push(item);
            });

            const labels = ['今天', '昨天', '前天'];
            const sorted = [];
            groupMap.forEach((value, key) => {
                if (labels.includes(key)) {
                    sorted.unshift(value);
                } else {
                    sorted.push(value);
                }
            });

            return sorted.slice(0, 7);
        });

        const goToDetail = async (item) => {
            const url = extractUrl(item.url);
            if (!url) {
                uni.showToast({ title: '链接无效', icon: 'none' });
                return;
            }
            if (checkCallLimit()) {
                showShareDialog.value = true;
                return;
            }
            uni.showLoading({ title: '加载中...' });
            try {
                const data = await getDownloadDetail(url);
                uni.hideLoading();
                if (data) {
                    uni.navigateTo({ url: '/pages/download-detail/index' });
                } else {
                    uni.showToast({ title: '加载失败', icon: 'none' });
                }
            } catch (e) {
                uni.hideLoading();
                uni.showToast({ title: '加载失败', icon: 'none' });
            }
        };

        onShow(() => {
            initLoadCall();
            loadHistory();
        });

        return {
            history,
            groupedHistory,
            goToDetail,
            showShareDialog
        };
    },
};
</script>