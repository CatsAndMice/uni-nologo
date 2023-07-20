import ajax from 'uni-ajax'
import {
	baseURL
} from '../config/app'
import {
	to
} from "await-to-js"
import {
	isUndefined,
	isFunction,
	isNull
} from '@/tools/tool.js'
import {
	userData
} from '../stores/userData.js'
import {
	LoginType
} from '../utils/type.js'
import {saveUserData} from './user.js'

const instance = ajax.create({
	// 默认配置 
	baseURL,
	timeout: 30000,
	header: {
		'content-type': 'application/json'
	},
})

// 添加响应拦截器
instance.interceptors.response.use(
	response => {
		const {
			statusCode
		} = response
		if (statusCode == 200) {
			return response.data
		}
	},
	error => {
		// 对响应错误做些什么
		console.log('响应错误后', error)
		return Promise.reject(error)
	}
)

//获取系统appId
const getAppId = async (callback) => {
	const appIdRes = dd.getAppIdSync()
	const [err, data] = await to(instance.post('/basic/open/domain/check', {
		domain: appIdRes.appId
	}))
	callback(data)
}
//钉钉自动登录 
export const dingLogin = (callback) => {
	getAppId((appIdRes) => {
		if (isUndefined(appIdRes)||isNull(appIdRes)) {
			isFunction(callback) && callback(LoginType.LOGIN_FAIL)
			return
		}
		
		dd.getAuthCode({
			success: async (res) => {
				const [err, data] = await to(instance.post(
					`/dian/apis/session/${appIdRes.appId}/automatic-authorized/${res.authCode}`, {}
				))
				if (isUndefined(data)) {
					isFunction(callback) && callback(LoginType.LOGIN_FAIL)
				} else if (data.code == 200) {
					//保存token
					userData().setToken(data.data)
					saveUserData()
					isFunction(callback) && callback(LoginType.LOGIN_SUCCESS)
				} else {
					isFunction(callback) && callback(LoginType.LOGIN_FAIL)
				}
			},
			fail: function(err) {
				isFunction(callback) && callback(LoginType.LOGIN_FAIL)
			}
		});
	})
}