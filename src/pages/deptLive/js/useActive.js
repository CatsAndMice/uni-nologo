import { ref, unref, watch } from "vue"
import isFunc from "medash/lib/isFunc"
import YWJATRACK from "@/config/jstrack.js"

export default (list, callback) => {
    const enumActive = ref('')
    const enumName = ref('')
    const selectEnum = (e) => {
        enumActive.value = e.value
        enumName.value = e.label
        isFunc(callback) && callback(unref(enumActive))
        YWJATRACK.uploadTrack('部门表彰-切换表彰类型','type')
    }

    watch(list, (l) => {
        if (l[0]) {
            enumActive.value = l[0].value
            enumName.value = l[0].label
            isFunc(callback) && callback(unref(enumActive))
        }
    })

    return {
        enumActive,
        enumName,
        selectEnum
    }
}