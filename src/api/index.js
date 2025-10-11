import ajax from 'uni-ajax';
import { to } from "await-to-js";
import { isEmpty, eq } from 'lodash-es'

const instance = ajax.create({
    // 默认配置 
    baseURL: process.env.UNI_NODE_ENV == 'dev' ? 'http://localhost:3000/api' : 'http://download.linglan01.cn/api',
    timeout: 30000,
    header: {
        'content-type': 'application/json'
    },
})

instance.interceptors.response.use(
    response => {
        const { statusCode } = response
        if (statusCode === 200) {
            const data = response.data
            if (data.code == 200) return data
            return null
        }
        return null
    },
    error => {
        return Promise.reject(error)
    }
)

export const getPlatform = async () => {
    const [err, result] = await to(instance.get('/platform'))
    if (isEmpty(result)) return []
    return eq(result.code, 200) ? result.data : []
}


export const getDetail = async (url) => {
    const [err, result] = await to(instance.get('/download?url=' + encodeURIComponent(url)))
    if (isEmpty(result)) return {}
    return eq(result.code, 200) ? result.data : {}
}

