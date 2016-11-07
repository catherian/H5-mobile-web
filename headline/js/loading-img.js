$(function () {

    var loadingHtml=[


     var lds=$('#loading-slide');
     lds.prepend(loadingHtml.join(''));   


     var ldp = $('.loading-progress')[0];
    
     $(ldp).on("touchstart touchmove touchend", function (e) {
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    
    lds.on('touchstart touchmove touchend',function(e){
        e.preventDefault();
        e.stopImmediatePropagation();
    });
    
});


window.onload = function () {

    var percent = 10;
    var loadingTimeTick = setInterval(function () {
        if (++percent <= 100) {
            $('#bar-percent').css('width', percent + "%");
            $('#loading-txt').text("" + percent + "%");
           
        } else {
            clearInterval(loadingTimeTick);
            $('#loading-slide').hide();
            $('body').trigger('onsourceloaded');
        }
        
    }, 50); //更新进度的频率,以毫秒为单位
    

    
}