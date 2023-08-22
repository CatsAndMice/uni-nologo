import { ref } from "vue"
import YWJATRACK from "@/config/jstrack.js"


export default () => {
    const showModal = ref(false)

    const closeModal = () => {
        showModal.value = false
    }

    const openModal = () => {
        showModal.value = true
        YWJATRACK.uploadTrack('点底部菜单栏+号', 'menu')
    }

    return {
        showModal,
        closeModal,
        openModal
    }
}