//基础数据关键字
export const BaseDataKey = {
	USER_INFO: 'USER_INFO',
  ACCOUNT_INFO:'ACCOUNT_INFO',
	TOKEN: 'TOKEN',
	BACK_URL: 'BACK_URL',
	CONFIG: 'CONFIG'
}
//状态缓存字段
export const BaseCacheKey = {
	HAS_ENTER:'HAS_ENTER',
	HIDDEN_BANNER:'HIDDEN_BANNER',
	APPLY_COMMEND:'APPLY_COMMEND'
}

//登录状态字段
export const LoginType = {
	LOGIN_SUCCESS:'LOGIN_SUCCESS',
	LOGIN_FAIL:'LOGIN_FAIL',
	LOGIN_NOAUTH:'LOGIN_NOAUTH'
}
/**
 * 记录展示类型
 */
export const RecordType = {
  INTEGRAL:'NONE',
  JINGDIAN:'SCORE',
  EXPERIENCE:'EXPERIENCE'
}
/**
 * 审核状态
 */
export const ApplyStatus = {
  APPROVED:'APPROVED',
  REJECT:'REJECT',
  WAIT:'WAIT'
}
/**
 * 表彰类型
 */
export const CommendationType = {
  COMMEND_DEPT:'部门级表彰',
  COMMEND_COMPANY:'公司级表彰',
  COMMEND_PERSONAL:'个人级表彰',
  COMMEND_UNION:'工会级表彰'
}


//分页状态
export const loadingType = {
  MORE: 'more',
  LOADING: 'loading',
  NO_MORE: 'no-more'
}

// 收藏状态
export const CollectType = {
    COLLECTION: 1,
    CANCEL_COLLECTION: 0
}
