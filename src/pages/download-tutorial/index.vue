<template>
    <view class="min-h-screen bg-slate-100 py-4 pb-5">

        <view class="mx-4 mb-4  flex items-end text-2xl font-bold text-gray-800">
            使用教程（以抖音为例）
        </view>


        <view class="mx-4 mt-2 mb-4">
            <view
                class="flex flex-col items-center justify-center px-4 py-3 bg-blue-50 rounded-xl border border-blue-100"
                @tap="copyUrl">
                <text class="text-blue-700 font-medium text-sm flex items-center">
                    📖 查看其他平台详细教程
                </text>
                <text class="text-gray-500 text-xs mt-1 text-center">
                    点击复制链接，粘贴到手机/电脑浏览器中打开
                </text>
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第一步：分享转发</text>
            </view>
            <view class="mt-3">
                <text class="text-gray-600">首先我们打开抖音网站或app，点击打开你需要下载去水印的视频或图片作品，点击视频中的</text>
                <text class="font-semibold">【分享转发按钮】</text>
                <text class="text-gray-600">;</text>
            </view>

            <view class="my-3 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/1280X1280.PNG" />
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第二步：复制链接</text>
            </view>

            <view class="mt-3">
                <text class="text-gray-600">点击其中的</text> <text class="font-semibold">【分享链接】</text><text
                    class="text-gray-600">，链接会自动复制到粘贴板</text>
                <text class="text-gray-600">;</text>
            </view>


            <view class="my-3 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/22.JPEG" />
            </view>

            <view class="mt-3 p-3 bg-blue-50 rounded-lg">
                <text class="block mt-2 text-red-500 font-medium">注意：手机APP和电脑网页打开抖音获取链接的方式会有一点出入，需要注意获取方式!</text>
            </view>
        </view>


        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第三步：粘贴链接</text>
            </view>

            <view class="mt-3">
                <text class="text-gray-600">首先打开我们的鸭鸭去水印工具，</text>
                <text class="font-semibold">【粘贴】</text>
                <text class="text-gray-600">链接复制到我们小程序的解析框中;</text>
            </view>

            <view class="my-3 flex justify-center">
                <t-image class="w-full" mode="widthFix"
                    src="https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/33.png" />
            </view>
        </view>


        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第四步：点击解析</text>
            </view>

            <view class="mt-3">
                <text class="text-gray-600">点击</text>
                <text class="font-semibold">【开始解析】</text>
                <text class="text-gray-600">按钮，等待网站解析完成;</text>
            </view>


            <view class="my-3 flex justify-center">
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