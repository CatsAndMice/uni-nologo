import request from '@/utils/request'
/**
 * 获取总排行榜
 * @param {Object} data 
 * @returns 
 */
export const getRankTotal = (data) => {
	return request.get(`/ranking/total`, data)
}