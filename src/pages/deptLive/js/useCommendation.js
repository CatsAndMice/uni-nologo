import { ref } from "vue"
import YWJATRACK from "@/config/jstrack.js"

export default () => {
    const commendationActive = ref({})

    const clickCommendation = (commendation) => {
        commendationActive.value = commendation
        YWJATRACK.uploadTrack('部门表彰-切换表彰项', 'commendation')
    }

    return {
        commendationActive,
        clickCommendation
    }
}