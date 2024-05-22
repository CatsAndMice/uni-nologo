import request from '@/utils/request'
import {
	to
} from "await-to-js"
import {
	isUndefined
} from '../tools/tool.js'
import {
	userData
} from '../stores/userData.js'

export const getUserInfo = (data) => {
	return request.get('/session/info?orgId=' + data.opsBaseDeptId, {})
}

export const saveUserData = async () => {
	const [err, result] = await to(getUserInfo({}))
	if (isUndefined(result)) {
		return false
	}
	const { code, data } = result
	if (code === 200) {
		userData().setUserInfo(data)
	}

	return true
}