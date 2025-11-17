<template>
    <view class="fixed inset-x-0 bottom-0  flex items-center justify-center w-full h-20 bg-white shadow-top z-10">
        <view class="flex flex-col items-center justify-center space-y-1 mb-3">
            <!-- 链接部分 -->
            <view class="flex items-center" @tap.stop>
                <view class="inline-block" @tap.stop="copyUrl">
                    <t-link theme="primary" @tap.stop content="访问 Web 端"
                        class="text-sm pointer-events-none font-medium text-blue-600 " />
                </view>
                <t-divider layout="vertical" />
                <view class="relative inline-block" @tap.stop>
                    <text class="text-sm font-medium text-blue-600">分享给其他人</text>
                    <button open-type="share" :hover-stop-propagation="true"
                        class="absolute inset-0 opacity-0 w-full h-full" @tap.stop />
                </view>
            </view>
            <!-- 文案部分 -->
            <text class="text-sm text-gray-500">嗨去水印工具 © 2025</text>
        </view>
    </view>
</template>

<script>
const link = 'https://nologo.code24.top/';
export default {
    name: 'NologoFooter',
    install(Vue) {
        console.log(this);

        Vue.component(this.name, this);
    },
    setup() {
        const copyUrl = () => {
            wx.setClipboardData({
                data: link,
                showToast: false,
                success: () => {
                    wx.showToast({
                        title: '复制链接成功，请电脑端浏览器访问',
                        icon: 'none'
                    })
                }
            });
        };


        // 分享事件逻辑
        const shareApp = () => {
            uni.showShareMenu({
                title: '抖音、小红书等平台视频、图片去水印下载',
                query: '/pages/download-home/index',
                success: () => {
                    wx.showToast({
                        title: '分享成功',
                        icon: 'success',
                    });
                },
                fail: () => {
                    wx.showToast({
                        title: '分享失败，请重试',
                        icon: 'none',
                    });
                },
            });
        };


        return {
            copyUrl,
            shareApp
        }
    },
};
</script>

<style scoped>
/* 自定义样式 */
.shadow-top {
    box-shadow: 0 -4px 3px rgba(0, 0, 0, 0.05);
    /* 上方阴影效果 */
}

/* 重置 button 样式 */
.reset-button {
    all: unset;
    /* 清除所有默认样式 */
    display: inline-block;
    padding: 0;
    margin: 0;
    border: none;
    background: none;
    color: #2563eb;
    /* 使用 Tailwind 的 blue-600 颜色 */
    font-size: 0.875rem;
    /* text-sm */
    line-height: 1.25rem;
    /* text-sm */
    font-weight: 500;
    /* font-medium */
    cursor: pointer;
    text-decoration: none;
}

.reset-button:hover {
    text-decoration: underline;
    /* 悬停时显示下划线 */
}

.reset-button:focus {
    outline: none;
    /* 移除聚焦时的默认边框 */
}
</style>