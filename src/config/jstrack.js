
const pids = {
	dev: 'kSGgvLUXuDKaqDeFgUsm',
	prod: 'qnyhBucgiSmRneobjkFz',
	test: 'dBJBqkAAkflJVMissJIN'
}

const YWJATRACK = {
	uploadUrl: "https://gateway.ywjasolar.com/bp/ja.ico?",
	uploadData: {
		pid: pids[process.env.UNI_NODE_ENV],//跟后台新增配置晶鱼、晶点小程序 pid
		sessionId: generateUniqueID(),
		version: "",
	},
	userInfo: {
		userName: '111',
		userId: '222',
		deptName: '333',
		deptId: '444',
		jobNumber: '555',
		mobile: '666'
	},
	uploadTrack(message, tag) {
		let pages = getCurrentPages()
		// console.log(currPage.route)
		let currPage = ''
		if (pages.length) {
			currPage = pages[pages.length - 1]
		}
		console.log(currPage.route,111)
		const repData = {

			pid: this.uploadData.pid,
			sessionId: this.uploadData.sessionId,
			version: this.uploadData.version,
			type: 'log-info',
			level: 'info',
			message: message,
			customTag: tag,
			name: 'jamito-log',
			url: currPage.route,
			...this.userInfo
		}
		const repDataString = this.encodeURIParams(repData);
		console.log(`${this.uploadUrl}${repDataString}`)
		sendStatData(`${this.uploadUrl}${repDataString}`)
	},
	/**
	 * json字段解析
	 * ../returns 返回当前get形式入参
	 */
	encodeURIParams(data) {
		let url = '';
		const keys = Object.keys(data)
		for (const key of keys) {
			url += `${key}=${encodeURIComponent(data[key])}&`
		}
		url = url.substring(0, url.length - 1)
		return url
	}
}

/**
 * 发送统计数据
 */
export function sendStatData(dataUrl) {
	console.log(dataUrl);
	uni.request({
		url: dataUrl,
		method: 'GET',
		dataType:'image/x-icon'
	})
}
/**
 * 获取唯一编码
 */
export function generateUniqueID() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
		const r = (Math.random() * 16) | 0,
			v = c == 'x' ? r : (r & 0x3) | 0x8
		return v.toString(16)
	})
}
export default YWJATRACK