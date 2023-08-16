import { ref } from "vue"

export default () => {
    const commendationActive = ref({})

    const clickCommendation = (commendation) => {
        commendationActive.value = commendation
    }

    return {
        commendationActive,
        clickCommendation
    }
}