import { ref, unref } from "vue"
import gte from "medash/lib/gte"
import isEmpty from "medash/lib/isEmpty"
import toast from "@/tools/toast"
import { trim } from "medash/lib/trimString"
import isFunc from "medash/lib/isFunc"

export default (score) => {
    const { internal, external, energyInternal, energyExternal } = score
    const person = ref([])
    const inputValue = ref('')

    const onLiveInput = (input) => {
        inputValue.value = input
    }

    const isEnergyEnough = () => {
        const isInternalEnough = gte(unref(energyInternal), unref(internal))
        const isExternalEnough = gte(unref(energyExternal), unref(external))
        return isInternalEnough && isExternalEnough
    }
    // 同事点赞
    const isCheckTrue = () => {
        //是否已添加人员
        if (isEmpty(unref(person))) {
            toast('未添加点赞人员')
            return false
        }
        // 能量是否充足
        if (!isEnergyEnough()) {
            toast('能量不足支付，请调整人数后再确认')
            return false
        }
        // 理由字数至少10
        if (trim(unref(inputValue)).length < 10) {
            toast('点赞理由至少10个字')
            return false
        }

        return true
    }

    // 部门表彰
    const isCheckDeptTrue = () => {
        //是否已添加人员
        if (isEmpty(unref(person))) {
            toast('未添加表彰对象')
            return false
        }
        // 能量是否充足
        if (!isEnergyEnough()) {
            toast('能量不足支付，请调整人数后再确认')
            return false
        }
        // 理由字数至少10
        if (trim(unref(inputValue)).length < 10) {
            toast('表彰理由至少10个字')
            return false
        }

        return true
    }

    const submitLive = (callback) => {
        isFunc(callback) && callback({ person, inputValue })
    }


    return {
        person,
        inputValue,
        onLiveInput,
        isCheckTrue,
        submitLive,
        isCheckDeptTrue
    }
}