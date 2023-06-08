const baseURLMap = {
	test: 'http://172.30.64.13:2010',
	dev: 'http://172.30.64.30:2010',
	prod: 'http://gateway.ywjasolar.com'
}

const baseURL = baseURLMap[process.env.UNI_NODE_ENV]

const dianWord = 'https://ky7a0olsjz.feishu.cn/docx/X6fudaSDeo1KSsxFl3TchJRmnwJ'
export {
	baseURL,
	dianWord
}
