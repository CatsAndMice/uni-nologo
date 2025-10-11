export const extractUrl = (input) => {
    if (!input) return '';

    // 匹配以http或https开头的URL
    const urlMatch = input.match(/https?:\/\/[^\s"'<>()]+/);

    return urlMatch ? urlMatch[0] : input;
};
