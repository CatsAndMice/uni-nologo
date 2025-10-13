import { shallowRef } from "vue";
import { eq } from "lodash-es"
export default ({ copyUrl, downloadImage, downloadVideo }) => {
    const showConfirm = shallowRef(false);
    let urlType,
        dialogUrl;


    const onConfirm = () => {
        showConfirm.value = false;
        if (eq(urlType, 'video')) {
            return downloadVideo(dialogUrl)
        }

        downloadImage(dialogUrl)
    }

    const onCancel = () => {
        showConfirm.value = false;
        copyUrl(dialogUrl)
    }

    const openDialog = (url, type) => {
        showConfirm.value = true
        dialogUrl = url
        urlType = type
    }

    return {
        showConfirm,
        onConfirm,
        onCancel,
        openDialog
    }
}