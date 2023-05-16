const baseURLMap = {
	test: 'http://172.30.64.30:2010',
	dev: 'http://172.30.64.30:2010',
	prod: 'http://172.30.64.30:2010'
}

const baseURL = baseURLMap[process.env.UNI_NODE_ENV]

// 阿里云OSS链接
const ossBase = 'https://goldshop.oss-cn-hangzhou.aliyuncs.com/zhuanpan'

export {
	baseURL,
	ossBase
}
