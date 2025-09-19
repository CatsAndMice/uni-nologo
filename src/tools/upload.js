import {
	getOssConfig
} from '../api/app.js'
import {
	isUndefined,
	isFunction
} from '@/tools/tool.js'
import { baseURL } from '@/config/app'
import {
	userData
} from '@/stores/userData.js'

















export const uploadImages = async (images, callback) => {
	// const {
	// 	code,
	// 	data
	// } = await getOssConfig()
	// if (!(code == 200)) {
	// 	callback({ status: false, index: -1 })
	// 	return
	// }
	// const config = data
	for (let i = 0; i < images.tempFilePaths.length; i++) {

		const path = images.tempFilePaths[i]
		const splitValues = path.split('/')
		const nameValues = splitValues[splitValues.length - 1]
		const nameValue = nameValues.split('.')
		const name = `${nameValue[0]}.png`
		// const key = `${config.prefixFormat}${name}`

		uni.uploadFile({
			url: baseURL + '/dian/apis/oss/upload/direct',
			filePath: path,
			fileType: 'image',
			name: 'file',
			header: {
				'Content-Type': 'multipart/form-data',
				authorization: userData().token
			},
			formData: {
				isPrivate: false
			},
			success: (uploadFileRes) => {
				const code = uploadFileRes.statusCode
				if (code == 200) {
					const data = JSON.parse(uploadFileRes.data);
					if (data.code = 200) {
						console.log(data.data.fileKey);
						
						isFunction(callback) && callback({
							status: true,
							index: i,
							url: `https://jingobj.jasolar.com:26000/${process.env.UNI_NODE_ENV == 'prod?' ? 'ywja-public-bucket' : 'ja-tdd'}/${data.data.fileKey}`,
							name: name
						})
					}

				}
			},
			fail(err) {

				isFunction(callback) && callback({ staus: false, index: i })
			}
		});
	}
}