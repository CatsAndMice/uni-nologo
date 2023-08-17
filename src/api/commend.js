import request from '@/utils/request'
import { to } from "await-to-js"
import eq from 'medash/lib/eq'
import isEmpty from 'medash/lib/isEmpty'

/**
 * 申请表彰
 * @param {Object} data 
 * @returns 
 */
export const reqCommendApply = (data) => {
	return request.post(`/commendation/apply/personal`, data)
}
/**
 * 获取表彰申请列表
 * @param {Object} data 
 * @returns 
 */
export const getCommendApplyRecord = (data) => {
	return request.get(`/commendation/apply/record`, data)
}
/**
 * 获取表彰申请详情
 * @param {String} applyRecordId 
 * @returns 
 */
export const getCommendApplyDetail = (applyRecordId) => {
	return request.get(`/commendation/apply/record/${applyRecordId}`, {})
}
/**
 * 获取已发放表彰列表
 * @param {Object} data 
 * @returns 
 */
export const getCommendDistribute = (data) => {
	return request.post(`/commendation/distribute/user`, data)
}

/**
 * 获取手动表彰项列表
 * @param {String} userId 
 * @returns 
 */
export const getCommendPersonal = (userId) => {
	return request.get(`/commendation/${userId}/personal`, {})
}


export const getWaitCommend = async () => {
	const [err, result] = await to(request.get(`/commendation/wait`))
	if (isEmpty(result)) return []
	return eq(result.code, 200) ? result.data : []
}

export const acceptCommend = async (params) => {
	const [err, result] = await to(request.post('/commendation/receive', params))
	if (isEmpty(result)) return false
	return eq(result.code, 200)
}

/**
*	表彰项
*/
export const getCommendation = async (param) => {
	const [err, result] = await to(request.post(`/commendation/list`, param))
	if (isEmpty(result)) return {}
	return eq(result.code, 200) ? result.data[0] : {}
}
