$(function() {
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

    var numm = 0;
    var $gallery = $('#gallery');
    var $galleryImg = $("#galleryImg");
    var $delBtn = $('.weui-icon-delete');

    var uploader = WebUploader.create({
        auto: false,
        swf: '/js/Uploader.swf',
        server: '/WxService/springUpload',
        pick: '#imgFile',
        compress: {
            width: 1600,
            height: 1600,
            // 图片质量，只有type为`image/jpeg`的时候才有效。
            quality: 90,
            // 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
            allowMagnify: false,
            // 是否允许裁剪。
            crop: false,
            // 是否保留头部meta信息。
            preserveHeaders: true,
            // 如果发现压缩后文件大小比原来还大，则使用原来图片
            // 此属性可能会影响图片自动纠正功能
            noCompressIfLarger: false,
            // 单位字节，如果图片大小小于此值，不会采用压缩。
            compressSize: 1024 * 200
        },
        accept: {
            title: 'Images',
            extensions: 'gif,jpg,jpeg,bmp,png',
            mimeTypes: 'image/*'
        },
        method: 'POST',
        fileNumLimit: 1
    });
    uploader.on('fileQueued', function(file) {
        var $preview = $('<li class="weui-uploader__file weui-uploader__file_status" id="' + file.id + '"><div class="weui-uploader__file-content">0%</div></li>');
        $('#imgComponent').append($preview);
        uploader.makeThumb(file, function(error, src) {
            $('#' + file.id).css('background-image', 'url(' + src + ')');
        }, 100, 100);
        numm++;
        $('.js_counter').text(numm + '/' + 1);
        if (numm == 1) {
            $('.weui-uploader__input-box').hide();
        }

        $('#' + file.id).on('click', function() {
            var that = $(this);
            $galleryImg.attr("style", this.getAttribute("style"));
            $gallery.fadeIn(100);
            delBtn(that);
        })

        function delBtn(that) {
            $delBtn.on("click", function() {
                that.remove();
                uploader.removeFile(file);
                var num = $('.weui-uploader__file').length;
                $('.js_counter').text(num + '/' + 1);
                $('.weui-uploader__input-box').show();
                numm = 0
            });
        }
        $gallery.on("click", function() {
            $gallery.fadeOut(100);
        });

    });
    uploader.on('uploadProgress', function(file, percentage) {
        $('#' + file.id).find('.weui-uploader__file-content')
            .html(percentage + '%');
    });
    uploader.on('uploadSuccess', function(file, response) {
        $('#' + file.id).removeClass('weui-uploader__file_status')
            .find('.weui-uploader__file-content')
            .remove();
        uploader.reset();

        // add something.......
    });
    uploader.on('uploadError', function(file) {
        uploader.removeFile(file);
        uploader.reset();
        console.log(file)
        $.weui.alert({
            text: '图片上传失败!'
        });
    });

    $('.img_upload').on('click', function() {
        if (uploader.getFiles().length > 0) {
            uploader.upload();
        } else {
            $.weui.alert({
                text: '图片不能为空!'
            });
        }

    })
});