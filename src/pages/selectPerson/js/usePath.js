import { ref, unref } from "vue"

export default (callback) => {
    const paths = ref([{ deptName: '通讯录', deptId: 'contacts' }])
    const clearPaths = () => {
        paths.value = [{ deptName: '通讯录', deptId: 'contacts' }]
    }
    const addPath = (obj) => {
        const unrefPaths = unref(paths)
        const index = unrefPaths.indexOf(obj)
        if (index != -1) {
            paths.value = unrefPaths.splice(0, index + 1)
            return
        }
        paths.value.push(obj)
    }

    return {
        paths,
        addPath,
        clearPaths
    }


}