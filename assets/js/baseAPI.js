// jQuery配置了一个方法 ajaxPrefilter 可以获取到ajax请求的配置对象
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;

  // console.log(options.url);
  // headers 配置的请求头对象
  if (options.url.includes("/my/")) {
    options.headers = {
      Authorization: localStorage.getItem("token") || "",
    };

    // 当请求有权限的接口时，如果请求失败则强制退出
    options.complete = function (res) {
      if (
        res.responseJSON.status === 1 &&
        res.responseJSON.message === "身份认证失败！"
      ) {
        //  强制清空token值
        localStorage.removeItem("token");
        //   页面跳转到登录页面
        location.href = "login.html";
      }
    };
  }
});
