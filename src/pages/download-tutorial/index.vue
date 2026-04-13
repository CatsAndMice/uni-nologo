<template>
    <view class="min-h-screen bg-[#F5F5F5] py-4 pb-6">

        <view class="mx-4 mb-4">
            <text class="text-xl font-bold text-[#333333]">使用教程（以抖音为例）</text>
        </view>


        <view class="mx-4 mb-3">
            <view
                class="flex flex-col items-center justify-center px-3 py-3 bg-[#E3F2FD] rounded-lg"
                @tap="copyUrl">
                <text class="text-[#1976D2] font-medium text-xs flex items-center">
                    <t-icon name="link" size="14" class="mr-1" />
                    查看其他平台详细教程
                </text>
                <text class="text-[#999999] text-xs mt-1 text-center">
                    点击复制链接，粘贴到手机/电脑浏览器中打开
                </text>
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg p-4 mb-3">
            <view class="flex items-center py-1">
                <view class="w-7 h-7 bg-[#4A90D9] rounded-lg flex items-center justify-center">
                    <text class="text-white font-medium text-sm">1</text>
                </view>
                <text class="ml-2 text-lg font-medium text-[#333333]">第一步：分享转发</text>
            </view>
            <view class="mt-3 text-[#666666] leading-relaxed text-sm">
                <text>首先我们打开抖音网站或app，点击打开你需要下载去水印的视频或图片作品，点击视频中的</text>
                <text class="font-medium text-[#4A90D9]">【分享转发按钮】</text>
                <text>;</text>
            </view>

            <view class="my-4 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/1280X1280.PNG" />
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg p-4 mb-3">
            <view class="flex items-center py-1">
                <view class="w-7 h-7 bg-[#4A90D9] rounded-lg flex items-center justify-center">
                    <text class="text-white font-medium text-sm">2</text>
                </view>
                <text class="ml-2 text-lg font-medium text-[#333333]">第二步：复制链接</text>
            </view>

            <view class="mt-3 text-[#666666] leading-relaxed text-sm">
                <text>点击其中的</text> <text class="font-medium text-[#4A90D9]">【分享链接】</text><text
                    class="text-[#666666]">，链接会自动复制到粘贴板</text>
                <text class="text-[#666666]">;</text>
            </view>


            <view class="my-4 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/22.JPEG" />
            </view>

            <view class="mt-3 p-3 bg-[#FFF8E1] rounded-lg">
                <view class="flex items-start">
                    <t-icon name="info-circle" size="14" color="#FFA000" class="mr-1 mt-0.5" />
                    <text class="text-[#FF8F00] text-xs">注意：手机APP和电脑网页打开抖音获取链接的方式会有一点出入，需要注意获取方式!</text>
                </view>
            </view>
        </view>


        <view class="mx-4 bg-white rounded-lg p-4 mb-3">
            <view class="flex items-center py-1">
                <view class="w-7 h-7 bg-[#4A90D9] rounded-lg flex items-center justify-center">
                    <text class="text-white font-medium text-sm">3</text>
                </view>
                <text class="ml-2 text-lg font-medium text-[#333333]">第三步：粘贴链接</text>
            </view>

            <view class="mt-3 text-[#666666] leading-relaxed text-sm">
                <text>首先打开我们的鸭鸭去水印工具，</text>
                <text class="font-medium text-[#4A90D9]">【粘贴】</text>
                <text>链接复制到小程序的解析框中;</text>
            </view>

            <view class="my-4 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/33.png" />
            </view>
        </view>


        <view class="mx-4 bg-white rounded-lg p-4 mb-3">
            <view class="flex items-center py-1">
                <view class="w-7 h-7 bg-[#4A90D9] rounded-lg flex items-center justify-center">
                    <text class="text-white font-medium text-sm">4</text>
                </view>
                <text class="ml-2 text-lg font-medium text-[#333333]">第四步：点击解析</text>
            </view>

            <view class="mt-3 text-[#666666] leading-relaxed text-sm">
                <text>点击</text>
                <text class="font-medium text-[#4A90D9]">【开始解析】</text>
                <text>按钮，等待解析完成;</text>
            </view>


            <view class="my-4 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/44.png" />
            </view>
        </view>
    </view>
</template>

<script>
import { shareConfig } from "../../utils/common.js";
// import NologoFooter from '../../components/nologo-footer.vue';
const link = 'https://zwf4g5rfwiy.feishu.cn/wiki/JGjpwZ1Feiw8Zxks4Hoc8vI9nle'
export default {
    components: {
        // NologoFooter
    },
    ...shareConfig,
    setup() {
        const copyUrl = () => {
            wx.setClipboardData({
                data: link,
                showToast: false,
                success: () => {
                    wx.showToast({
                        title: '复制链接成功，请浏览器访问',
                        icon: 'none'
                    })
                }
            });
        };
        return {
            copyUrl
        }
    },
}
</script>