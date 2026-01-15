let videoAd = null;
export default (onRewardGranted, onRewardDenied) => {
    const initRewardedVideoAd = (adUnitId) => {
        if (typeof wx === 'undefined' || !wx.createRewardedVideoAd) {
            console.warn('当前环境不支持 wx.createRewardedVideoAd');
            return;
        }

        videoAd = wx.createRewardedVideoAd({ adUnitId });

        videoAd.onLoad(() => {
            console.log('激励视频广告加载成功');
        });

        videoAd.onError((err) => {
            console.error('激励视频广告加载失败', err);
        });

        // 临时监听 onClose，确保每次 show 都能获取最新状态
        const handleClose = (res) => {
            if (res && res.isEnded) {
                console.log('✅ 用户完整观看广告，可以发放奖励');
                onRewardGranted?.();
            } else {
                console.log('❌ 用户中途关闭广告，不发放奖励');
                onRewardDenied?.(new Error('用户未完整观看广告'));
            }
        };
        videoAd.onClose(handleClose);
    }

    const showRewardedVideoAd = () => {
        if (!videoAd) {
            console.error('激励视频广告未初始化，请先调用 initRewardedVideoAd');
            onShowFail?.(new Error('广告未初始化'));
            return;
        }
        if (videoAd) {
            videoAd.show().catch(() => {
                // 失败重试
                videoAd.load()
                    .then(() => videoAd.show())
                    .catch(err => {
                        console.error('激励视频 广告显示失败', err)
                        onShowFail?.(new Error('激励视频 广告显示失败'));
                    })
            })
        }
    }

    return {
        initRewardedVideoAd,
        showRewardedVideoAd
    }

}

