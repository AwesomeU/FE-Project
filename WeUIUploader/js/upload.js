(function() {
    // picture upload
    $.weui = {};
    $.weui.alert = function(options) {
        options = $.extend({
            title: '警告',
            text: '警告内容'
        }, options);
        var $alert = $('.js_dialog');
        $alert.find('.weui_dialog_title').text(options.title);
        $alert.find('.weui-dialog__bd').text(options.text);
        $alert.on('touchend click', '.weui-dialog__btn', function() {
            $alert.hide();
        });
        $alert.show();
    };

    $(function() {
        // 允许上传的图片类型  
        var allowTypes = ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'];

        var maxSize = 1024 * 1024 * 1024 * 1024 * 1024 * 1024;
        // 图片最大宽度  
        var maxWidth = 300;
        // 最大上传图片数量  
        var maxCount = 2;
        //上传文件
        var $uploaderFiles = $('.weui-uploader__files');
        //轮播图
        var $gallery = $('#gallery');
        // 轮播图图片
        var $galleryImg = $("#galleryImg");
        //轮播图
        var $gallery2 = $('#gallery2');
        // 轮播图图片
        var $galleryImg2 = $("#galleryImg2");
        // 删除文件按钮
        var $delBtn = $('.weui-icon-delete');

        $('#eg').on('click', function() {
            var that = $(this);
            $galleryImg2.attr("style", this.getAttribute("style"));
            $gallery2.fadeIn(100);
        })
        $gallery2.on("click", function() {
            $gallery2.fadeOut(100);
        });

        $('.js_file').on('change', function(event) {
            var files = event.target.files;

            if (files.length === 0) {
                return;
            }

            for (var i = 0, len = files.length; i < len; i++) {
                var file = files[i];
                var reader = new FileReader();
                // 如果类型不在允许的类型范围内  
                if (allowTypes.indexOf(file.type) === -1) {
                    $.weui.alert({
                        text: '该类型不允许上传'
                    });
                    continue;
                }

                if (file.size > maxSize) {
                    $.weui.alert({
                        text: '图片太大，不允许上传'
                    });
                    continue;
                }

                reader.onload = function(e) {
                    var img = new Image();
                    var time = new Date().getTime();
                    var fileid = "file" + time;
                    img.onload = function() {
                        var w = Math.min(maxWidth, img.width);
                        // 高度按比例计算  
                        var h = img.height * (w / img.width);
                        var canvas = document.createElement('canvas');
                        var ctx = canvas.getContext('2d');
                        // 设置 canvas 的宽度和高度  
                        canvas.width = w;
                        canvas.height = h;
                        ctx.drawImage(img, 0, 0, w, h);
                        var base64 = canvas.toDataURL('image/png');

                        // 插入到预览区  
                        var $preview = $('<li class="weui-uploader__file weui-uploader__file_status" id="' + fileid + '" style="background-image:url(' + base64 + ')"><div class="weui-uploader__file-content">0%</div></li>');
                        $uploaderFiles.append($preview);
                        var num = $('.weui-uploader__file').length;
                        $('.js_counter').text(num + '/' + maxCount);

                        $('#' + fileid).on('click', function() {
                            var that = $(this);
                            $galleryImg.attr("style", this.getAttribute("style"));
                            $gallery.fadeIn(100);
                            delBtn(that);
                        })

                        function delBtn(that) {
                            $delBtn.on("click", function() {
                                that.remove();
                                var num = $('.weui-uploader__file').length;
                                $('.js_counter').text(num + '/' + maxCount);
                            });
                        }
                        $gallery.on("click", function() {
                            $gallery.fadeOut(100);
                        });

                        var progress = 0;

                        function uploading() {
                            $preview.find('.weui-uploader__file-content').text(progress++ + '%');
                            if ($('.weui-uploader__file').length > maxCount) {
                                $.weui.alert({
                                    text: '最多只能上传' + maxCount + '张图片'
                                });
                                $('.weui-uploader__files li:last').remove();
                                $('.js_counter').text($('.weui-uploader__file').length + '/' + maxCount);
                                return false;
                            } else {
                                if (progress <= 100) {
                                    setTimeout(uploading, 30);
                                } else {
                                    //$preview.find('.weui-uploader__file-content').html('<i class="weui_icon_warn"></i>');  
                                    $preview.removeClass('weui-uploader__file_status').find('.weui-uploader__file-content').remove();
                                    var fileUpload = $("#files").get(0);
                                    var files = fileUpload.files;
                                    if (files.length > 0) {
                                        var data = new FormData();
                                        for (var i = 0; i < files.length; i++) {
                                            data.append("file", files[i]);
                                        }
                                        $('.img_upload').on('click', function() {

                                            $.ajax({
                                                url: "/springUploadKC",
                                                type: "post",
                                                contentType: false,
                                                processData: false,
                                                data: data,
                                                success: function(data) {
                                                    $.weui.alert({
                                                        text: '上传成功！'
                                                    });
                                                },
                                                error: function(data) {
                                                    $.weui.alert({
                                                        text: '上传失败！'
                                                    });
                                                }
                                            });
                                        })
                                    }
                                }
                            }
                        }
                        setTimeout(uploading, 30);
                    };
                    img.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });
    });
})()