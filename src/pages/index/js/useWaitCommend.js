import { getWaitCommend, acceptCommend } from "@a/commend.js"
import useList from "@c/useList"
import usePopup from "@c/usePopup"
import { onLoad } from "@dcloudio/uni-app"
import isEmpty from "medash/lib/isEmpty"
import { shallowRef, unref } from "vue"

export default () => {
    const { list, onLoadList } = useList(getWaitCommend)
    const commendInfo = shallowRef({})
    const { open, close, show, popupRef } = usePopup()

    const openPopup = (unrefList) => {
        const item = unrefList.splice(0, 1)[0]
		
        commendInfo.value = isEmpty(item) ? {} : item
		//根据total获取imageList
		commendInfo.value.countImgList = getCountImageList(item.total)
        list.value = unrefList
        open()
    }

    const onAcceptCommend = async (item) => {
        console.log(item);
        const isSuccess = await acceptCommend({ distributeRecordIds: [item.distributeRecordId] })
        if (isSuccess) {
            close(() => {
                setTimeout(() => {
                    const unrefList = unref(list)
                    if (isEmpty(unrefList)) return
                    openPopup(unrefList)
                }, 1000)
            })
        }

    }
	const getCountImageList = (total)=>{
		let imgArr = [];
		if(total>99){
			imgArr = ['../../static/com_count/com_x.png','../../static/com_count/com_9.png','../../static/com_count/com_9.png']
		} else {
			let totalStr = total+''
			imgArr.push('../../static/com_count/com_x.png')
			for (var i = 0; i < totalStr.length; i++) {
				let iStr = `../../static/com_count/com_${totalStr[i]}.png`
				imgArr.push(iStr)
			}
		}
		
		return imgArr;
	}

    onLoad(() => onLoadList(() => {
        // 临时注释
        const unrefList = unref(list)
        if (isEmpty(unrefList)) return
        openPopup(unrefList)
    }))

    return {
        list,
        show,
        commendInfo,
        popupRef,
        close,
        onAcceptCommend
    }
}
