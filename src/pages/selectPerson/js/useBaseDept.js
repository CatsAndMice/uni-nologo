import { to } from "await-to-js"
import { ref } from "vue"
import isEmpty from "medash/lib/isEmpty"
import { getDepAndUsers ,getBaseDept} from "@a/depAndUsers.js"

export default () => {
    const baseDept = ref({})
    const dept = ref({})
    const requestBaseDept = async () => {
        const [err, result] = await to(getBaseDept())
        if (isEmpty(result)) return
        baseDept.value = result
    }

    const getDept = async () => {
        const query = { page: 1, size: 10, isSearchDept: "TRUE" }
        const [err, data] = await to(getDepAndUsers(query))
        if (isEmpty(data.deptList)) return
        dept.value = data.deptList[0]
    }



    return {
        baseDept,
        dept,
        requestBaseDept,
        getDept
    }

}