import request from '@/utils/request'


export function postDemoMethod(data) {
	return request.post('testDemo/postMethod', data);
}

export function getDemoMethod(data) {
	return request.get('testDemo/getMethod',data)
}