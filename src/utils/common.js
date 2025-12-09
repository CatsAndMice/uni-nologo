export const extractUrl = (input) => {
    if (!input) return '';

    // 匹配以http或https开头的URL
    const urlMatch = input.match(/https?:\/\/[^\s"'<>()]+/);

    return urlMatch ? urlMatch[0] : '';
};

export const shareConfig = {
    // 全局分享配置
    onShareAppMessage() {
        return {
            title: '抖音、小红书等平台视频、图片去水印下载',
            path: '/pages/download-home/index',
            imageUrl: 'https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/%E5%B0%81%E9%9D%A2%E5%9B%BE.png'
        }
    },
    onShareTimeline() {
        return {
            title: '抖音、小红书等平台视频、图片去水印下载',
            query: '/pages/download-home/index',
            imageUrl: 'https://linglan008-blog.oss-cn-hangzhou.aliyuncs.com/%E5%B0%81%E9%9D%A2%E5%9B%BE.png'
        }
    },
}
