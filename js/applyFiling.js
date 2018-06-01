// 导览

// DOM页面逻辑：
// 	个人基本信息
// 	就创业信息
// 	家庭成员
// 	租房情况
// 	审核资料上传

// 全局逻辑判断：
// 	申请资格判断
// 	判断页面是否可以编辑
// 	判断必填项
// 	封装json以及向后台提交

// 其他
//  插件初始化

//===================================DOM页面逻辑：===================================================================
//===================================个人基本信息==================================

//企业养老保险类型
$("#Insured_Type").change(function () {
    if ($("#Insured_Type").val() == "1") {
        $("#insuredAtta").hide();

        //清空个人编号
        $("#insuranceCode").val("");
        $("#insuranceCode").prop("disabled", true);

        //清空省参保附件
        $("#insuredAtta").children(".fileArea").children("div").remove();

    } else {
        $("#insuredAtta").show();
        $("#insuranceCode").prop("disabled", false);
    }
});

//户籍地址三级联动
if ($('#permanentStatus').val() != "" && $('#permanentStatus').val() != "6") {
    $('#permanentSelect').cxSelect({
        url: 'js/NanJingAreaData.js',
        selects: ['province', 'city', 'area'],  // 数组，请注意顺序
        emptyStyle: 'none'
    });
} else {
    $('#permanentSelect').cxSelect({
        url: 'js/cityData.min.js',
        selects: ['province', 'city', 'area'],  // 数组，请注意顺序
        emptyStyle: 'none'
    });
}

//居住地址二级联动
$('#residentialSelect').cxSelect({
    url: 'js/NanJingRoadData.js',
    selects: ['area', 'road'],  // 数组，请注意顺序
    emptyStyle: 'none'
});

//本市非本市户籍切换相关调整,本市户籍只能选择江苏省南京市。6非本市，其他本市
$('#permanentStatus').change(function () {
    if ($('#permanentStatus').val() == "6") {
        $('#permanentSelect').cxSelect({
            url: 'js/cityData.min.js',
            selects: ['province', 'city', 'area'],
            emptyStyle: 'none'
        });
    } else {
        $('#permanentSelect').cxSelect({   //本市户口，户籍前两位默认
            url: 'js/NanJingAreaData.js',
            selects: ['province', 'city', 'area'],
            emptyStyle: 'none'
        });
    }
});

//毕业时间限定以现在申报时间往前推24个月
var now = new Date();
now.setMonth(now.getMonth() - 23);
// $('#graduateTimeS').attr("data-start-date", now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate());

// ===================================就创业信息 ===================================

//创业地址二级联动
$('#businessCompanySelect').cxSelect({
    url: 'js/NanJingRoadData.js',
    selects: ['area', 'road'],  // 数组，请注意顺序
    emptyStyle: 'none'
});

//就业地址二级联动
//直接从接口里取，暂时不联动
//$('#employmentCompanySelect').cxSelect({
//url: 'js/NanJingRoadData.js',
//selects: ['area', 'road'],  // 数组，请注意顺序
//emptyStyle: 'none'
//});

//设置单位性质
handleCompanyType();

//就创业切换
changeEmployType();

//切换 就业/创业 信息
$('#employType').change(changeEmployType);


//切换 就业/创业 信息
function changeEmployType() {
    if ($('#employType').val() == "1") {
        $('#startBusiness').hide().removeClass('validate[required,maxSize[50]]');
        $('#company').show().find('input').addClass('validate[required,maxSize[50]]');
        if ($('#companyType option[value="4"]').length == 0) {
            $('#companyType option[value="6"]').before('<option value="4">机关</option>');
        }
        if ($('#companyType option[value="5"]').length == 0) {
            $('#companyType option[value="6"]').before('<option value="5">事业单位</option>');
        }
    } else if ($('#employType').val() == "2") {
        $('#company').hide().removeClass('validate[required,maxSize[50]]');
        ;
        $('#startBusiness').show().find('input').addClass('validate[required,maxSize[50]]');
        $('#companyType option[value="4"]').remove();
        $('#companyType option[value="5"]').remove();
    } else {
        $('#startBusiness').hide().removeClass('validate[required,maxSize[50]]');
        $('#company').hide().removeClass('validate[required,maxSize[50]]');
    }
}

//设置单位性质
function handleCompanyType() {
    var type = $('#unitType').val();
    if (type == "企业") {
        $('#companyType').val("1");
    } else if (type == "民办非企业") {
        $('#companyType').val("2");
    } else if (type == "社团") {
        $('#companyType').val("3");
    } else if (type == "机关") {
        $('#companyType').val("4");
    } else if (type == "事业") {
        $('#companyType').val("5");
    } else if (type == "个体工商户") {
        $('#companyType').val("6");
    }
}

