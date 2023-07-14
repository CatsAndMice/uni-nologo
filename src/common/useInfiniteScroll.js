import { ref, computed, unref, shallowRef } from "vue"
import getType from "medash/lib/getType"
import eq from "medash/lib/eq"
import isFunc from "medash/lib/isFunc"
export const isPromise = (result) => eq(getType(result), "Promise")

export default (query, cb) => {
    const listRef = shallowRef([])
    const loading = ref(false)
    const hasMore = ref(true)
    const disabled = computed(() => !loading.value || !hasMore.value)
    const getList = async (params, cb1) => {
        if (!hasMore.value || unref(loading)) return
        loading.value = true
        const requestQuery = params ? params : query;
        const result = cb(requestQuery)
        if (isPromise(result)) {
            result.then(r => {
                const { data, hasMore: isMore } = r;
                hasMore.value = isMore
                listRef.value = [...unref(listRef), ...data]
                query.page++
                loading.value = false
                isFunc(cb1) ? cb1() : null
            })
        }
    };

    const onReset = () => {
        query.page = 1
        listRef.value = []
        listRef.value.length = 0
        hasMore.value = true
        loading.value = false
    }

    const onLoad = () => {
        // loading.value = true
        getList()
    }


    return {
        loading,
        hasMore,
        query,
        listRef,
        disabled,
        getList,
        onReset,
        onLoad
    }
}