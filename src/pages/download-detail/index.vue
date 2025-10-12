<template>
    <view class="min-h-screen bg-slate-100 py-4">
        <view class="mx-4 bg-white rounded-lg shadow overflow-hidden">
            <template v-if="eq(obj.type, 'img')">
                <view class="grid grid-cols-3 gap-3 p-4">
                    <view v-for="url in obj.urls" :key="url" @tap="previewImage(index)"
                        class="flex flex-col items-center ">
                        <image :src="url" mode="aspectFill" class="w-25 h-25 object-cover rounded-lg"></image>
                        <view class="flex justify-between items-center mt-2 w-full ">
                            <t-button variant="outline" class="shrink-0" icon="link" shape="round"
                                @tap.stop="copyUrl(url)" size="small">
                            </t-button>
                            <t-button variant="outline" icon="download" class="shrink-0" shape="round"
                                @tap.stop="downloadImage(url)" size="small">
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
                    <view class="flex justify-between items-center mt-4">
                        <t-button variant="outline" icon="link" shape="round" @tap="copyUrl(obj.url)">
                            复制链接
                        </t-button>
                        <t-button variant="outline" icon="download" shape="round" @tap="downloadVideo(obj.url)">
                            下载视频
                        </t-button>
                    </view>
                </view>
            </template>
        </view>
    </view>
</template>
<script>
import useDownloadDetail from "../../store/useDownloadDetail.js";
import { eq } from "lodash-es";
import { unref } from "vue"
export default {
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

        const downloadImage = (url) => {
            uni.downloadFile({
                url: url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 1500
                                });
                            },
                            fail: () => {
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
                    uni.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        };


        const downloadVideo = (url) => {
            uni.downloadFile({
                url: url,
                success: (res) => {
                    if (res.statusCode === 200) {
                        uni.saveVideoToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success: () => {
                                uni.showToast({
                                    title: '保存成功',
                                    icon: 'success',
                                    duration: 1500
                                });
                            },
                            fail: () => {
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
                    uni.showToast({
                        title: '下载失败',
                        icon: 'none',
                        duration: 1500
                    });
                }
            });
        };

        return {
            obj,
            eq,
            previewImage,
            copyUrl,
            downloadImage,
            downloadVideo
        }
    },
}
</script>