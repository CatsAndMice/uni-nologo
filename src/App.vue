<script>
export default {
	onLaunch: function (e) {

	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	},
	// 全局分享配置
	onShareAppMessage() {
		return {
			title: '抖音、小红书等平台视频图片无水印下载',
			path: '/pages/download-home/index'
		}
	},
}
</script>

<style src="./main.css"></style>