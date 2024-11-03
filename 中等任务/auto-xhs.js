// 定义设备的宽度和高度
const DEVICE_WIDTH = 1080;
const DEVICE_HEIGHT = 1920;

// 定义最大处理直播间数量
const MAX_ROOMS = 10;

// 定义滑动函数
function swipeToNext() {
    swipe(
        DEVICE_WIDTH / 2,
        DEVICE_HEIGHT * 0.8,
        DEVICE_WIDTH / 2,
        DEVICE_HEIGHT * 0.3,
        300
    );
}

// 定义点赞函数
function quickLike() {
    // 双击屏幕中心位置进行点赞
    click(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2); // 第一次点击
    sleep(100); // 等待100毫秒
    click(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2); // 第二次点击

    click(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2); // 第一次点击
    sleep(100); // 等待100毫秒
    click(DEVICE_WIDTH / 2, DEVICE_HEIGHT / 2); // 第二次点击
}

// 优化后的关注函数
function quickFollow() {
    let retries = 3; // 最大重试次数

    // 首先点击左上角头像
    try {
        // 根据图片信息，通过className和bounds来定位头像元素
        let avatar = className("android.widget.ImageView")
            .bounds(36, 126, 144, 234)
            .findOne(2000);

        if (avatar) {
            avatar.click();
            sleep(1500); // 等待个人页面加载

            // 在个人页面寻找并点击关注按钮
            let followButton = text("关注")
                .className("android.widget.Button")
                .findOne(2000);

            if (followButton) {
                let bounds = followButton.bounds();
                click(bounds.centerX(), bounds.centerY());
                sleep(1000); // 等待关注操作完成

                // 返回到视频页面
                back();
                sleep(800); // 等待返回动作完成
                return true;
            }
        }
    } catch (error) {
        console.error("关注过程出错:", error);
    }

    return false;
}

// 处理单个直播间的所有操作
function handleSingleRoom() {
    // 等待直播间加载
    sleep(1500);

    // 然后进行点赞
    quickLike();
    sleep(500);
    toast("已点赞");

    // 先进行关注操作
    if (quickFollow()) {
        toast("已关注");
    } else {
        toast("关注失败或已关注");
    }
    sleep(800);



    sleep(500);
}

// 主要处理函数
function processRooms(count) {
    toast("开始处理直播间");

    // 处理指定数量的直播间
    for (let i = 0; i < count; i++) {
        toast("正在处理第" + (i + 1) + "个直播间");

        // 处理当前直播间
        handleSingleRoom();

        // 如果不是最后一个直播间，则滑动到下一个
        if (i < count - 1) {
            swipeToNext();
            sleep(2000); // 等待新直播间加载
        }
    }

    toast("完成所有直播间处理");
}

// 主程序
function main() {
    // 设置屏幕常亮
    device.keepScreenDim();

    try {
        // 检查无障碍服务
        if (!auto.service) {
            toast("请开启无障碍服务");
            auto();
            sleep(1000);
        }

        // 设置运行环境
        setScreenMetrics(DEVICE_WIDTH, DEVICE_HEIGHT);

        // 开始处理直播间
        processRooms(MAX_ROOMS);
    } catch (error) {
        toast("发生错误: " + error);
        console.error(error);
    } finally {
        // 关闭屏幕常亮
        device.cancelKeepingAwake();
    }
}

// 启动主程序
main();