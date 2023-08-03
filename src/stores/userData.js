import { defineStore } from 'pinia'
import Cache from '../utils/cache.js'
import { BaseDataKey, BaseCacheKey } from '../utils/type.js'
import YWJATRACK from "@/config/jstrack.js"

export const userData = defineStore('userData', {
	state: () => {
		return {
			osName: '',
			userInfo: Cache.get(BaseDataKey.USER_INFO) ? Cache.get(BaseDataKey.USER_INFO) : {},
			accountInfo: Cache.get(BaseDataKey.ACCOUNT_INFO) ? Cache.get(BaseDataKey.ACCOUNT_INFO) : {},
			hiddenBanner: Cache.get(BaseCacheKey.HIDDEN_BANNER) ? true : false,
			token: Cache.get(BaseDataKey.TOKEN) ? Cache.get(BaseDataKey.TOKEN) : ''
		}
	},
	actions: {
		setOsName(osName) {
			this.osName = osName
		},
		setUserInfo(userInfo) {
			this.userInfo = userInfo
			YWJATRACK.userInfo.userName = userInfo.name
			YWJATRACK.userInfo.userId = userInfo.userId
			YWJATRACK.userInfo.deptName = userInfo.deptName
			YWJATRACK.userInfo.deptId = userInfo.deptId
			YWJATRACK.userInfo.jobNumber = userInfo.jobNumber
			YWJATRACK.userInfo.mobile = userInfo.mobile
			Cache.set(BaseDataKey.USER_INFO, userInfo);
		},
		setAccountInfo(accountInfo) {
			this.accountInfo = accountInfo
			Cache.set(BaseDataKey.ACCOUNT_INFO, accountInfo);
		},
		setHiddenBanner() {
			this.hiddenBanner = true
			Cache.set(BaseCacheKey.HIDDEN_BANNER, true, 604800)
		},
		setToken(token) {
			this.token = token;
			Cache.set(BaseDataKey.TOKEN, token);
		}
	},
})