import { ref } from "vue"
export default () => {
    const showModal = ref(false)

    const closeModal = () => {
        showModal.value = false
    }

    const openModal = () => {
        showModal.value = true
    }

    return {
        showModal,
        closeModal,
        openModal
    }
}