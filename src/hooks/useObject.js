import { isEmpty } from "lodash-es";
import { shallowRef } from "vue";

export default (request) => {
    const obj = shallowRef({});
    const loading = shallowRef(false);
    const getObject = async (url, cb) => {
        loading.value = true
        const data = await request(url)
        loading.value = false
        if (!isEmpty(data)) {
            obj.value = data
            cb && cb(data)
            return
        }

        cb && cb(null)
    }

    return {
        obj,
        loading,
        getObject
    }
}