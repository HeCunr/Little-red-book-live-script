// 检查并申请无障碍权限
function checkAndRequestAccessibility() {
    if (!auto.service) {
        toast("请开启无障碍服务");
        auto(); // 自动引导至无障碍设置界面
    }
}

// 打开小红书APP
function openXiaoHongShuApp() {
    toast("正在打开小红书...");
    app.launch("com.xingin.xhs"); // 小红书的包名
    sleep(2000); // 等待APP完全加载
}

// 检查是否成功进入小红书
function checkIfXiaoHongShuOpened() {
    if (currentPackage() === "com.xingin.xhs") {
        toast("小红书已打开");
        sleep(2000); // 等待首页加载
        return true;
    } else {
        toast("未能成功打开小红书");
        return false;
    }
}

// 查找并点击直播入口
function enterLiveSection() {
    if (indexInParent("2").exists()) {
        toast("找到直播入口");
        let liveButton = indexInParent("2").findOne();
        if (liveButton) {
            liveButton.click();
            toast("已点击进入直播模块");
            sleep(2000); 
            return true;
        } else {
            toast("未能找到直播按钮");
        }
    } else {
        toast("未找到直播入口的属性");
    }
    return false;
}

// 随机进入一个直播间
function enterRandomLiveRoom() {
    var liveRooms = className("android.widget.RelativeLayout").depth("22").find();
    if (liveRooms && liveRooms.size() > 0) {
        var randomIndex = Math.floor(Math.random() * liveRooms.size());
        var randomElement = liveRooms.get(randomIndex);
        randomElement.click();
        console.log(randomIndex);
        console.log("有直播");
        sleep(2000);
        return true;
    } else {
        toast("无直播间");
        console.log("无直播间");
        return false;
    }
}

// 自动发表评论
function postComment() {
    // 查找评论输入框
    let commentInput = desc("评论输入框").findOne(); // 根据描述属性找到评论输入框
    if (commentInput) {
        commentInput.click(); // 点击评论输入框
        sleep(1000); // 等待输入框获得焦点

        // 输入评论内容
        let commentText = "1";
        input(commentText);
        toast("已输入评论内容：" + commentText);
        sleep(1000);

        // 查找并点击发送按钮
        let sendButton = text("发送").findOne(); // 根据文本属性找到发送按钮
        if (sendButton) {
            sendButton.click(); // 点击发送按钮
            toast("已发送评论");
        } else {
            toast("未找到发送按钮");
        }
    } else {
        toast("未找到评论输入框");
    }
}

// 主函数
function main() {
    checkAndRequestAccessibility();
    openXiaoHongShuApp();
    if (checkIfXiaoHongShuOpened()) {
        if (enterLiveSection()) {
            if (enterRandomLiveRoom()) {
                postComment();
            } else {
                exit();
            }
        } else {
            exit();
        }
    } else {
        exit();
    }
}

// 执行主函数
main();
