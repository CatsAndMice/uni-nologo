const baseURLMap = {
	test: 'http://172.30.64.16:2010',
	dev: 'http://172.30.64.30:2010',
	prod: 'https://gateway.ywjasolar.com',
	pre: 'https://pre_gateway.ywjasolar.com'
}

const baseURL = baseURLMap[process.env.UNI_NODE_ENV]

const dianWord = 'https://alidocs.dingtalk.com/i/nodes/vy20BglGWOBl1lEpS1nRAXyA8A7depqY?utm_scene=team_space'
export {
	baseURL,
	dianWord
}
