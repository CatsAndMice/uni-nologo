import { isEmpty } from "lodash-es";
import { shallowRef } from "vue";

export default (request) => {
    const obj = shallowRef({});
    const loading = shallowRef(false);
    const getObject = async (url) => {
        loading.value = true
        const data = await request(url)
        loading.value = false
        if (!isEmpty(data)) {
            obj.value = data
        }
    }

    return {
        obj,
        loading,
        getObject
    }
}