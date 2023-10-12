export const toUserInfoPage = (userId) => {
    uni.navigateTo({
        url: `/pages/userInfoPage/userInfoPage?userId=${userId}`
    })
}


export const toMoreRankPage = () => {
    uni.navigateTo({
        url: `/pages/moreRank/moreRank`
    })
} 