import ajax from 'uni-ajax'
import {
	baseURL
} from '../config/app'
import {
	dingLogin
} from '../api/authLogin.js'
import {
	userData
} from '../stores/userData.js'

function checkParams(params) {
	if (typeof params != 'object') return params
	for (let key in params) {
		const value = params[key];
		if (value === null || value === undefined || value === "") {
			delete params[key];
		}
	}
	return params;
}
// 创建请求实例
const instance = ajax.create({
	// 默认配置 
	baseURL: `${baseURL}/dian/apis/`,
	timeout: 30000,
	header: {
		'content-type': 'application/json'
	},
})

// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		config.data = checkParams(config.data)
		config.params = checkParams(config.params)
		config.header.Authorization = userData().token
		return config
	},
	error => {
		Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		if (response.data) {
			const {
				code,
				msg
			} = response.data;
			if (code !== 200 && msg) {
				uni.showToast({
					title: msg,
					icon: "none"
				})
			} else if (code == 401) {
				//重新授权
				dingLogin();
			}
		}

		return Promise.resolve(response.data)
	},
	error => {
		// 对响应错误做些什么
		console.log('响应错误后', error)
		const repData = { code: 666, msg: "请求出错", data: null }
		return Promise.resolve(repData)
		// return Promise.reject(error)
	}
)

export default instance