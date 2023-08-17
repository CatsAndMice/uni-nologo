import { ref, watch } from "vue"

export default (competenceDimensionList) => {
    const info = ref([])
    const current = ref(0)
    const itemNum = 6

    const change = (e) => {
        current.value = e.detail.current
    }

    watch(competenceDimensionList, (list = []) => {
        let page = 0
        const length = list.length
        if (!length) return
        if (list.length) {
            page = Math.ceil(list.length / itemNum)
        }

        info.value.length = 0
        current.value = 0

        for (let index = 0; index < page; index++) {
            info.value.push(list.slice(index * itemNum, (index + 1) * itemNum))
        }

    })

    return {
        info,
        change,
        current
    }
}