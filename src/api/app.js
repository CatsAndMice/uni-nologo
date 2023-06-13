import request from '@/utils/request'


/**
 * 获取oss配置数据
 * @returns 
 */
export const getOssConfig = () => {
	return request.get(`/oss/config`, {})
}