// 	===================================家庭成员 ====================================

//增加子女信息
$('#addChildInfo').click(function () {
    var html = '<div class="row line-space applyChild">' +
        '<div class="span1"><label><span class="required-flag">*</span>子女</label></div>' +
        '<div class="span4"><label>姓名&nbsp&nbsp</label><input type="text" class="childName validate[required,maxSize[10]] disableAll"/></div>' +
        '<div class="span4"><label>身份证号&nbsp&nbsp</label><input type="text" class="childID validate[required,custom[chinaIdLoose],maxSize[18]] disableAll"/></div>' +
        //'<div class="span1"><label class="checkbox"> <input type="checkbox" class="isNoFamily"> 无</label></div>'+
        '</div>';
    $(html).insertBefore($(this).parent());
    if ($('.applyChild').length >= 5) {
        $(this).parent().hide();
    }
});


//家庭信息，有无开关
$(".isNoFamily").click(function () {
    if ($(this).is(':checked')) {
        // $("#fatherName").attr("disabled",true);
        // $("#fatherID").attr("disabled",true);
        $(this).parent().parent().parent().children('.span4').children('input').attr("disabled", true);
        //置为无
        $(this).parent().parent().parent().children('.span4').children('input').val("无");
        //去除验证
        $(this).parent().parent().parent().children('.span4').children('input').validationEngine("detach");
    } else {
        // $("#fatherName").attr("disabled",false);
        // $("#fatherID").attr("disabled",false);
        $(this).parent().parent().parent().children('.span4').children('input').attr("disabled", false);
        //清空
        $(this).parent().parent().parent().children('.span4').children('input').val("");
        //恢复验证
        $(this).parent().parent().parent().children('.span4').children('input').validationEngine("attach");
    }
});


//有无子女开关
$(".isNoChild").click(function () {
        if ($(this).is(':checked')) {
            $(".applyChild").children('.span4').children('input').attr("disabled", true);
            //清空
            $(".applyChild").children('.span4').children('input').val("");
            //去除验证
            $(".applyChild").children('.span4').children('input').validationEngine("detach");
        } else {
            $(".applyChild").children('.span4').children('input').attr("disabled", false);
            //恢复验证
            $(".applyChild").children('.span4').children('input').validationEngine("attach");
        }
    }
);


//婚姻状态和家庭信息联动
//未婚离异丧偶无配偶
$("#graduateMaritalStatus").change(function () {
    //未婚
    if ($(this).val() == '1' || $(this).val() == '3' || $(this).val() == '4') {
        //配偶行全关闭
        $("#mateName").attr("disabled", true);
        $("#mateID").attr("disabled", true);
        $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("disabled", true);
        $("#mateName").val("无");
        $("#mateID").val("无");

        //子女行全关闭
        //$(".childName").attr("disabled",true);
        //$(".childID").attr("disabled",true);
        //$(".childID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("checked","checked");
        //$(".childID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("disabled",true);

    } else
    //恢复未选择状态
    {
        //配偶行全开放
        $("#mateName").attr("disabled", false);
        $("#mateID").attr("disabled", false);
        $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("disabled", false);
        $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", false);
        $("#mateName").val("");
        $("#mateID").val("");

        //子女行全开放
        //$(".childName").attr("disabled",false);
        //$(".childID").attr("disabled",false);
        //$(".childID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("disabled",false);
        //$(".childID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").attr("checked","");

    }
});
// 	===================================租房情况 ====================================

//租房地址二级联动
$('#rentHouseSelect').cxSelect({
    url: 'js/NanJingRoadData.js',
    selects: ['area', 'road'],  // 数组，请注意顺序
    emptyStyle: 'none'
});

//申报月（当前月）与租房月份时间限制
//租房开始的月份大于申报月
var tmp = new Date();
tmp.setMonth(tmp.getMonth() + 2);
var now = new Date(tmp.getFullYear(), tmp.getMonth(), 0);
$("#RentBeginLimit").val(now.getFullYear() + "-" + now.getMonth() + "-" + 01);

//租房结束的月份小于申报月
$("#RentEndLimit").val(now.getFullYear() + "-" + now.getMonth() + "-" + now.getDate());

// 	===================================审核资料上传 =================================

