import { isEmpty } from "lodash-es"
import { getDetail } from '@/api/index.js';
import useObject from '../hooks/useObject.js';

const { obj, loading, getObject } = useObject(getDetail)
export default function useDownloadDetail(url, name) {

    const getDownloadDetail = (url) => {
        return new Promise((resolve, reject) => {
            getObject(url, (result) => {
                if (isEmpty(result)) {
                    reject(null)
                    return
                }
                resolve(result)
            })
        })

    }

    return {
        obj,
        loading,
        getDownloadDetail
    }
}