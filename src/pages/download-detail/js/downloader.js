// 封装一个“假进度”进度条
let progressTimer = null
function fakeProgress(duration = 8000) {          // 8s 内从 0→90
    let p = 0
    clearInterval(progressTimer)
    progressTimer = setInterval(() => {
        p += 2
        console.log(p);
        uni.showLoading({
            title: `下载中 ${p}%`,
            mask: true
        })
        if (p >= 90) {          // 最多到 90%，留 10% 给最后保存
            clearInterval(progressTimer)
            return
        }

    }, duration / 45)
}

export const downloadImage = (url, options = {}) => {
    fakeProgress()
    uni.downloadFile({
        url: `${import.meta.env.VITE_DOWNLOAD_PICS_API}?url=${encodeURIComponent(url)}`,
        success: (res) => {
            clearInterval(progressTimer)
            if (res.statusCode === 200) {
                uni.showLoading({ title: '保存中 95%', mask: true })
                if (options && options.type === 'share') {
                    uni.hideLoading()
                    wx.showShareImageMenu({
                        path: res.tempFilePath,
                        success: () => {
                            uni.showToast({
                                title: '分享成功',
                                icon: 'success',
                                duration: 1500
                            });
                        },
                        fail: () => {
                            uni.showToast({
                                title: '分享失败',
                                icon: 'none',
                                duration: 1500
                            });
                        }
                    })
                    return
                }

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
            } else {
                uni.hideLoading()
                uni.showToast({ title: '下载失败', icon: 'none' })
            }
        },
        fail: () => {
            clearInterval(progressTimer)
            uni.hideLoading();
            uni.showToast({
                title: '下载失败',
                icon: 'none',
                duration: 1500
            });
        }
    });
};

export const downloadVideo = (url) => {
    fakeProgress()
    uni.downloadFile({
        url: `${import.meta.env.VITE_DOWNLOAD_VIDEO_API}?url=${encodeURIComponent(url)}`,
        success: (res) => {
            clearInterval(progressTimer)
            if (res.statusCode === 200) {
                uni.showLoading({ title: '保存中 95%', mask: true })
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
                        clearInterval(progressTimer)
                        uni.hideLoading();
                        uni.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 1500
                        });
                    }
                });
            } else {
                uni.hideLoading()
                uni.showToast({ title: '下载失败', icon: 'none' })
            }
        },
        fail: () => {
            clearInterval(progressTimer)
            uni.hideLoading();
            uni.showToast({
                title: '下载失败',
                icon: 'none',
                duration: 1500
            });
        }
    });
};