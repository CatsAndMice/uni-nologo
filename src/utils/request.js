import ajax from 'uni-ajax'
import {
	baseURL
} from '../config/app'
import {
	paramsToStr
} from '../tools/uni-tools.js'
import Cache from '../utils/cache.js'
import {
	BaseDataKey
} from '../utils/type.js'

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
	baseURL: `${baseURL}/todo/apis/`,
	timeout: 30000,
	header: {
		'content-type': 'application/json'
	},
})
Cache.set(BaseDataKey.TOKEN, '336666')
// 添加请求拦截器
instance.interceptors.request.use(
	config => {
		config.data = checkParams(config.data)
		config.params = checkParams(config.params)

		config.header.token = Cache.get(BaseDataKey.TOKEN)
		return config
	},
	error => {
		// Do something with request error
		console.log(error) // for debug
		Promise.reject(error)
	}
)

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		// 对响应数据做些什么
		console.log('响应成功后', response)
		return response
	},
	error => {
		// 对响应错误做些什么
		console.log('响应错误后', error)
		return Promise.reject(error)
	}
)

export default instance