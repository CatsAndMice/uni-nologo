import request from '@/utils/request'

/**
 * 申请表彰
 * @param {Object} data 
 * @returns 
 */
export const reqCommendApply = (data) => {
	return request.post(`/commendation/apply`, data)
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
	return request.get(`/commendation/distribute`, data)
}

/**
 * 获取手动表彰项列表
 * @param {String} userId 
 * @returns 
 */
export const getCommendPersonal = (userId) => {
	return request.get(`/commendation/${userId}/personal`, {})
}