import { shallowRef } from "vue";
import { to } from "await-to-js"

export default (request) => {
    const list = shallowRef([])

    const getList = async () => {
        const [err, result] = await to(request())

        if (result) {
            list.value = result
        }
    }

    return {
        list,
        getList
    }
}