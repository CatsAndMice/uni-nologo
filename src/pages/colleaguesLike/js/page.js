export const toSelectPerson = (title, type) => {
    uni.navigateTo({
        url: `/pages/selectPerson/selectPerson?title=${title}&type=${type}`
    })
}