import Cache from '@/utils/cache.js'
import { BaseDataKey } from '@/utils/type.js'
import { ref } from "vue"
export default () => {
    const accountInfo = Cache.get(BaseDataKey.ACCOUNT_INFO)
    const energyInternal = ref(accountInfo.energyInternal || 0)
    const energyExternal = ref(accountInfo.energyExternal || 0)

    return {
        energyInternal,
        energyExternal
    }
}
