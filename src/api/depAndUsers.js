import request from '@/utils/request'
import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"
import eq from "medash/lib/eq"

export const getDepAndUsers = async (params) => {
    const [err, result] = await to(request.get('/user/depAndUsers', params))
    if (isEmpty(result)) return null
    if (result.code === 200) return result.data
    return null
}


export const getBaseDept = async () => {
    const [err, result] = await to(request.get('/dept/base'))
    if (isEmpty(result)) return {}
    return eq(result.code, 200) ? result.data : {}
}
