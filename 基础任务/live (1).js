function openApp(){
    auto.waitFor();
    var appName = "com.xingin.xhs";
    app.launch(appName);
    sleep(1000);
    return;
}

function openLiveList(){
    var a = indexInParent("2").findOnce();
    if (a) {
        a.click();
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function openRandomLive(){
    var b = className("android.widget.RelativeLayout").depth("22").find();
    if (b) {
        var Count = b.size();
        var randomIndex = Math.floor(Math.random() * Count);
        var randomElement = b.get(randomIndex);
        randomElement.click();
        console.log(randomIndex);
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function inputInfo(info){
    var c = desc("评论输入框").findOne();
    if (c) {
        c.click();
        input(info);
        sleep(2000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function sendInfo(){
    var d = text("发送").findOne();
    if (d) {
        d.click();
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function openSend(){
    var e = desc("发布").findOne();
    if (e) {
        e.click();
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function openText(){
    var f = className("android.widget.FrameLayout").depth("10").indexInParent("1").findOnce();
    if (f) {
        f.click();
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function openEdit(){
    var g = className("android.view.View").depth("9").indexInParent("3").findOnce();
    if (g) {
        g.click();
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function inputText(info){
    var h = text("说说你的想法吧~").findOnce();
    if (h) {
        h.click();
        h.setText(info);
        sleep(1000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function nextText(){
    var i = desc("下一步").findOnce();
    if (i) {
        i.click();
        sleep(2000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function sendText(){
    var i = text("发布笔记").findOnce();
    if (i) {
        i.click();
        sleep(2000);
        return;
    }else {
        //中止脚本
        exit();
    }
}

function main(){
    openApp();
    // openLiveList();
    // openRandomLive();
    // inputInfo("1");
    // sendInfo();
    openSend();
    openText();
    openEdit();
    inputText("111");
    nextText();
    nextText();
    sendText();
    exit();
}

main();