//是否为海外学历
$("#isAbroad").click(function () {
    if ($(this).is(":checked")) {
        $("#overseasEducationInfo").show();
        $("#EducationInfo").hide();
        $("#diplomaAtta").children("input").attr("disabled", true);
        //上传文件按钮灰化,无法点击
        $("#diplomaAtta").children(".fileinput-button").addClass("btn-inverse");
        $("#diplomaAtta").children(".fileinput-button").children("input").prop("disabled", true);

        //清空国内证书
        $("#diplomaAtta").children("input").val("");
        $("#EducationInfo").children("input").val("");

        //删除国内已上传的附件
        $("#diplomaAtta").children(".fileArea").children("div").remove();

        //去除毕业证书必填检查
        $("#diplomaAtta").children("input").validationEngine("detach");
        //去除国内证书必填检查
        $("#EducationInfo").children("input").validationEngine("detach");
        //去除国内证书附件必填检查


        //开启海外证书必填检查
        $("#overseasEducationInfo").children("input").validationEngine("attach");


    } else {
        $("#overseasEducationInfo").hide();
        $("#EducationInfo").show();
        $("#diplomaAtta").children("input").attr("disabled", false);
        //上传文件按钮恢复点击
        $("#diplomaAtta").children(".fileinput-button").removeClass("btn-inverse");
        $("#diplomaAtta").children(".fileinput-button").children("input").prop("disabled", false);

        //清空海外证书
        $("#overseasEducationInfo").children("input").val("");
        //恢复毕业证书必填检查
        $("#diplomaAtta").children("input").validationEngine("attach");
        //恢复国内证书必填检查
        $("#EducationInfo").children("input").validationEngine("attach");
        //关闭海外证书必填价差
        $("#overseasEducationInfo").children("input").validationEngine("detach");
    }
});

//上传文件按钮无法点击灰化
$('.chooseFile:disabled').parent().addClass("btn-inverse");

//上传文件数量限制对应表
var fileMaxNum = {
    "diplomaAtta": "5",
    "certificationAtta": "5",
    "renthouseContractAtta": "48",
    "renthouseInvoiceAtta": "24"
};

//上传文件
$('.chooseFile').fileupload({
    dataType: 'json',
    done: function (e, data) {
        alert("hh");
        var fileName = data.files[0].name;
        /*if (data.result.result == "success") {*/
            var href = data.result.filePath;
            var html = '<div>' +
                '<p class="fileName">' + fileName + '</p>' +
                '<span class="delFile btn btn-danger btn-mini disableAll newAddFile" data-href="' + href + '" style="cursor:pointer;margin-left:5%;margin-bottom: 2px;">删除</span>' +
                '<a class="btn btn-success btn-mini" href="' + href.replace('/mnt/UploadFiles', 'http://58.213.141.220:10049/test') + '" data-lightbox="1111" data-title="附件上传预览" style="cursor:pointer;margin-bottom:2px;margin-left:5px;">预览</a>' +
                '</div>';

            var $fileArea = $(e.target).parent().parent().find(".fileArea");
            var uploaded = false;
            $fileArea.find('.fileName').each(function () {
                if ($(this).text() == fileName) {
                    uploaded = true;
                }
            });
            if (!uploaded) {
                $(html).appendTo($fileArea);
            }
            var maxSize = fileMaxNum[$fileArea.parent().attr("id")];
            if ($fileArea.find('.newAddFile').length >= 5 || $fileArea.find('.delFile').length >= maxSize) {
                $fileArea.next().hide();
            }
        /*} else if (data.result.result == "err") {
            layer.msg(data.result.message);
        }*/

    },
    fail: function (e, data) {
        if (data.files[0].size > 5242880) {
            layer.msg("上传的文件大小不能超过5M！");
        } else {
            layer.msg(data.files[0].name + " 上传失败，请重试。");
        }

    }
});

//绑定删除按钮的点击事件
$(".fileArea").delegate(".delFile", "click", function () {
    if (!$('#submit').prop("disabled")) {
        $fileArea = $(this).parent().parent();
        $(this).parent().remove();
        var maxSize = fileMaxNum[$fileArea.parent().attr("id")];
        if ($fileArea.find('.newAddFile').length < 5 || $fileArea.find('.delFile').length < maxSize) {
            $fileArea.next().show();
        }
    }
});


