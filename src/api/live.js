import request from '@/utils/request'
import { to } from "await-to-js"
import isEmpty from "medash/lib/isEmpty"
import eq from "medash/lib/eq"

export const submitColleaguesLive = async (params) => {
    const [err, result] = await to(request.post('/commendation/like', params))
    if (isEmpty(result)) return false
    return result.code === 200
}

export const getDept = async () => {
    const [err, result] = await to(request.get('/dept/getEnergyByUser'))
    if (isEmpty(result)) return []
    return result.code === 200 ? result.data : []
}

export const getEnum = async () => {
    const [err, result] = await to(request.get('/enum/commendation-dimension'))
    if (isEmpty(result)) return []
    return result.code === 200 ? result.data : []
}

export const getCompetenceDimensionList =async (param)=>{
    const [err, result] = await to(request.post(`/commendation/list`, param))
    if (isEmpty(result)) return []
    return eq(result.code, 200) ? result.data : []
}

