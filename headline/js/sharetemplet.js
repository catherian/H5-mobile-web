$(function(){
    var shareCover = $('.share-cover');
    //shareCover.hide(0);
    //点击分享按钮,需要在页面上
    $('.share-btn').on('touchend', function () {
        shareCover.show(0);
    });

    //点击隐藏按钮
    shareCover.on('touchend', function () {
        shareCover.hide(0);
    });
    
    var shareTempletObj = {
        "bgurl":'images/sharetemplet_1/bg.jpg',
        "btnurl":'images/sharetemplet_1/btn.png',
        "logourl":'images/sharetemplet_1/logo.png',
        "sharetitle":'这里是分享的标题',
        "sharedescirb":'这里是分享的描述这里是分享的描述这里是分享的描述这里是分享的描述这里是分享的描述'        
    };
    var setShareTemplet = function(sharetid,shareobj){       
        var $_share = $("#"+sharetid);
        $_share.find(".bg").css({
            "background":'url('+shareobj.bgurl+') no-repeat',
            "background-size":'cover'
        }); 
        $_share.find(".title").html(shareobj.sharetitle);  
        $_share.find(".describ").html(shareobj.sharedescirb); 
        $_share.find(".share-btn").css({
            "background":'url('+shareobj.btnurl+') no-repeat',
            "background-size":'cover'
        });  
        $_share.find(".logo").css({
            "background":'url('+shareobj.logourl+') no-repeat',
            "background-size":'cover'
        });  
    }
    setShareTemplet("sharetemplet_1",shareTempletObj);
});