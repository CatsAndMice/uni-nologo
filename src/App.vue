<script>
	import {
		userData
	} from './stores/userData.js'
	import {
		checkUpdateVersion
	} from './tools/dd_update.js'
	export default {
		onLaunch: function(e) {
			// let param = dd.getLaunchOptionsSync();
			// console.log(JSON.stringify(param));
			// uni.showToast({
			// 	title: JSON.stringify(param),
			// 	icon: 'none',
			// 	duration: 3000
			// })
			checkUpdateVersion()
			console.log('App Launch')
			var res = uni.getSystemInfoSync();
			console.log(res)
			userData().setOsName(res.osName)
			// #ifdef MP-DINGTALK
			my.setNavigationBar({
				frontColor: '#000000',
				backgroundColor: '#F7F8FA'
			})
			//#endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "@/static/colorui/main.css";
	@import "@/static/colorui/icon.css";
	@import "@/static/colorui/animation.css";
	@import "@/styles/ja_base.scss";
</style>