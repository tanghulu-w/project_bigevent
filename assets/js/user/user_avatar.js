$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 当点击上传按钮时实现文件上传
  $("#chooseImage").on("click", function () {
    $("#file").click();
  });

  // 上传的有文件时获取到文件的信息
  $("#file").on("change", function (e) {
    console.log(e);
    var filelist = e.target.files;
    if (filelist.length < 1) {
      return layui.layer.msg("请选择上传文件！");
    }
    //   1、更换裁剪的图片
    //  拿到用户上传的图片
    var file = e.target.files[0];
    //   根据选择文件，创建一个对应的URL地址
    var newImgURL = URL.createObjectURL(file);
    $image
      .cropper("destroy") // 销毁旧的裁剪区域
      .attr("src", newImgURL) // 重新设置图片路径
      .cropper(options); // 重新初始化裁剪区域
  });

  $("#addAvatar").on("click", function () {
    var img = $("#image").prop("src");
    if ($("#image").prop("src").includes("sample.jpg")) {
      return layui.layer.msg("请选择文件！");
    }
    var dataURL = $image
      .cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
      })
      .toDataURL("image/png"); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

    // 点击确定发起更换头像的请求
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: { avatar: dataURL },
      success: function (res) {
        console.log(res);
        if (res.status !== 0) {
          return layui.layer.msg("更换头像失败！");
        }
        layui.layer.msg("更换头像成功！");
        //   渲染头像
        window.parent.getUserInfo();
      },
    });
  });
});
