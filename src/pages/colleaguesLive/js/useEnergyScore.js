import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'
import { ref, unref } from "vue"
export default () => {
    const accountInfo = Cache.get(BaseDataKey.ACCOUNT_INFO)
    const energyInternal = ref(accountInfo.energyInternal || 0)
    const energyExternal = ref(accountInfo.energyExternal || 0)
    const internal = ref(0)
    const external = ref(0)


    const setEnergyInternalAndExternal = (query) => {
        const { energyInternal: queryEnergyInternal, energyExternal: queryEnergyExternal } = query
        energyInternal.value = unref(queryEnergyInternal)
        energyExternal.value = unref(queryEnergyExternal)
    }

    const setInternalAndExternal = (person = [], energy) => {
        const userInfo = Cache.get(BaseDataKey.USER_INFO)
        const curDeptId = userInfo.deptId
        let internalNum = 0
        person.forEach(p => {
            const { deptId } = p
            if (curDeptId == deptId) {
                internalNum++
            }
        })
        internal.value = internalNum * energy
        external.value = Math.abs(person.length - internalNum) * energy
    }

    return {
        internal,
        external,
        energyInternal,
        energyExternal,
        setInternalAndExternal,
        setEnergyInternalAndExternal
    }
}
