import request from '@/utils/request'
import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"

export const submitColleaguesLive= async (params) => {
    const [err, result] = await to(request.post('/commendation/like', params))
    if (isEmpty(result)) return false
    return result.code === 200
}
