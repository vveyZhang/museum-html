
(function($){
    $.fn.setImg=function(){
        var ch=$(window).height();
        var cw=$(window).width();
        var imgH=1080;
        var imgW=1920;
        $(this).css({'margin-left':0,'margin-top':0});
        if(ch/cw>=imgH/imgW){
            $(this).css({'height':ch});
            $(this).css({'width':ch/(imgH/imgW)});
        }else{
            $(this).css({'width':cw});
            $(this).css({'height':cw*(imgH/imgW)});


        }
        var newW=$(this).width();
        var newH=$(this).height();
        $(this).css({'left':-(newW-cw)/2,'top':-(newH-ch)/2});
    }
})(jQuery);