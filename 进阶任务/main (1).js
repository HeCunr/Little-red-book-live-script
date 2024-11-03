// 确保已经打开Auto.js无障碍服务

auto.waitFor();
let packageName = app.getPackageName("小红书") || "com.xingin.xhs";
if (packageName) {
    toast("启动小红书...");
    console.log("启动小红书...");
    app.launch(packageName);
} else {
    toast("无法找到小红书应用，请检查应用名称或包名！");
    console.error("无法找到小红书应用，请检查应用名称或包名！");
}

// 定义评论内容
let staticComments = [
    "今天的直播间好温馨！",
    "主播讲解得真棒，学到好多知识！",
    "真喜欢这里的氛围，加油哦~",
    "支持支持！主播辛苦了！",
    "今天的活动福利真不错！",
    "好喜欢今天的推荐内容！",
    "每次来都收获满满~",
    "希望主播每天都能这样开心！",
    "谢谢主播的用心讲解！"
];

// 5.2 实现动态评论
function postDynamicComments() {
    console.log("进入动态评论函数");
    let inputText = prompt("请输入要发送的文本：", "这是默认文本");

    let commentBox = descMatches('评论输入框').findOne().click();  // 替换为小红书的实际评论输入框ID
    sleep(1000);

    let inputbox = className("android.widget.EditText").findOne();
    inputbox.setText(inputText);
    sleep(1000);

    let sendBox = className("android.widget.Button").text("发送").findOne().click();
    sleep(1000)
}


function postStaticComments() {
    for (let i = 0; i < staticComments.length; i++) {
        // 点击评论输入框
        let commentBox = descMatches('评论输入框').findOne().click();  // 替换为小红书的实际评论输入框ID
        sleep(1000);
        let inputbox = className("android.widget.EditText").findOne();
        console.log(staticComments[i])
        inputbox.setText(staticComments[i]);
        // 点击发送按钮
        sleep(1000);
        let sendBox = className("android.widget.Button").text("发送").findOne().click();

        sleep(3000)
    }
}

// postStaticComments()

postDynamicComments();