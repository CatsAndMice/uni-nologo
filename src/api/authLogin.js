import ajax from 'uni-ajax'
import { baseURL } from '../config/app'
import { to } from "await-to-js"
import { isUndefined, isFunction, isNull } from '@/tools/tool.js'
import { userData } from '../stores/userData.js'
import { LoginType } from '../utils/type.js'
import { saveUserData ,getUserInfo} from './user.js'
import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'

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
		const { statusCode, data } = response
		console.log(data, response);
		if (statusCode == 200) {
			return data
		} else {
			uni.showToast({
				title: data.msg || '请求失败',
				icon: "none"
			})
		}
	},
	error => {
		uni.showToast({
			title: '响应错误后',
			icon: "none"
		})
		return Promise.reject(error)
	}
)

//获取系统appId
const getAppId = async (callback) => {
	const appIdRes = dd.getAppIdSync()
	const [err, data] = await to(instance.post('/basic/open/domain/check', {
		domain: appIdRes.appId
	}))
	console.log(data);
	callback(data)
}
//钉钉自动登录 
export const dingLogin = (callback) => {
	getAppId((appIdRes) => {
		if (isUndefined(appIdRes) || isNull(appIdRes)) {
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
					console.log(data.code, 'code');

					Cache.remove(BaseDataKey.USER_INFO)
					//保存token
					userData().setToken(data.data)
					const [err, result] = await to(getUserInfo({}))
					if (isUndefined(result)) {
						isFunction(callback) && callback(LoginType.LOGIN_FAIL)
					}
					
					if (result.code === 200 && result.data !=null) {
						userData().setUserInfo(result.data)
						isFunction(callback) && callback(LoginType.LOGIN_SUCCESS)
					} else {
						isFunction(callback) && callback(LoginType.LOGIN_FAIL)
					}
				} else {
					isFunction(callback) && callback(LoginType.LOGIN_FAIL)
				}
			},
			fail: function (err) {
				isFunction(callback) && callback(LoginType.LOGIN_FAIL)
			}
		});
	})
}

export const accountLogin = (query,callback) => {
	getAppId(async (appIdRes) => {
		console.log(appIdRes);
		const [err, data] = await to(instance.post(
			`/dian/apis/session/${appIdRes.appId}/account-authorized`, query
		))
			if (isUndefined(data)) {
				isFunction(callback) && callback(LoginType.LOGIN_FAIL)
			} else if (data.code == 200) {
				Cache.remove(BaseDataKey.USER_INFO)
				//保存token
				userData().setToken(data.data)
				const [err, result] = await to(getUserInfo({}))
				if (isUndefined(result)) {
					isFunction(callback) && callback(LoginType.LOGIN_FAIL)
				}
				
				if (result.code === 200 && result.data !=null) {
					userData().setUserInfo(result.data)
					isFunction(callback) && callback(LoginType.LOGIN_SUCCESS)
				} else {
					isFunction(callback) && callback(LoginType.LOGIN_FAIL)
				}
			} else {
				isFunction(callback) && callback(LoginType.LOGIN_FAIL)
			}
	})
}