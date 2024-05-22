import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"
import ajax from 'uni-ajax'
import { userData } from '../stores/userData.js'
import { baseURL } from '../config/app'

const instancePlus = ajax.create({
    // 默认配置 
    baseURL,
    timeout: 30000,
    header: {
        'content-type': 'application/json'
    },
})


function checkParams(params) {
    if (typeof params != 'object') return params
    for (let key in params) {
        const value = params[key];
        if (value === null || value === undefined || value === "") {
            delete params[key];
        }
    }
    return params;
}

// 添加请求拦截器
instancePlus.interceptors.request.use(
    config => {
        config.data = checkParams(config.data)
        config.params = checkParams(config.params)
        console.log( userData().token.session,1111);
        config.header.Authorization = userData().token.session
        return config
    },
    error => {
        Promise.reject(error)
    }
)


// 添加响应拦截器
instancePlus.interceptors.response.use(
    response => {
        const { statusCode, data } = response
        if (statusCode == 200) {
            return data
        } else {
            uni.showToast({
                title: data.msg || '请求失败',
                icon: "none"
            })
        }
    },
    error => {
        uni.showToast({
            title: '响应错误后',
            icon: "none"
        })
        return Promise.reject(error)
    }
)


export const getOpt = async (params) => {
    const [err, result] = await to(instancePlus.get('/jingjie/apis/auth/ops/base-dept-items', params))
    if (isEmpty(result)) return []
    return result.code === 200 ? result.data : []
}