// ==================================全局逻辑判断：=====================================================================
// 	=================================申请资格判断=================================
//申请资格判断
if ($('#respStatus').val() == "-1") {
    setTimeout(function () {

        //自动勾选海外学历
        isAbroad();
        //自动勾选家庭信息
        if ($('#mateName').val() == '' && $('#mateID').val() == '' || $('#mateName').val() == '无' && $('#mateID').val() == '无') {
            $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#motherName').val() == '' && $('#motherID').val() == '' || $('#motherName').val() == '无' && $('#motherID').val() == '无') {
            $("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#fatherName').val() == '' && $('#fatherID').val() == '' || $('#fatherName').val() == '无' && $('#fatherID').val() == '无') {
            $("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        var isNoChild = true;
        $('.applyChild').each(function () {
            if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
                isNoChild = false;
            }
        });
        $(".isNoChild").prop("checked", isNoChild);

        //关闭不可编辑项
        $('.disableAll').prop("disabled", true);
        //上传按钮灰化
        $(".btn-danger").addClass("btn-inverse");
        $(".btn-info").addClass("btn-inverse");
        //地址不可修改
        $('#permanentShow').show();
        $('#permanentSelect').hide();
        $('#residentialShow').show();
        $('#residentialSelect').hide();
        $('#rentHouseShow').show();
        $('#rentHouseSelect').hide();

        layer.alert('很抱歉，您不具备申请资格!<br/><br/>可能的原因如下：<br/>(1) 劳动合同未备案<br/>(2) 暂未缴纳企业职工养老保险<br/>(3) 暂未拿到社保卡，系统查无记录，<br/>&nbsp;&nbsp;&nbsp;&nbsp;请等下月数据刷新后再试。', {closeBtn: 0}, function () {
            setTimeout(function () {
                window.location.href = "../";
            }, 500);
        });
    }, 500);
}

//  =================================判断页面是否可以编辑=================================

//页面类型处理userStatus.修改(4上月已申请通过)/申请(2没有记录，3审核不通过)/查看(1这月已提交申请)
//修改： 只能修改租房信息。 审核中： 全都不能修改。申请：所有字段为空，全部能修改。
//    if ($('#userStatus').val() == "1" || $('#userStatus').val() == "4" )
//    {
//    	//处理海外证书显示
//    	isAbroad();
//    	//判断页面是否可以修改
//        //仅用户本月存在记录（userStatus = 1）并且changeable = 1，才可编辑
//        if($($('#userStatus').val() == "1" && '#changeable').val() == 1)
//        {
//        	//自动勾选家庭成员有无开关
//            if($('#mateName').val() == '' &&  $('#mateID').val() == '' || $('#mateName').val() == '无' &&  $('#mateID').val() == '无')
//            {
//            	$("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//            if($('#motherName').val() == '' &&  $('#motherID').val() == '' || $('#motherName').val() == '无' &&  $('#motherID').val() == '无')
//            {
//            	$("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//            if($('#fatherName').val() == '' &&  $('#fatherID').val() == '' || $('#fatherName').val() == '无' &&  $('#fatherID').val() == '无')
//            {
//            	$("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//            var isNoChild = true;
//            $('.applyChild').each(function(){
//	            if($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '')
//	            {
//	            	isNoChild = false;
//	            }
//    		});
//    		$(".isNoChild").prop("checked",isNoChild);
//
//        }else
//        {
//            //自动勾选家庭成员有无开关
//            if($('#mateName').val() == '' &&  $('#mateID').val() == '' || $('#mateName').val() == '无' &&  $('#mateID').val() == '无')
//            {
//            	$("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//            if($('#motherName').val() == '' &&  $('#motherID').val() == '' || $('#motherName').val() == '无' &&  $('#motherID').val() == '无')
//            {
//            	$("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//            if($('#fatherName').val() == '' &&  $('#fatherID').val() == '' || $('#fatherName').val() == '无' &&  $('#fatherID').val() == '无')
//            {
//            	$("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked",true);
//            }
//
//            var isNoChild = true;
//            $('.applyChild').each(function(){
//	            if($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '')
//	            {
//	            	isNoChild = false;
//	            }
//    		});
//    		$(".isNoChild").prop("checked",isNoChild);
//
//            //关闭不可编辑项
//            $('.disableAll').prop("disabled", true);
//            //上传按钮灰化
//            $(".btn-danger").addClass("btn-inverse");
//            $(".btn-info").addClass("btn-inverse");
//            //地址不可修改
//            $('#permanentShow').show();
//            $('#permanentSelect').hide();
//            $('#residentialShow').show();
//            $('#residentialSelect').hide();
//            //就创业地址暂时从接口里取，不联动
//            //$('#employmentCompanyShow').show();
//            //$('#employmentCompanySelect').hide();
//            //$('#businessCompanyShow').show();
//            //$('#businessCompanySelect').hide();
//            $('#rentHouseShow').show();
//            $('#rentHouseSelect').hide();
//            //修改是可以更新租房信息
//            if($('#userStatus').val() == "4")
//            {
//                $('#residentialShow').hide();
//                $('#residentialSelect').show();
//                $('#rentHouseShow').hide();
//                $('#rentHouseSelect').show();
//                $('.updateRent').prop("disabled", false);
//            }
//        }
//
//    }
$(function () {
    //四类情况，全部可编辑，全部不可，部分可编辑，重新申请
    var userStatus = $('#userStatus').val();
    //全部可编辑
    if (userStatus == '0' || userStatus == '6' || userStatus == '2') {
        //自动勾选海外学历
        isAbroad();
        //自动勾选家庭信息
        if ($('#mateName').val() == '无' && $('#mateID').val() == '无') {
            $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
            $("#mateID").parent().parent().find(":text").prop("disabled", true);
            $("#mateID").parent().parent().find(":text").validationEngine("detach");
        }
        if ($('#motherName').val() == '无' && $('#motherID').val() == '无') {
            $("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
            $("#motherID").parent().parent().find(":text").prop("disabled", true);
            $("#motherID").parent().parent().find(":text").validationEngine("detach");
        }
        if ($('#fatherName').val() == '无' && $('#fatherID').val() == '无') {
            $("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
            $("#fatherID").parent().parent().find(":text").prop("disabled", true);
            $("#fatherID").parent().parent().find(":text").validationEngine("detach");

        }
        //如果不是编辑，而是编辑新申请
        if (userStatus == '1') {
            var isNoChild = true;
            $('.applyChild').each(function () {
                if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
                    isNoChild = false;
                }
            });

            $(".isNoChild").prop("checked", isNoChild);
            $(".applyChild :text").prop("disabled", true);
            $(".applyChild :text").validationEngine("detach");
        }

    }
    //全部不可编辑
    else if (userStatus == '4' || userStatus == '5') {
        //自动勾选海外学历
        isAbroad();
        //自动勾选家庭信息
        if ($('#mateName').val() == '' && $('#mateID').val() == '' || $('#mateName').val() == '无' && $('#mateID').val() == '无') {
            $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#motherName').val() == '' && $('#motherID').val() == '' || $('#motherName').val() == '无' && $('#motherID').val() == '无') {
            $("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#fatherName').val() == '' && $('#fatherID').val() == '' || $('#fatherName').val() == '无' && $('#fatherID').val() == '无') {
            $("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        var isNoChild = true;
        $('.applyChild').each(function () {
            if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
                isNoChild = false;
            }
        });
        $(".isNoChild").prop("checked", isNoChild);

        //关闭不可编辑项
        $('.disableAll').prop("disabled", true);
        //上传按钮灰化
        $(".btn-danger").addClass("btn-inverse");
        $(".btn-info").addClass("btn-inverse");
        //地址不可修改
        $('#permanentShow').show();
        $('#permanentSelect').hide();
        $('#residentialShow').show();
        $('#residentialSelect').hide();
        $('#rentHouseShow').show();
        $('#rentHouseSelect').hide();

    }
    //部分可编辑(合同变更)
    else if (userStatus == '3') {
        //自动勾选海外学历
        isAbroad();
        //自动勾选家庭信息
        if ($('#mateName').val() == '' && $('#mateID').val() == '' || $('#mateName').val() == '无' && $('#mateID').val() == '无') {
            $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#motherName').val() == '' && $('#motherID').val() == '' || $('#motherName').val() == '无' && $('#motherID').val() == '无') {
            $("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#fatherName').val() == '' && $('#fatherID').val() == '' || $('#fatherName').val() == '无' && $('#fatherID').val() == '无') {
            $("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        var isNoChild = true;
        $('.applyChild').each(function () {
            if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
                isNoChild = false;
            }
        });
        $(".isNoChild").prop("checked", isNoChild);

        //关闭不可编辑项
        $('.disableAll').prop("disabled", true);
        //上传按钮灰化
        $(".btn-danger").addClass("btn-inverse");
        $(".btn-info").addClass("btn-inverse");
        //地址不可修改
        $('#permanentShow').show();
        $('#permanentSelect').hide();
        $('#residentialShow').show();
        $('#residentialSelect').hide();
        $('#rentHouseShow').show();
        $('#rentHouseSelect').hide();

        //允许开放的部分
        $('#residentialShow').hide();
        $('#residentialSelect').show();
        $('#rentHouseShow').hide();
        $('#rentHouseSelect').show();
        $('#contractId').hide();
        $('#contractId').show();
        $('.updateRent').prop("disabled", false);
        $('.updateInvoice').prop("disabled", false);

        $("#renthouseContractAtta .delFile").prop("disabled", false);
        $("#renthouseContractAtta .btn-danger").removeClass("btn-inverse");
        $("#renthouseContractAtta .btn-info").removeClass("btn-inverse");

        $("#renthouseInvoiceAtta .delFile").prop("disabled", false);
        $("#renthouseInvoiceAtta input").prop("disabled", false);
        $("#renthouseInvoiceAtta .btn-danger").removeClass("btn-inverse");
        $("#renthouseInvoiceAtta .btn-info").removeClass("btn-inverse");

        layer.alert('变更的发票与合同期限必须含有当月', {closeBtn: 0}, function (index) {
            layer.close(index);
        });
    }
    //不允许编辑
    else {
        //自动勾选海外学历
        isAbroad();
        //自动勾选家庭信息
        if ($('#mateName').val() == '' && $('#mateID').val() == '' || $('#mateName').val() == '无' && $('#mateID').val() == '无') {
            $("#mateID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#motherName').val() == '' && $('#motherID').val() == '' || $('#motherName').val() == '无' && $('#motherID').val() == '无') {
            $("#motherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        if ($('#fatherName').val() == '' && $('#fatherID').val() == '' || $('#fatherName').val() == '无' && $('#fatherID').val() == '无') {
            $("#fatherID").parent().parent().children(".span1").children(".checkbox").children(":checkbox").prop("checked", true);
        }
        var isNoChild = true;
        $('.applyChild').each(function () {
            if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
                isNoChild = false;
            }
        });
        $(".isNoChild").prop("checked", isNoChild);

        //关闭不可编辑项
        $('.disableAll').prop("disabled", true);
        //上传按钮灰化
        $(".btn-danger").addClass("btn-inverse");
        $(".btn-info").addClass("btn-inverse");
        //地址不可修改
        $('#permanentShow').show();
        $('#permanentSelect').hide();
        $('#residentialShow').show();
        $('#residentialSelect').hide();
        $('#rentHouseShow').show();
        $('#rentHouseSelect').hide();
    }

});


// 	 ================================判断必填项==========================================

//检查承诺勾选
function checkPromise() {
    if (!$('#readAndPromise').prop('checked')) {
        layer.msg('请阅读并承诺提供材料的真实性');
        return false;
    }
    return true;
}

//检查所有附件必须上传
function checkUploadFiles() {

    var fileCheckArea = $('.area-frame');

    //不检查隐藏的栏目
    $('.area-frame').each(function () {
        if ($(this).is(":hidden")) {
            fileCheckArea = $(fileCheckArea).not('#' + $(this).attr("id"));
        }
    });

    //不检查灰化的栏目
    $(".chooseFile").each(function () {
        //如果存在上传灰化,则不检查该栏
        if ($(this).prop('disabled')) {
            var id = $(this).parent().parent().attr("id")
            fileCheckArea = $(fileCheckArea).not('#' + id);
        }
    });

    var isAllUpload = true;
    fileCheckArea.each(function () {
        if ($(this).find('.delFile').length == 0) {
            isAllUpload = false;
        }
        ;
    });
    return isAllUpload;
}

function isAbroad() {
    var certificationCode = $("#certificationCode").val();
    if (certificationCode.substring(0, 4) == '教留服认') {
        $("#isAbroad").prop("checked", true);
        $("#overseasEducationInfo").show();
        $("#EducationInfo").hide();


        //设置海外证书
        var node = $("#overseasEducationInfo").children("input");
        var code = $("#certificationCode").val().substring(4).replace('[', ']').split(']');
        $(node[0]).val(code[0]);
        $(node[1]).val(code[1]);
        $(node[2]).val(code[2].replace('号', ''));

        //上传文件按钮灰化,无法点击
        $("#diplomaAtta").children("input").attr("disabled", true);
        $("#diplomaAtta").children(".fileinput-button").addClass("btn-inverse");
        $("#diplomaAtta").children(".fileinput-button").children("input").prop("disabled", true);

        //清空国内证书
        $("#diplomaAtta").children("input").val("");
        $("#EducationInfo").children("input").val("");

        //删除国内已上传的附件
        $("#diplomaAtta").children(".fileArea").children("div").remove();

        //去除毕业证书必填检查
        $("#diplomaAtta").children("input").validationEngine("detach");
        //去除国内证书必填检查
        $("#EducationInfo").children("input").validationEngine("detach");
        //去除国内证书附件必填检查


        //开启海外证书必填检查
        $("#overseasEducationInfo").children("input").validationEngine("attach");
    }
}

//  ================================封装json以及向后台提交===============================

//表单提交
$('#submit').click(submitHandler);


//表单提交总函数
function submitHandler(e) {
    e.preventDefault();
    if (!checkPromise()) {
        return false
    }
    ;
    if (!$('#applyInfo').validationEngine('validate')) {
        return false;
    }
    ;
    if (!checkUploadFiles()) {
        layer.msg('上传的审核资料不全，请补全！', {time: 3000, icon: 5});
        return false;
    }

    var applyWayRecord = $("#applyWayRecord").val();
    if (applyWayRecord == 'filing') {
        var contractId = $('#contractId').val();
        var contractArea = $('#contractArea').val();
        if (checkFilingValid(contractArea, contractId)) {
            getSubmitdata();
            console.log(JSON.stringify(submitData));
            layer.confirm('请确认填写的信息属实，内容无误', {
                title: '提醒',
                btn: ['提交', '返回'] //按钮
            }, ajaxSubmitFiling, function (index) {
                layer.close(index);
            });
        }
    } else {
        getSubmitdata();
        console.log(JSON.stringify(submitData));
        layer.confirm('请确认填写的信息属实，内容无误', {
            title: '提醒',
            btn: ['提交', '返回'] //按钮
        }, ajaxSubmit, function (index) {
            layer.close(index);
        });
    }
};

//初始化json
var submitData = {};

//ajax请求发送函数
function ajaxSubmit() {
    $.ajax({
        type: 'POST',
        url: 'InsertRentHouseDeclareNew',
        data: {'rentHouseInfo': JSON.stringify(submitData)},
        dataType:'text',
        async: false,//是否异步
        error: function (request) {
            console.log(request);
            layer.msg('网络异常，请稍后重试', {time: 2000, icon: 6})
        },
        success: function (data) {
            if(data){
                data = JSON.parse(data);
                if(data.head.rst.busiCode === '0000'){
                    layer.msg('已经成功提交申报信息，请耐心等待审核！', {time: 2000, icon: 6});
                    var resultUrl = $('#leftNav .result').attr('href');
                    setTimeout(function () {
                        window.location.href = resultUrl;
                    }, 2000);
                } else {
                    layer.msg(data.head.rst.info, {time: 2000, icon: 6});
                }
            } else {
                layer.msg("请求失败，请稍后重试", {time: 2000, icon: 6});
            }
        }
    });
}

function ajaxSubmitFiling() {
    $.ajax({
        type: 'POST',
        url: 'InsertRentHouseDeclareFiling',
        data: {'rentHouseInfo': JSON.stringify(submitData)},
        dataType:'text',
        async: false,//是否异步
        error: function (request) {
            console.log(request);
            layer.msg('网络异常，请稍后重试', {time: 2000, icon: 6})
        },
        success: function (data) {
            if(data){
                data = JSON.parse(data);
                if(data.head.rst.busiCode === '0000'){
                    layer.msg('已经成功提交申报信息，请耐心等待审核！', {time: 2000, icon: 6});
                    var resultUrl = $('#leftNav .result').attr('href');
                    setTimeout(function () {
                        window.location.href = resultUrl;
                    }, 2000);
                } else {
                    layer.msg(data.head.rst.info, {time: 2000, icon: 6});
                }
            } else {
                layer.msg("请求失败，请稍后重试", {time: 2000, icon: 6});
            }
        }
    });
}

//将页面信息封装为json
function getSubmitdata() {
    getSimpleInput();
    getFamilyInfo();
    getImageInfo();
    getAttaCode();
    console.log(submitData);
}


//获取基本信息
function getSimpleInput() {
    $('.submitData').each(function () {
        var id = $(this).attr("id");
        var value = $(this).val();
        if (value != null) {
            value = value.replace(/[\*<>&=]/g, "");
        }
        submitData[id] = value;
    });
    handleCompanyMsg();
}


//获取就业创业信息
//如果是就业，就把创业信息去除，反之同理
function handleCompanyMsg() {
    if (submitData['employType'] == "1") {
        submitData['businessStartCompany'] = "";
        submitData['businessStartRegicode'] = "";
        submitData['businessCompanyArea'] = "";
        submitData['businessCompanyStreet'] = "";
        submitData['businessCompanyAdress'] = "";
    } else if (submitData['employType'] == "2") {
        submitData['employmentCompany'] = "";
        submitData['employmentCompanyArea'] = "";
        submitData['employmentCompanyStreet'] = "";
        submitData['employmentCompanyAdress'] = "";
    }
}

//获取家属信息
function getFamilyInfo() {
    var familyList = [];
    var selfID = $('#sociateCardId').val();

    if ($('#fatherName').val() != '' || $('#fatherID').val() != '') {
        var fatherInfo = {};
        fatherInfo['relation'] = "1";
        fatherInfo['socialID'] = selfID;
        fatherInfo['memberName'] = $('#fatherName').val() != null ? $('#fatherName').val().replace(/[\*<>&=]/g, "") : null;
        fatherInfo['memberIdentifierId'] = $('#fatherID').val() != null ? $('#fatherID').val().replace(/[\*<>&=]/g, "") : null;
        familyList.push(fatherInfo);
    }
    if ($('#motherName').val() != '' || $('#motherID').val() != '') {
        var motherInfo = {};
        motherInfo['relation'] = "2";
        motherInfo['socialID'] = selfID;
        motherInfo['memberName'] = $('#motherName').val() != null ? $('#motherName').val().replace(/[\*<>&=]/g, "") : null;
        motherInfo['memberIdentifierId'] = $('#motherID').val() != null ? $('#motherID').val().replace(/[\*<>&=]/g, "") : null;
        familyList.push(motherInfo);
    }
    if ($('#mateName').val() != '' || $('#mateID').val() != '') {
        var mateInfo = {};
        mateInfo['relation'] = "3";
        mateInfo['socialID'] = selfID;
        mateInfo['memberName'] = $('#mateName').val() != null ? $('#mateName').val().replace(/[\*<>&=]/g, "") : null;
        mateInfo['memberIdentifierId'] = $('#mateID').val() != null ? $('#mateID').val().replace(/[\*<>&=]/g, "") : null;
        familyList.push(mateInfo);
    }
    $('.applyChild').each(function () {
        if ($(this).find('.childName').val() != '' || $(this).find('.childID').val() != '') {
            var childInfo = {};
            childInfo['relation'] = "4";
            childInfo['socialID'] = selfID;
            childInfo['memberName'] = $(this).find('.childName').val() != null ? $(this).find('.childName').val().replace(/[\*<>&=]/g, "") : null;
            childInfo['memberIdentifierId'] = $(this).find('.childID').val() != null ? $(this).find('.childID').val().replace(/[\*<>&=]/g, "") : null;
            familyList.push(childInfo);
        }
    });

    var isNoFather = $("#fatherName").parent().parent().children(".span1").children(".checkbox").children("input").is(':checked');
    var isNoMother = $("#motherName").parent().parent().children(".span1").children(".checkbox").children("input").is(':checked');
    var isNoMate = $("#mateName").parent().parent().children(".span1").children(".checkbox").children("input").is(':checked');
    var isNoChild = $(".isNoChild").is(':checked');


    submitData['familyList'] = familyList;
    submitData['isNoFather'] = isNoFather;
    submitData['isNoMother'] = isNoMother;
    submitData['isNoMate'] = isNoMate;
    submitData['isNoChild'] = isNoChild;

}


//获取附件信息
function getImageInfo() {
    $('.area-frame').each(function () {
        var fileString = '';
        $(this).find('.delFile').each(function () {
            fileString += $(this).data('href') + ';';
        });
        submitData[$(this).attr('id')] = fileString;
    });
}

function getToday() {
    var date = new Date();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}

function deleteFilediv(filePath) {
    $('.delFile').each(function () {
        if (filePath == $(this).data("href")) {
            $(this).parent().remove();
        }
    });
}

//获取附件证书及发票编号
function getAttaCode() {
    var certificationCode = "";
    var isAbroad = $("#isAbroad").is(":checked");
    if (isAbroad) {
        var node = $("#overseasEducationInfo").children("input");
        certificationCode = '教留服认' + $(node[0]).val() + '[' +
            $(node[1]).val() + ']' +
            $(node[2]).val() + '号';
    }
    else {
        certificationCode = $("#certificationCode").val();
    }


    submitData['diplomaCode'] = $("#diplomaCode").val();
    submitData['certificationCode'] = certificationCode;
    submitData['invoiceCode'] = $("#invoiceCode").val();
    submitData['invoiceNumber'] = $("#invoiceNumber").val();
    submitData['insuranceCode'] = $("#insuranceCode").val();

    submitData['isAbroad'] = isAbroad;


}


//  ==================================验证备案号是否可用================================================================================
function checkFilingValid(contractArea, contractId) {
    var result = false;
    $.ajax({
        type: 'POST',
        url: 'checkContractIdValid?contractId=' + contractId + "&contractArea=" + encodeURIComponent(encodeURIComponent(contractArea)),
        async: false,//是否异步
        error: function (request) {
            alert('error: 获取备案信息失败');
        },
        success: function (data) {
            if (data == false) {
                layer.msg('取不到备案号对应的信息！', {time: 3000, icon: 5});
                result = false;
            } else {
                result = true;
            }
        }
    });
    return result;
}

$(function () {
    var applyWay = $('#applyWay').val();
    if (applyWay == 'filing') {
        $(".rentApply").hide();
        $(".filingApply").show();
        $("input:radio:last").attr("checked", "true");
        $("#applyWayRecord").attr('value', 'filing');
    } else {
        $(".filingApply").hide();
        $(".rentApply").show();
        $("input:radio:first").attr("checked", "true")
        $("#applyWayRecord").attr('value', 'rent');
    }
});

$(function () {
    var userStatus = $("#userStatus").val();
    if (userStatus == '2') {
        $("input:radio:first").attr('disabled', true);
        $("input:radio:last").attr('disabled', true);
    } else {
        $("input[name='applyWayRadio']").change(function () {
            var val = $('input:radio[name="applyWayRadio"]:checked').val();
            if (val == 'rent') {
                $(".filingApply").hide();
                $(".rentApply").show();
                $("#applyWayRecord").attr('value', 'rent');
            } else {
                $(".rentApply").hide();
                $(".filingApply").show();
                $("#applyWayRecord").attr('value', 'filing');
            }
        });
    }
});

//  ================================插件初始化===========================================

//日期控件
$('.data-select').cxCalendar();
$('.data-select').blur(function () {
    $(this).attr('value', getToday());
});
//表单验证插件
$('#applyInfo').validationEngine();




