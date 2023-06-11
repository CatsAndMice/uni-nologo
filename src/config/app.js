const baseURLMap = {
	test: 'http://172.30.64.13:2010',
	dev: 'http://172.30.64.30:2010',
	prod: 'http://gateway.ywjasolar.com'
}

const baseURL = baseURLMap[process.env.UNI_NODE_ENV]

const dianWord = 'https://alidocs.dingtalk.com/i/p/KxMEGY5q6e1GoQv5KrwmPvqqYQK4lz79?dontjump=true#'
export {
	baseURL,
	dianWord
}
