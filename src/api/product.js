import request from '@/utils/request'
import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"
import eq from "medash/lib/eq"
import ajax from 'uni-ajax'
import { userData } from '@/stores/userData.js'
import { baseURL } from '@/config/app'

// 创建请求实例
const instance = ajax.create({
    // 默认配置 
    baseURL: `${baseURL}/dian/apis/`,
    timeout: 30000,
    header: {
        'content-type': 'application/json'
    },
})

// 添加请求拦截器
instance.interceptors.request.use(
    config => {
        // config.data = checkParams(config.data)
        // config.params = checkParams(config.params)
        config.header.Authorization = userData().token
        return config
    },
    error => {
        Promise.reject(error)
    }
)

export const getProduct = async (params) => {
    const [err, result] = await to(request.post(`/product/page`, params))
    if (isEmpty(result)) return {}
    return eq(result.code, 200) ? result.data : {}
}

export const getProductDetail = async (productId) => {
    const [err, result] = await to(request.get(`/product/detail?productId=${productId}`))
    if (isEmpty(result)) return {}
    return eq(result.code, 200) ? result.data : {}
}

export const getExchangedList = async (params) => {
    const [err, result] = await to(request.post(`/product/exchanged/page`, params))
    if (isEmpty(result)) return {}
    return eq(result.code, 200) ? result.data : {}
}

export const exchange = async (params) => {
    const [err, result] = await to(instance.post(`/product/exchange`, params))
  console.log(err, result);
    if (err) {
        return {
            isSuccess: false,
            msg: '请求失败,请重新兑换'
        }
    }
    if (result.statusCode == 200) {
        const data = result.data
        if (eq(data.code, 200)) {
            return {
                isSuccess: true,
            }
        } else {
            return {
                isSuccess: false,
                msg: data.msg
            }
        }
    } else {
        return {
            isSuccess: false,
            msg: '请求失败,请重新兑换'
        }
    }
}