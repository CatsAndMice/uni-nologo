import { ref, shallowRef, unref } from "vue"
import toArray from "medash/lib/toArray"
import eq from "medash/lib/eq"

export const failedToast = (title = "登陆失败", config = {}) => {
    uni.showToast({
        title,
        duration: 2000,
        ...config
    })
}

const MAX_NUM = 100
export default () => {
    const selects = shallowRef([])
    const selectPerson = shallowRef([])
    const cancelSelects = ref([])
    const selectMap = new Map()
    let diffSelects = []

    const onReset = () => {
        selects.value = toArray(selectMap.keys())
        cancelSelects.value = toArray(selectMap.keys())
        selectPerson.value = toArray(selectMap.values())
        diffSelects = []
    }

    const radioClick = (id, obj, isLimit = false) => {
        if (isLimit) return
        if (selectMap.get(id)) {
            selectMap.delete(id)
        } else {

            if (eq(selectMap.size, MAX_NUM)) {
                failedToast('超出人数限制')
                return
            }

            selectMap.set(id, obj)
        }
        onReset()
    }



    const cancelRadioSelects = (id) => {
        const unrefCancelSelects = unref(cancelSelects)
        const index = unrefCancelSelects.indexOf(id)
        if (index !== -1) {
            diffSelects.push(id)
            cancelSelects.value.splice(index, 1)
            return
        }
        cancelSelects.value.push(id)
        const deleteIndex = diffSelects.indexOf(id)
        diffSelects.splice(deleteIndex !== -1 ? deleteIndex : 0, 1)
    }

    const deleteDiffSelects = () => {
        diffSelects.forEach(d => {
            selectMap.delete(d)
        })
        onReset()
    }

    return {
        selects,
        selectPerson,
        cancelSelects,
        radioClick,
        cancelRadioSelects,
        onReset,
        diffSelects,
        deleteDiffSelects
    }
}