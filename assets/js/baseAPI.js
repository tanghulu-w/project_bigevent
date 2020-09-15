// jQuery配置了一个方法 ajaxPrefilter 可以获取到ajax请求的配置对象
$.ajaxPrefilter(function (options) {
  options.url = "http://ajax.frontend.itheima.net" + options.url;
  console.log(options.url);
});
