export const toUserInfoPage = (userId) => {
    uni.navigateTo({
        url: `/pages/userInfoPage/userInfoPage?userId=${userId}`
    })
}