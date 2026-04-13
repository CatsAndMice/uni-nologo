<template>

    <t-dialog :visible="showConfirm" content="因小程序下载网络慢，下载时间久。请优先复制链接到浏览器打开下载，" :confirm-btn="{ content: '确认下载' }"
        cancel-btn="复制链接" @confirm="onConfirm" @cancel="onCancel" />
    <view class="min-h-screen bg-[#F5F5F5] py-4 pb-6">

        <view class="mx-4 bg-white rounded-lg overflow-hidden">
            <view class="px-4 py-3 bg-[#FAFAFA]" v-show="obj.title || obj.desc">
                <view class="flex items-start flex-grow break-all whitespace-pre-wrap ">
                    <text
                        class="line-clamp-2 overflow-hidden text-ellipsis break-all whitespace-normal flex-grow inline-block text-sm text-[#333333]"
                        style="display: -webkit-box; -webkit-line-clamp: 2;line-height: 48rpx; -webkit-box-orient: vertical;">
                        {{
                            obj.title || obj.desc }}</text>
                    <t-button icon="copy" theme="light" class="ml-2 inline-block shrink-0"
                        style="--td-button-medium-height:48rpx" shape="square" aria-label="复制标题"
                        @tap.stop="copyTitle(obj.title || obj.desc)"></t-button>
                </view>
            </view>
            <template v-if="eq(obj.type, 'img')">
                <view class="grid grid-cols-2 gap-3 p-4">
                    <view v-for="(url, index) in obj.urls" :key="url" @tap="previewImage(index)"
                        class="flex flex-col items-center justify-center ">
                        <t-image :src="url" width="145" lazy height="145" error="slot" shape="round">
                            <template #error>
                                <text style=" font-size: 20rpx;font-weight: 400;">加载失败</text>
                            </template>
                        </t-image>
                        <view v-show="url" class="flex justify-between items-center mt-2 w-full px-1">
                            <t-button variant="outline" class="shrink-0" icon="link" shape="round"
                                @tap.stop="copyUrl(url)" size="small">
                            </t-button>
                            <t-button variant="outline" class="shrink-0" icon="share" shape="round"
                                @tap.stop="onShare(url)" size="small">
                            </t-button>

                            <t-button variant="outline" icon="download" class="shrink-0" shape="round"
                                @tap.stop="openDialog(url, obj.type)" size="small">
                            </t-button>
                        </view>
                    </view>
                </view>
            </template>
            <template v-else-if="eq(obj.type, 'video')">
                <view class="p-4">
                    <view class="relative rounded-lg overflow-hidden bg-[#000000]">
                        <video :src="obj.url" controls class="w-full rounded-lg overflow-hidden h-auto aspect-video"
                            playsinline webkit-playsinline x5-playsinline></video>
                    </view>
                    <view class="flex justify-center items-center mt-4 gap-3">
                        <t-button variant="outline" icon="download" class="flex-1 h-10"
                            style="--td-button-border-radius:16rpx" @tap="openDialog(obj.url, obj.type)">
                            下载视频
                        </t-button>
                        <t-button theme="primary" icon="link" class="flex-1 h-10 !rounded-lg" @tap="copyUrl(obj.url)">
                            复制链接
                        </t-button>

                    </view>
                </view>
            </template>
        </view>
        <view class="mt-3 mx-4 bg-white rounded-lg overflow-hidden">
            <view class="px-4 py-3 border-b border-[#EEEEEE]">
                <text class="text-base font-medium text-[#333333]">常见问题</text>
            </view>
            <t-collapse default-value="1" expandMutex expandIcon>
                <t-collapse-panel header="Q: 为什么下载速度很慢？" value="1" class="border-b border-[#EEEEEE] px-4">
                    <view class="text-[#666666] text-sm py-2">
                        A: 由于小程序平台限制，下载速度可能较慢。建议复制链接到浏览器下载以获得更好的体验。
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 下载失败怎么办？" value="2" class="border-b border-[#EEEEEE] px-4">
                    <view class="text-[#666666] text-sm py-2">
                        A: 可以尝试以下方法：
                        <view class="mt-1">1. 检查网络连接是否稳定</view>
                        <view class="mt-1">2. 复制链接到手机浏览器下载</view>
                        <view class="mt-1">3. 稍后再试</view>
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 无法保存到相册？" value="3" class="border-b border-[#EEEEEE] px-4">
                    <view class="text-[#666666] text-sm py-2">
                        A: 请检查是否已授权相册访问权限。在设置中找到本应用，确保相册权限已开启。
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 为什么还存在水印" value="4" class="px-4">
                    <view class="text-[#666666] text-sm py-2">
                        A: 水印为视频、图片本身自带的水印，本工具仅做解析和下载，无法去除原始内容中的水印。
                    </view>
                </t-collapse-panel>
            </t-collapse>
        </view>
    </view>
    <!-- <nologo-footer /> -->
</template>
<script>
import useDownloadDetail from "../../store/useDownloadDetail.js";
import { eq } from "lodash-es";
import { unref } from "vue";
import useDialog from "./js/useDialog.js";
import { shareConfig } from "../../utils/common.js";
// import NologoFooter from '../../components/nologo-footer.vue';
import { downloadImage, downloadVideo } from "./js/downloader.js"
export default {
    components: {
        // NologoFooter
    },
    setup() {
        const { obj } = useDownloadDetail();
        const previewImage = (index) => {
            // 使用 uni.previewImage 实现图片预览
            uni.previewImage({
                urls: unref(obj).urls,
                current: index
            });
        };

        const copyUrl = (url) => {
            uni.setClipboardData({
                data: url,
                success: () => {
                    uni.showToast({
                        title: '链接已复制',
                        icon: 'success',
                        duration: 1500
                    });
                }
            });
        };

        const onShare = (url) => {
            downloadImage(url, {
                type: 'share'
            })
        };

        const copyTitle = (title) => {
            uni.setClipboardData({
                data: title,
                success: () => {
                    uni.showToast({
                        title: '已复制',
                        icon: 'success',
                        duration: 1500
                    });
                }
            });
        };

        const { showConfirm, onConfirm, onCancel, openDialog } = useDialog({ downloadImage, downloadVideo, copyUrl })

        return {
            obj,
            eq,
            onShare,
            showConfirm,
            previewImage,
            copyUrl,
            copyTitle,
            downloadImage,
            downloadVideo,
            onConfirm,
            onCancel,
            openDialog
        }
    },
}
</script>