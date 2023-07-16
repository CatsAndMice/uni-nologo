import { to } from "await-to-js"
import { shallowRef } from "vue"
import isFunction from 'medash/lib/isFunc'
import isArray from "medash/lib/isArray"
export default (callback) => {
    const list = shallowRef([])
    const loading = shallowRef(false)
    const onLoadList = async (cb) => {
        if (isFunction(callback)) {
            loading.value = true
            const [err, result] = await to(callback())
            loading.value = false
            if (isArray(result)) {
                list.value = result
                isFunction(cb) && cb(result)
            }
        }
    }

    return {
        list,
        loading,
        onLoadList
    }
}