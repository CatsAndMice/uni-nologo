import Message from '../wxcomponents/tdesign/message/index';

export const showErrorMessage = function () {
    Message.error({
        context: this,
        offset: [90, 32],
        duration: 5000,
        content: '这是一条错误提示通知',
    });
}