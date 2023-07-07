import {
	getOssConfig
} from '../api/app.js'
import {
	isUndefined,
	isFunction
} from '@/tools/tool.js'
export const uploadImages = async (images,callback) => {
	const {
		code,
		data
	} = await getOssConfig()
	if(!(code==200)){
		callback({status:false, index:-1})
		return
	} 
	const config = data
	for (let i = 0; i < images.tempFilePaths.length; i++) {
	
		const path = images.tempFilePaths[i]
		const splitValues = path.split('/')
		const nameValues =splitValues[splitValues.length - 1]
		const nameValue = nameValues.split('.')
		const name = `${nameValue[0]}.png`
		const key = `${config.prefixFormat}${name}`
		uni.uploadFile({
			url: config.host,
			filePath: path,
			fileType: 'image',
			name: 'file',
			formData: {
				'policy': config.policy,
				'OSSAccessKeyId': config.accessId,
				'signature': config.signature,
				'success_action_status': 200,
				key,
				name
			},
			success: (uploadFileRes) => {
				const code = uploadFileRes.statusCode
				if (code == 200) {
					const url = config.host + key;
					isFunction(callback) && callback({
						status:true,
						index:i,
						url:url,
						name:name
					})
				}
			},
			fail(err) {
				console.log(err);
				isFunction(callback) && callback({staus:false,index:i})
			}
		});
	}
}