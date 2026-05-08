import { shallowRef } from 'vue';

const HISTORY_KEY = 'download_history';
const MAX_DAYS = 7;

export default function useHistory() {
    const history = shallowRef([]);

    const loadHistory = () => {
        try {
            const data = uni.getStorageSync(HISTORY_KEY);
            if (data) {
                const list = JSON.parse(data);
                history.value = filterValidRecords(list);
            }
        } catch (e) {
            console.error('加载历史记录失败', e);
            history.value = [];
        }
    };

    const filterValidRecords = (list) => {
        const now = Date.now();
        const maxAge = MAX_DAYS * 24 * 60 * 60 * 1000;
        return list.filter(item => now - item.timestamp < maxAge);
    };

    const saveHistory = (record) => {
        try {
            loadHistory();
            const list = [...history.value];
            const newRecord = {
                id: Date.now().toString(),
                timestamp: Date.now(),
                time: formatTime(Date.now()),
                ...record
            };
            const existingIndex = list.findIndex(item => item.url === record.url);
            if (existingIndex > -1) {
                list.splice(existingIndex, 1);
            }
            list.unshift(newRecord);
            const validList = filterValidRecords(list);
            uni.setStorageSync(HISTORY_KEY, JSON.stringify(validList));
            history.value = validList;
        } catch (e) {
            console.error('保存历史记录失败', e);
        }
    };

    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${month}-${day} ${hours}:${minutes}`;
    };

    const clearHistory = () => {
        uni.removeStorageSync(HISTORY_KEY);
        history.value = [];
    };

    return {
        history,
        loadHistory,
        saveHistory,
        clearHistory
    };
}