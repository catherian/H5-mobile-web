$(".index-c").on('touchstart',function(){
    $(".index").hide();
    $(".index2").show();
});
$(".index2 .prev").on("touchstart",function(){
    $(".index2").hide();
    $(".index").show();
});
$(".index2 .next").on("touchstart",function(){
    $(".index2").hide();
    $(".p1").show();
});
$(".p1 .prev").on("touchstart",function(){
    $(".p1").hide();
    $(".index2").show();
});
$(".p1 .next").on("touchstart",function(){
    $(".p1").hide();
    $(".p1-2").show();
});
$(".p1-2-c4").on('touchstart',function(){
    
    $(".p1-2").hide();
    $(".p2").show();
});
$(".p2 .prev").on("touchstart",function(){
    $(".p2").hide();
    $(".p1").show();
});
$(".p2 .next").on("touchstart",function(){
    $(".p2").hide();
    $(".p3").show();
    window.scrollTo(0,0); 
});
$(".p3-btn").on("touchstart",function(){
    $(".p3").hide();
    $(".p5").show();
    window.scrollTo(0,0);
});
$(".p5-btn").on('touchstart',function(){
    $(".p5").hide();
    $(".p6").show();
    window.scrollTo(0,0);
});
$(".p6 .prev").on('touchstart',function(){
    $(".p6").hide();
    $(".p5").show();
    window.scrollTo(0,0);
});
$(".p6 .next").on('touchstart',function(){
    $(".p6").hide();
    $(".p6-2").show();
});
$(".p6-2 .prev").on('touchstart',function(){
    $(".p6-2").hide();
    $(".p6").show();
    window.scrollTo(0,0);
});
$(".p6-2 .next").on('touchstart',function(){
    $(".p6-2").hide();
    $(".p7").show();
});
$(".p7-5").on("touchstart",function(){
    $(".share-cover").show();
});
$(".share-cover").on("touchstart",function(){
    $(".share-cover").hide();
});

    //防止横屏
 var bw = $('body').width();
    var bh = $('body').height();
    var hengping = $('#hengping');
    hengping.on("touchmove", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    
    $('body').on('resize', function () {
        var nbw = $(this).width();
        if (bw < nbw) {
            hengping.show();
        } else {
            hengping.hide();
        }
    });

$("#audio1")[0].play();
    var musicControl=function(obj){
	   var classname = $.trim(obj.attr('class'));
	   
	   if (classname == 'on'){
                document.getElementById('audio1').pause();
                obj.removeClass('on').addClass('off');
                obj.siblings('span').text('关闭');

            } else if(classname == 'off'){
                document.getElementById('audio1').play();
                obj.removeClass('off').addClass('on');
                obj.siblings('span').text('开启');

            }

    }
    $('.pause a').on("touchend",function () {
       musicControl($(this),$(this).parent().next().attr("id"));
    }); 

//进度条  开始
    var len=10;
    var bar = setInterval(function(){
        if(len > 98){
            $("#jindu").css("height",  "1.21rem");
            $(".process-txt").html("100%");
            clearInterval(bar);
            $(".process").hide();
            $(".index").show();
            $('body').trigger('onsourceloaded');
        }
        else{
            $("#jindu").css("height",  (++len)*.0121 + "rem");
            $("#bar").css("width",(len) + "%");
            $(".process-txt").html((len) + "%");
        }
    },30); 