// src/hooks/useCallLimit.js
export function useCallLimit({
    maxCalls = 4, // 每日最大调用次数
    storageKey = 'callLimitRecord', // 存储键名
}) {
    const checkCallLimit = () => {
        const today = new Date().toISOString().split('T')[0]; // 当前日期，格式为 YYYY-MM-DD
        const callRecord = uni.getStorageSync(storageKey) || {};
        const { date } = callRecord;

        // 如果日期不是今天，重置调用次数
        if (date !== today) {
            callRecord.date = today;
            callRecord.count = 0;
            callRecord.isShared = false;
            uni.setStorageSync(storageKey, callRecord);
        }

        // 检查调用次数是否超过限制
        if (callRecord.count >= maxCalls && !callRecord.isShared) {
            return true; // 超出限制
        }

        // 更新调用次数
        callRecord.count += 1;
        uni.setStorageSync(storageKey, callRecord);
        return false; // 未超出限制
    };


    const onExceedLimit = () => {
        const callRecord = uni.getStorageSync(storageKey) || {};
        callRecord.isShared = true;
  
        uni.setStorageSync(storageKey, callRecord);
    };



    return {
        checkCallLimit,
        onExceedLimit,
    };
}