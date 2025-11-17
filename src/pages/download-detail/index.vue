<template>

    <t-dialog :visible="showConfirm" content="因小程序下载网络慢，下载时间久。请优先复制链接到浏览器打开下载，" :confirm-btn="{ content: '确认下载' }"
        cancel-btn="复制链接" @confirm="onConfirm" @cancel="onCancel" />
    <view class="min-h-screen bg-slate-100 py-4 pb-24">

        <view class="mx-4 bg-white rounded-lg shadow overflow-hidden">
            <view class="px-4 py-2 bg-gray-50" v-show="obj.title || obj.desc">
                <view class="flex items-start flex-grow break-all whitespace-pre-wrap ">
                    <text
                        class="line-clamp-2 overflow-hidden text-ellipsis break-all whitespace-normal flex-grow inline-block font-medium"
                        style="display: -webkit-box; -webkit-line-clamp: 2;line-height: 56rpx; -webkit-box-orient: vertical;">
                        {{
                            obj.title || obj.desc }}</text>
                    <t-button icon="copy" theme="light" class="ml-2 inline-block shrink-0"
                        style="--td-button-medium-height:54rpx" shape="square" aria-label="复制标题"
                        @tap.stop="copyTitle(obj.title || obj.desc)"></t-button>
                </view>
            </view>
            <template v-if="eq(obj.type, 'img')">
                <view class="grid grid-cols-3 gap-3 p-4">
                    <view v-for="(url, index) in obj.urls" :key="url" @tap="previewImage(index)"
                        class="flex flex-col items-center ">
                        <t-image :src="url" width="100" lazy height="100" error="slot" shape="round">
                            <template #error>
                                <text style=" font-size: 20rpx;font-weight: 400;">加载失败</text>
                            </template>
                        </t-image>
                        <view v-show="url" class="flex justify-between items-center mt-2 w-full ">
                            <t-button variant="outline" class="shrink-0" icon="link" shape="round"
                                @tap.stop="copyUrl(url)" size="small">
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
                    <view class="relative rounded-lg overflow-hidden bg-black">
                        <video :src="obj.url" controls class="w-full h-auto aspect-video" playsinline webkit-playsinline
                            x5-playsinline></video>
                    </view>
                    <view class="flex justify-end items-center mt-4">
                        <t-button variant="outline" icon="download" class=" mr-3 m-0"
                            style="--td-button-border-radius:16rpx" @tap="openDialog(obj.url, obj.type)">
                            下载视频
                        </t-button>
                        <t-button theme="primary" icon="link" class="!rounded-lg m-0" @tap="copyUrl(obj.url)">
                            复制链接
                        </t-button>

                    </view>
                </view>
            </template>
        </view>
        <!-- 常见问题部分 - 使用折叠面板 -->
        <view class="mt-4 mx-4 bg-white rounded-lg shadow overflow-hidden">
            <view class="p-4 border-b border-gray-200">
                <view class="text-lg font-bold">常见问题</view>
            </view>
            <t-collapse default-value="1" expandMutex expandIcon>
                <t-collapse-panel header="Q: 为什么下载速度很慢？" value="1" class="border-b border-gray-200">
                    <view class="text-gray-600 text-sm py-2">
                        A: 由于小程序平台限制，下载速度可能较慢。建议复制链接到浏览器下载以获得更好的体验。
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 下载失败怎么办？" value="2" class="border-b border-gray-200">
                    <view class="text-gray-600 text-sm py-2">
                        A: 可以尝试以下方法：
                        <view class="mt-1">1. 检查网络连接是否稳定</view>
                        <view class="mt-1">2. 复制链接到手机浏览器下载</view>
                        <view class="mt-1">3. 稍后再试</view>
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 无法保存到相册？" value="3" class="border-b border-gray-200">
                    <view class="text-gray-600 text-sm py-2">
                        A: 请检查是否已授权相册访问权限。在设置中找到本应用，确保相册权限已开启。
                    </view>
                </t-collapse-panel>
                <t-collapse-panel header="Q: 为什么还存在水印" value="4">
                    <view class="text-gray-600 text-sm py-2">
                        A: 水印为视频、图片本身自带的水印，本工具仅做解析和下载，无法去除原始内容中的水印。
                    </view>
                </t-collapse-panel>
            </t-collapse>
        </view>
    </view>
    <nologo-footer />
</template>
<script>
import useDownloadDetail from "../../store/useDownloadDetail.js";
import { eq } from "lodash-es";
import { unref } from "vue";
import useDialog from "./js/useDialog.js";
import { shareConfig } from "../../utils/common.js";
import NologoFooter from '../../components/nologo-footer.vue';
export default {
    components: {
        NologoFooter
    },
    ...shareConfig,
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

        const downloadImage = (url) => {
            uni.showLoading({
                title: '下载中...',
                mask: true
            });
            uni.downloadFile({
                url: `https://videoapi.funjs.top/api/parseUrl/downLoadPics?url=${encodeURIComponent(url)}`,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.hideLoading()
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 1500
                                });
                            },
                            fail: () => {
                                uni.hideLoading()
                                uni.showToast({
                                    title: '保存失败',
                                    icon: 'none',
                                    duration: 1500
                                });
                            }
                        });
                    }
                },
                fail: () => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        };


        const downloadVideo = (url) => {
            uni.showLoading({
                title: '下载中...',
                mask: true
            });
            uni.downloadFile({
                url: `https://videoapi.funjs.top/api/parseUrl/downLoadVideo?url=${encodeURIComponent(url)}`,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveVideoToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 1500
                                });
                            },
                            fail: () => {
                                uni.hideLoading();
                                uni.showToast({
                                    title: '保存失败',
                                    icon: 'none',
                                    duration: 1500
                                });
                            }
                        });
                    }
                },
                fail: () => {
                    uni.hideLoading();
                    uni.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        };


        const { showConfirm, onConfirm, onCancel, openDialog } = useDialog({ downloadImage, downloadVideo, copyUrl })

        return {
            obj,
            eq,
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