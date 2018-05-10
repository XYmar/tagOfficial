// 设置cookie
function setCookie(c_name, value, expiredays){
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays);
    document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toUTCString());
};

//获取cookie、
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    console.log(reg);
    console.log("----");
    console.log(document.cookie);
    console.log(document.cookie.match(reg));
    if (arr = document.cookie.match(reg)){
        console.log(arr[2]);
        return (arr[2]);
    }
    else
        return null;
}