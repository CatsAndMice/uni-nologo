export const toSelectPerson = (title, type) => {
    uni.navigateTo({
        url: `/pages/selectPerson/selectPerson?title=${title}&type=${type}`
    })
}

export const toPreview = (type, title) => {
    uni.navigateTo({
        url: `/pages/previewPerson/previewPerson?type=${type}&title=${title}`
    })
}