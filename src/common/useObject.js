import { to } from "await-to-js"
import { shallowRef } from "vue"
import isFunction from 'medash/lib/isFunc'
import isObject from "medash/lib/isObject"

export default (callback) => {
    const obj = shallowRef({})
    const loading = shallowRef(false)
    const onLoadObject = async () => {
        if (isFunction(callback)) {
            loading.value = true
            const [err, result] = await to(callback())
            loading.value = false
            if (isObject(result)) {
                obj.value = result
            }
        }
    }

    return {
        obj,
        loading,
        onLoadObject
    }
}