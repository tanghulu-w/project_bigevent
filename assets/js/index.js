$(function () {
  getUserInfo();

  // 点击退出退出当前页面，回到登录页面
  $(".btnLogout").on("click", function () {
    layer.confirm("确定是否退出登录?", { icon: 3, title: "提示" }, function (
      index
    ) {
      //do something
      // 强制清空token
      localStorage.removeItem("token");
      // 页面跳转到登录页面
      location.href = "login.html";
      layer.close(index);
    });
  });
});

// 获取用户基本信息
function getUserInfo() {
  $.ajax({
    type: "GET",
    url: "/my/userinfo",
    // headers 配置的请求头对象
    // headers: {
    //   Authorization: localStorage.getItem("token") || "",
    // },
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      console.log(res);
      // 渲染用户头像
      renderAvatar(res.data);
    },
    // complete: function (res) {
    //   console.log(res);
    //   if (
    //     res.responseJSON.status === 1 &&
    //     res.responseJSON.message === "身份认证失败！"
    //   ) {
    //     //  强制清空token值
    //     localStorage.removeItem("token");
    //     //   页面跳转到登录页面
    //     location.href = "login.html";
    //   }
    // },
  });

  // 渲染用户头像
  function renderAvatar(user) {
    var uname = user.nickname || user.username;
    $(".welcome").html("欢迎&nbsp;&nbsp;&nbsp;" + uname);
    if (user.user_pic !== null) {
      $(".layui-nav-img").prop("src", user.user_pic).show();
      $(".text_avatar").hide();
    } else {
      var text = uname[0].toUpperCase();
      $(".layui-nav-img").hide();
      $(".text_avatar").html(text).show();
    }
  }
}
