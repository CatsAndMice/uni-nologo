import eq from "medash/lib/eq"
import isFunction from 'medash/lib/isFunc'
const getSystemInfo = (callback) => {
    const info = dd.getSystemInfoSync()
    isFunction(callback) && callback(info)
}


export default () => {
    let isIos = false
    getSystemInfo((res) => {
        isIos = eq(res.platform, "iOS")
    })
    return isIos
}