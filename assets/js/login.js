$(function () {
  // 点击去注册账号自己隐藏，去登录显示
  $("#login_link").on("click", function () {
    // 点击去注册账号时，注册模块显示,登录模块隐藏
    $(".reg_box").show();
    $(".login_box").hide();
  });

  // 点击去登录自己隐藏，去注册账号显示
  $("#reg_link").on("click", function () {
    // 点击去登录时，注册模块隐藏,登录模块显示
    $(".reg_box").hide();
    $(".login_box").show();
  });

  // 定义一个校验规则
  var form = layui.form;
  var layer = layui.layer;
  form.verify({
    // 自定义一个密码框的校验规则
    pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
    repwd: function (value) {
      // 先获取密码框里的值，与确认密码框里的值比较
      var val = $("#reg_form [name=pwd]").val();
      if (value !== val) {
        return "两次密码输入不一致，请重新输入";
      }
    },
  });

  // 监听表单提交注册事件
  $("#reg_form").on("submit", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/api/reguser",
      data: {
        username: $("#reg_form [name=username]").val(),
        password: $("#reg_form [name=pwd]").val(),
      },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) return layer.msg(res.message);
        layer.msg("注册成功，请登录");
        // 注册成功后跳转到登录
        $("#reg_link").click();
      },
    });
  });

  // 监听表单提交登录事件
  $("#login_form").submit(function (e) {
    e.preventDefault();
    $.post(
      "/api/login",
      {
        username: $("#login_form [name=username]").val(),
        password: $("#login_form [name=pwd]").val(),
      },
      function (res) {
        if (res.status !== 0) return layer.msg(res.message);
        // 将登录成功后的token字符串存储到本地存储
        localStorage.setItem("token", res.token);
        location.href = "index.html";
      }
    );
  });
});
