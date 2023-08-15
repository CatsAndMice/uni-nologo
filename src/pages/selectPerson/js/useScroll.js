import { ref, onMounted, watch } from "vue"

export default () => {
    const el = ref(null)


    watch(el, (value) => {
        console.log(value);
    })
    onMounted(() => {
        console.log(el.value);
    })

    return {
        el
    }
}