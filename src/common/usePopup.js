import { shallowRef, unref } from "vue"
import isFunction from "medash/lib/isFunc"
import isEmpty from 'medash/lib/isEmpty'

export default () => {
    const popupRef = shallowRef(null)
    const show = shallowRef(false)
    const close = (callback) => {
        const popup = unref(popupRef)
        if (isEmpty(popup)) {
            return
        }
        popup.close()
        show.value = false
        isFunction(callback) && callback()
    }

    const open = (callback, type) => {
        const popup = unref(popupRef)
        if (isEmpty(popup)) {
            return
        }
        type ? popup.open(type) : popup.open()
        show.value = true
        isFunction(callback) && callback()
    }

    return {
        open,
        close,
        show,
        popupRef
    }
}