import request from '@/utils/request'
/**
 * 获取账户详情
 * @param {String} userId 
 * @returns 
 */
export const getAccountDetail = (userId) => {
	return request.get(`/account/${userId}`, {})
}
/**
 * 获取账户流水
 * @param {Object} data 
 * @returns 
 */
export const getAccountStatement = (data) => {
	return request.post(`/account/statement`, data)
}
/**
 * 兑换晶点
 * @param {String} userId 
 * @returns 
 */
export const reqAccountExchange = (userId) => {
	return request.post(`/account/exchange/${userId}`, {})
}