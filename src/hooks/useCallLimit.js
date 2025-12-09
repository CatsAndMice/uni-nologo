// src/hooks/useCallLimit.js
import { ref, unref } from "vue";

const maxCalls = 4,
    storageKey = 'callLimitRecord';
export function useCallLimit() {
    const callRecord = ref(getCallRecord())
    function getCallRecord() {
        const today = new Date().toISOString().split('T')[0]; // 当前日期，格式为 YYYY-MM-DD
        const callRecordArea = uni.getStorageSync(storageKey) || {};
        const { date = null } = callRecordArea;
        if (date !== today) {
            callRecordArea.date = today;
            callRecordArea.count = maxCalls;
            //是否已分享
            callRecordArea.isShared = false;
            //是否已签到
            callRecordArea.isChecked = false;
            uni.setStorageSync(storageKey, callRecordArea);
        }
        return callRecordArea;
    }
    const checkCallLimit = () => {
        const unrefCallRecord = unref(callRecord);

        // 检查调用次数是否超过限制
        if (unrefCallRecord.count < 1) {
            return true; // 超出限制
        }

        // 更新调用次数
        callRecord.value.count -= 1;
        uni.setStorageSync(storageKey, unref(callRecord));
        return false; // 未超出限制
    };


    const onExceedLimit = ({ count = 0, isChecked = false, isShared = false }) => {
        callRecord.value.count += count;
        callRecord.value.isChecked = isChecked;
        callRecord.value.isShared = isShared;
        uni.setStorageSync(storageKey, unref(callRecord));
    };

    return {
        callRecord,
        checkCallLimit,
        onExceedLimit,
    };
}