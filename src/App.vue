<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
	
	// #ifdef MP-DINGTALK
	my.setNavigationBar({
	  frontColor: '#000000',
	  backgroundColor: '#F7F8FA'
	})
	//#endif
  },
  onShow: function () {
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style lang="scss">
/*每个页面公共css */
	@import "@/static/colorui/main.css";
	@import "@/static/colorui/icon.css";
	@import "@/styles/ja_base.scss";

</style>
