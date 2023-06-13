 const TabbarConfig = {
    color: "#C9CDD4",
    selectedColor: "#1D2129",
	selectLineColor:"#FFA24A",
    borderStyle: "white",
    backgroundColor: "#ffffff",
    list: [{
        pagePath: "/pages/index/index",
        iconPath: "",
        selectedIconPath: "",
        text: "首页"
    }, {
        pagePath: "/pages/commendPage/commendPage",
        iconPath: "/static/home/home_tabbar_button@2x.png",
        selectedIconPath: "/static/home/home_tabbar_button@2x.png",
        text: "",
		openType:"navigate"
		
    }, {
        pagePath: "/pages/squarePage/squarePage",
        iconPath: "",
        selectedIconPath: "",
        text: "广场"
    }]
}

export default  TabbarConfig;