$(function () {
  // 自定义密码校验规则
  var form = layui.form;
  form.verify({
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    //   新密码与原密码不能一样
    newPwd: function (value) {
      if (value === $("[name=oldPwd]").val()) {
        return "新密码与原密码不能相同！";
      }
    },
    // 确认新密码和新密码的值要相同
    reNewPwd: function (value) {
      if (value !== $("[name=newPwd]").val()) {
        return "两次密码输入不一致！";
      }
    },
  });

  // 监听表单的提交行为
  $(".layui-form").on("submit", function (e) {
    e.preventDefault();
    // 发起修改密码的请求
    $.ajax({
      type: "POST",
      url: "/my/updatepwd",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("修改密码失败!");
        }
        layui.layer.msg("修改密码成功！");
        //   清空表单内容
        $(".layui-form")[0].reset();
      },
    });
  });
});
