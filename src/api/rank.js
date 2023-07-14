import request from '@/utils/request'
import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"
import eq from "medash/lib/eq"
/**
 * 获取总排行榜
 * @param {Object} data 
 * @returns 
 */
export const getRankTotal = async (data) => {
	const [err, result] = await to(request.get(`/ranking/total`, data))
	if (isEmpty(result)) return null
	return eq(result.code, 200) ? result.data : null
}

/**
 * 已发放表彰列表
 */
export const getCommendation = async (data) => {
	const [err, result] = await to(request.post(`/commendation/distribute`, data))
	if (isEmpty(result)) return null
	return eq(result.code, 200) ? result.data : null
}