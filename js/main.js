
var showIndex=0;
$(function(){
    $('.pages-bg').setImg();
    var pagesH=$('.pages').height();
    if(pagesH>700){
        $('.home-logo').css({top:(pagesH-700)/10+20});
        $('.home-nav-enter').css({top:(pagesH-700)/10+120});
    }else{
        $('.home-logo').css({top:20});
        $('.home-nav-enter').css({top:120});
    }
    page1Animate()
});
$(window).resize(function(){
    $('.pages-bg').setImg();
    var pagesH=$('.pages').height();
    for(var i=0;i<$('.pages').length;i++){
        if(i<showIndex){
            $('.pages').eq(i).css({'top':-pagesH});
        }
        if(i>showIndex){
            $('.pages').eq(i).css({'top':pagesH});
        }
    }

    if(pagesH>660){
        $('.home-logo').css({top:(pagesH-700)/10}+20);
        $('.home-nav-enter').css({top:(pagesH-700)/10}+120);
    }else{
        $('.home-logo').css({top:20});
        $('.home-nav-enter').css({top:120});
    }
});

//page3
var page3show=false;
$(function(){
    $('.pagesThree-nav-label').mouseenter(function(){
       var index=$(this).parent().children('.pagesThree-nav-label').index($(this));
        $(this).addClass('cur').siblings().removeClass('cur');
        $('.pagesThree-banner').eq(index).show().siblings().hide();
        clearInterval(page3Auto);
        page3Auto=setInterval(page3Play,4000);
    });
    $('.pagesThree-banner-btn span').mouseenter(function(){
        var index =$(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        $(this).parent().siblings('.pagesThree-inner-banner-warp').children().eq(index).fadeIn(300).siblings().fadeOut(300);
        clearInterval(page3Auto);
        page3Auto=setInterval(page3Play,4000);
    });
    var page3Auto=setInterval(page3Play,4000);
    function page3Play(){
        if(!page3show)return;
        var playIndex= 0,
            index=0;
        for(var i=0;i<$('.pagesThree-nav-label').length;i++){
            if($('.pagesThree-nav-label').eq(i).hasClass('cur')){
                playIndex=i;
                break;
            }
        };
      var btn= $('.pagesThree-banner').eq(playIndex).children('.pagesThree-banner-btn').children();
        var banner=$('.pagesThree-banner').eq(playIndex).children('.pagesThree-inner-banner-warp').children();
        for(var k=0;k<btn.length;k++){
            if(btn.eq(k).hasClass('cur')){
                index=k;
                break;
            }
        };
        index++;
        index=btn.length<=index?0:index;
        btn.eq(index).addClass('cur').siblings().removeClass('cur');
        banner.eq(index).fadeIn(300).siblings().fadeOut(300);
    }
});
//page4
$(function(){
//    banner定位
    var banner=$('.pagesFour-banner'),
        bannerWidth=banner.width()+15;
    for(var i=0;i<banner.length;i++){
        if(i==0){
            banner.eq(i).css({left:0});
        }else{
            banner.eq(i).css({left:bannerWidth});
        }
    };
    $('.pagesFour-banner-btn span').mouseenter(function () {
        clearInterval(pages4Auto);
        pages4Auto=setInterval(pages4Play,4000);
        if(banner.is(':animated'))return;
        var oldIndex=$('.pagesFour-banner-btn span.cur').index(),
            newIndex=$(this).index();
        $(this).addClass('cur').siblings().removeClass('cur');
        pages4switch(banner,oldIndex,newIndex);
    });
    var pages4Auto=setInterval(pages4Play,4000);
    function pages4Play(){
        if(banner.is(':animated'))return;
        var oldIndex=$('.pagesFour-banner-btn span.cur').index(),
            newIndex=oldIndex+1;
        newIndex=banner.length<=newIndex?0:newIndex;
        $('.pagesFour-banner-btn span').eq(newIndex).addClass('cur').siblings().removeClass('cur')
        pages4switch(banner,oldIndex,newIndex);
    }
    function pages4switch(banner,oldindex,newindex){
        if(oldindex==newindex) return;
        var direction=oldindex>newindex?1:-1;
        var oldBannerL=banner.eq(oldindex).position().left,
            newBannerL=banner.eq(newindex).position().left,
            move=banner.width()+15;
        banner.eq(oldindex).animate({left:oldBannerL+direction*move},300);
        banner.eq(newindex).animate({left:newBannerL+direction*move},300,function(){
            for(var i=0;i<banner.length;i++){
                if(i<newindex){
                    banner.eq(i).css({'left':-move});
                }
                if(i>newindex){
                    banner.eq(i).css({'left':move});
                }
            }
        });

    }
});

//pages5
$(function(){
   $('.pagesFive-news-nav li').mouseenter(function(){
       var index=$(this).index();
       $(this).addClass('cur').siblings().removeClass('cur');
       $('.pagesFive-news-content').eq(index).show().siblings().hide();
   })
});
//home menu
$(function(){
    $('.home-nav-enter').click(function(){
        $('.home-menu').slideDown();
    })
   $('.home-menu li').hover(function(){
     var lineTop=$(this).find('span.top'),
         lineRight=$(this).find('span.right'),
         lineBottom=$(this).find('span.bottom'),
         lineLeft=$(this).find('span.left');
       lineTop.stop().animate({'left':0},200);
       lineRight.stop().animate({'top':0},200);
       lineBottom.stop().animate({'left':0},200);
       lineLeft.stop().animate({'top':0},200);
   },function(){
       var lineTop=$(this).find('span.top'),
           lineRight=$(this).find('span.right'),
           lineBottom=$(this).find('span.bottom'),
           lineLeft=$(this).find('span.left');
       lineTop.stop().animate({'left':"100%"},200);
       lineRight.stop().animate({'top':'100%'},200);
       lineBottom.stop().animate({'left':'-100%'},200);
       lineLeft.stop().animate({'top':'100%'},200);
   })
});

//整屏效果
$(document).mousewheel(function(event, delta, deltaX, deltaY){
   var event = event || window.event;
    var page=$('.pages');
    if(page.is(':animated')) return;
        var pageIndex=showIndex;
    if(delta>0){
        if(pageIndex-1<0)return;
        pagesScroll(page,pageIndex,pageIndex-1);
    }else{
        if(pageIndex+1>=page.length) return;
        pagesScroll(page,pageIndex,pageIndex+1);
    }
});
function pagesScroll(page,oldindex,newindex){
    if(oldindex==newindex) return;
    playAnimate(newindex);
    playLeave(oldindex);
    var direction=oldindex>newindex?1:-1;
    var oldPagesT=page.eq(oldindex).position().top,
        newPagesT=page.eq(newindex).position().top,
        move=page.height();
    page.eq(oldindex).animate({top:oldPagesT+direction*move},300);
    if(newindex==0){
        $('.home-common').hide();
    }
    page.eq(newindex).animate({top:newPagesT+direction*move},300,function(){
        for(var i=0;i<page.length;i++){
            if(i<newindex){
                page.eq(i).css({'top':-move});
            }
            if(i>newindex){
                page.eq(i).css({'top':move});
            }
        }
        showIndex=newindex;
        if(showIndex>0){
            $('.home-common').show();
            $('.home-page-inner li').eq(showIndex-1).addClass('cur').siblings().removeClass('cur');
        }

    });

};

$(function(){
   $('.home-page-inner li').click(function(){
       var index=$(this).index();
       pagesScroll($('.pages'),showIndex,index+1);
   });
});

//动画
function playAnimate(index){
    switch (index){
        case 0:page1Animate(); break;
        case 1:page2Animate();break;
        case 3:page4Animate();break;

    }
}
function playLeave(index){
    switch (index){
        case 0:page1Leave(); break;
        case 1:page2Leave();break;
        case 3:page4Leave();break;

    }
}
function page1Animate(){
    $('.home-introduce-text').animate({width:230,opacity:1},1500)
}
function page1Leave(){
    $('.home-introduce-text').animate({width:0,opacity:0},200);
}
function page2Animate(){
    $('.pagesTwo-sides-enter').animate({top:0,opacity:1},1000);
    setTimeout(function(){
        $('.pagesTwo-center-enter').animate({top:0,opacity:1},1000);
    },200);
}
function page2Leave(){
    $('.pagesTwo-center-enter').animate({top:200,opacity:1},1000);
    setTimeout(function(){
        $('.pagesTwo-sides-enter').animate({top:100,opacity:1},1000);
    },300);
}
function page4Animate(){
    $('.pagesFour-main').animate({'height':480},1000,function(){
        page3show=true;
    });
}
function page4Leave(){
    page3show=false;
    $('.pagesFour-main').animate({'height':0},1000)
}