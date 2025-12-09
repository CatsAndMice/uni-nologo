export default function () {
    const handleTabClick = (tab) => {
        if (tab === "label1") {
            uni.redirectTo({
                url: "/pages/download-home/index",
            });
        } else if (tab === "label2") {
            uni.redirectTo({
                url: "/pages/user-center/index",
            });
        }
    };

    return {
        handleTabClick,
    };
}