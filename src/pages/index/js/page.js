import { unref } from "vue"
import dd from "dingtalk-jsapi"

export const toCommonedList = () => {
    uni.navigateTo({
        url: '/pages/commendList/commendList'
    })
}

export const toFeedback = (userInfo) => {
    const env = process.env.UNI_NODE_ENV
    const { userId, name } = unref(userInfo)
    dd.biz.util.openLink({
        url: `http://feedback_web.ywjasolar.com?appId=1006&appName=晶点&userId=${userId}&userName=${encodeURI(name)}&env=${env}&isShowReturn=false`,
        onSuccess: function (result) { },
        onFail: function (err) { }
    })
}