import { shallowRef } from "vue";
import { to } from "await-to-js"

export default (request) => {
    const list = shallowRef([])
    const loading = shallowRef(false)

    const getList = async () => {
        loading.value = true
        const [err, result] = await to(request())
        loading.value = false
        if (result) {
            list.value = result
        }
    }

    return {
        loading,
        list,
        getList
    }
}