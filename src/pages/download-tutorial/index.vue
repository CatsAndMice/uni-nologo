<template>
    <view class="min-h-screen bg-slate-100 pt-4">
        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">使用教程</text>
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg shadow p-4 mb-4">
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第一步：点击分享转发</text>
            </view>
            <view class="mt-3">
                <text class="text-gray-600">首先我们打开抖音网站或app，点击打开你需要下载去水印的视频或图片作品，点击视频中的</text>
                <text class="font-semibold">【分享转发按钮】</text>
                <text class="text-gray-600">;</text>
            </view>

            <view class="my-3 flex justify-center">
                <!-- 占位图，实际开发中应替换为真实图片 -->
                <view class="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 flex items-center justify-center">
                    <text class="text-gray-500">示意图1</text>
                </view>
            </view>
        </view>

        <view>
            <view class="relative flex items-center py-2">
                <view class="h-6 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></view>
                <text class="ml-3 text-xl font-bold text-gray-800">第一步：获取分享链接</text>
            </view>

            <view class="my-3 flex justify-center">
                <!-- 占位图，实际开发中应替换为真实图片 -->
                <view class="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 flex items-center justify-center">
                    <text class="text-gray-500">示意图2</text>
                </view>
            </view>

            <view class="mt-3 p-3 bg-blue-50 rounded-lg">
                <text class="text-gray-600">如上，我们就可以获取到抖音的正确解析链接!</text>
                <text class="block mt-2 text-red-500 font-medium">注意：手机APP和电脑网页打开抖音获取链接的方式会有一点出入，需要注意获取方式!</text>
            </view>
        </view>

        <view class="mx-4 bg-white rounded-lg shadow p-4">
            <text class="text-lg font-semibold text-gray-800">如何正确解析</text>

            <view class="mt-3">
                <text class="text-gray-700 font-medium">第一步：</text>
                <text class="text-gray-600">首先打开我们的无水印下载鸭，把</text>
                <text class="font-semibold">【粘贴】</text>
                <text class="text-gray-600">链接复制到我们网站的解析框中;</text>
            </view>

            <view class="mt-3">
                <text class="text-gray-700 font-medium">第二步：</text>
                <text class="text-gray-600">点击</text>
                <text class="font-semibold">【解析】</text>
                <text class="text-gray-600">按钮，等待网站解析完成;</text>
            </view>

            <view class="my-3 flex justify-center">
                <!-- 占位图，实际开发中应替换为真实图片 -->
                <view class="bg-gray-200 border-2 border-dashed rounded-xl w-64 h-48 flex items-center justify-center">
                    <text class="text-gray-500">示意图3</text>
                </view>
            </view>

            <view class="mt-3">
                <text class="text-gray-700 font-medium">第三步：</text>
                <text class="text-gray-600">可以选择直接</text>
                <text class="font-semibold">【下载】</text>
                <text class="text-gray-600">;</text>
            </view>

            <view class="mt-4 p-3 bg-green-50 rounded-lg">
                <text class="text-gray-700">截止到这一步，我们就能得到抖音去除水印的视频了!</text>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    setup() {
        return {}
    },
}
</script>