const nums = document.querySelectorAll('.nums span');
const counter = document.querySelector('.counter');
const finalMessage = document.querySelector('.final');
const replay = document.getElementById('replay');
let username = $.cookie("myUsername");
let password0 = $.cookie("myWPa");
let password = $.base64.decode(password0);
let token = username + ':' + password;

/*runAnimation();*/
counter.classList.add('hide');
finalMessage.classList.add('show');

function resetDOM() {
    counter.classList.remove('hide');
    finalMessage.classList.remove('show');

    nums.forEach(num => {
        num.classList.value = '';
    });

    nums[0].classList.add('in');
}

function runAnimation() {
    nums.forEach((num, idx) => {
        const penultimate = nums.length - 1;
        num.addEventListener('animationend', (e) => {
            if(e.animationName === 'goIn' && idx !== penultimate){
                num.classList.remove('in');
                num.classList.add('out');
            } else if (e.animationName === 'goOut' && num.nextElementSibling){
                num.nextElementSibling.classList.add('in');
            } else {
                counter.classList.add('hide');
                finalMessage.classList.add('show');

                //alert("hhhhh");

                //倒计时结束后调用开始接口，并开放下载提交按钮
                $.ajax({
                    type: "PATCH",
                    dataType: "json",
                    url: IpAll() + "finals/start-final",
                    data: {type: 1},
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader('Authorization', 'Basic ' + btoa(token));
                    },
                    success: function (result) {
                        alert("开始啦啊啊啊啊啊");
                    },
                    error : function() {
                        alert("请求错误！");
                    }
                });

                return;
            }

        });
    });



}

function undisabled(id) {                   //下载按钮变为可点击
    document.getElementById(id).disabled = false;
}

function unclickBtn(id) {                   //不可下载时按钮的样式   不可提交时按钮
    document.getElementById(id).style.background = "lightgrey";
}

function downloadA(id) {                     //可下载时，下载的a标签
    if (id === "trainA") {
        document.getElementById(id).href = "files/训练数据集.zip";
        document.getElementById(id).download = "训练数据集.zip";
    } else if (id === "primaryA") {
        document.getElementById(id).href = "files/初赛测试集.zip";
        document.getElementById(id).download = "初赛测试集.zip";
    } else if (id === "finalA") {
    }

}

/*function uncommit(id){                      //不可提交时链接的样式
    document.getElementById(id).style.color = "lightgrey";
    document.getElementById(id).style.cursor = "none";
}*/

function commitA(id) {
    if (id === "trainCommit") {
        document.getElementById(id).href = "pages/resultCommit.html?id=0";
    } else if (id === "primaryCommit") {
        document.getElementById(id).href = "pages/resultCommit.html?id=1";
    } else if (id === "finalCommit") {
        document.getElementById(id).href = "pages/resultCommit.html?id=2";
    }
}

replay.addEventListener('click', () => {
    resetDOM();
    runAnimation();
});
