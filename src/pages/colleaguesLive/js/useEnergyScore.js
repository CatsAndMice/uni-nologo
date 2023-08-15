import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'
import { ref } from "vue"
export default () => {
    const accountInfo = Cache.get(BaseDataKey.ACCOUNT_INFO)
    const energyInternal = ref(accountInfo.energyInternal || 0)
    const energyExternal = ref(accountInfo.energyExternal || 0)
    const internal = ref(0)
    const external = ref(0)

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
        console.log(curDeptId,energy);
        internal.value = internalNum * energy
        external.value = Math.abs(person.length - internalNum) * energy

    }

    return {
        internal,
        external,
        energyInternal,
        energyExternal,
        setInternalAndExternal
    }
}
