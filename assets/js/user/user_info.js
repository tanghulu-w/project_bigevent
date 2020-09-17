$(function () {
  var form = layui.form;

  // 验证昵称
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return "长度必须在2~6个字符之间";
      }
    },
  });

  initUserInfo();
  // 获取用户信息-----初始化用户信息
  function initUserInfo() {
    $.ajax({
      type: "GET",
      url: "/my/userinfo",
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        //   console.log(res);
        // layui 提供的快速填充表单元素的值，表单的name属性要与res.data里的对象属性对应
        form.val("formTest", res.data);
      },
    });
  }

  // 点击重置按钮时，用户的信息回到填写之前
  $("#btnReset").on("click", function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();
    initUserInfo();
  });

  // 提交修改的按钮，用户资料更新，用户的用户名和头像对应改变
  $("#form_userInfo").on("submit", function (e) {
    //  阻止表单的默认提交行为
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg("修改成功！");
        //  调用父页面的方法,渲染个人中心欢迎词和用户头像
        window.parent.getUserInfo();
      },
    });
  });
});
