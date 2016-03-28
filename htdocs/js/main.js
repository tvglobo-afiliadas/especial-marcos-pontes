var getClassNav,
    getHeightWindow,
    getHref,
    trataAlturaJanela,
    scrolled,
    getTop;



function share( redesocial, url, descricao, hashtag ) {
    hashtag = (arguments[3] == undefined)? "":hashtag; 

    switch( redesocial )
    {
        case 'facebook':
            url = 'https://www.facebook.com/sharer/sharer.php?u='+ encodeURIComponent( url ) +'&t='+ encodeURIComponent( descricao );
            break;

        case 'twitter':
            url = 'https://twitter.com/share?url='+ encodeURIComponent( url ) +'&text='+ encodeURIComponent( descricao ) +'&hashtags='+ encodeURIComponent( hashtag );
            break;

        case 'googleplus':
            url = 'https://plus.google.com/share?url='+ encodeURIComponent( url );
            break;

        case 'whatsapp':
            url = 'whatsapp://send?text='+ encodeURIComponent( descricao ) +' '+ encodeURIComponent( url );
            break;
    }

    var title  = ( redesocial.charAt(0).toUpperCase() + redesocial.slice(1) );
    var width  = 600;
    var height = 300;
    var top    = ( ( screen.height - height ) / 2 );
    var left   = ( ( screen.width - width ) / 2 );
    var popup  = 'width='+ width +',height='+ height +',top='+ top +',left='+ left +',menubar=no,toolbar=no,resizable=no,scrollbars=0';

    window.open( url, title, popup );
}

paceOptions = {
    document: false,eventLag: false, elements: {
        selectors: ["#carregamento"]
    }
};

function alturaCapa() {
    $(".banner-video").css({"height": trataAlturaJanela, "overflow": "hidden", "display":"block"});
}

function imgsDesktop() {
    $("figure > img").each(function(){
        $(this).attr("src", $(this).attr("src").replace("mobile", "desktop").replace(".png", ".jpg"))
    });

    $("#owl-demo > img").each(function() {
        $(this).attr("src", $(this).attr("src").replace("carousel/mobile", "carousel/desktop").replace(".png", ".jpg"));
    });
}

function imgsMobile() {
    $("#nav-home span").text("10 Anos - O Astronauta Brasileiro");

    $("figure > img").each(function(){
        $(this).attr("src", $(this).attr("src").replace("desktop", "mobile").replace(".jpg", ".png"));
    });

    $("#video-home-1, #video-home-2").remove();


    $("#owl-demo > img").each(function() {
        $(this).attr("src", $(this).attr("src").replace("carousel/desktop", "carousel/mobile").replace(".jpg", ".png"));
    });
}

function getResize() {       
    getHeightWindow = $( window ).height(); 
    trataAlturaJanela = getHeightWindow - 120;

    if ($(window).width() >= 768) {
        alturaCapa();
        imgsDesktop();

        
        $("#nav-home span").remove();
        $("#nav-home").append("<div id='nlogo'><img src='logo_svg3x.svg' /></div>");  
        
        
        /*
        $("#nav-home span").remove();
        $("#nav-home").append("<span><i class='g-90'>O mundo</i>Astronauta<i class='g-360'>Brasileiro</i></span>");    */       

        if($('#home .gif-em-texto').length == 0) {
            $("#home .texto-central-destaque.first").append("<img class='gif-em-texto' src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/assets/funkeiro.png'>")
            $("nav").css("display","block"); 
        }    
        
     
        /*
        if($('#video-home-1').length == 0) {
            $("#video-6").append("<video id='video-home-1' width='100%' height='100%' loop='true' autoplay='true' class='off-mobile'><source src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/videos/funk.mp4' type='video/mp4'><source src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/videos/funk.ogg' type='video/ogg'></video>");
        }

        if($('#video-home-2').length == 0) {
            $("#video-7").append("<video id='video-home-2' width='100%' height='100%' loop='true' autoplay='true' class='off-mobile'><source src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/videos/passinho.mp4' type='video/mp4'><source src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/videos/passinho.ogg' type='video/ogg'></video>");
        } 
        */
    }

    else if($(window).width() <= 767){
        
        $("#home .gif-em-texto").remove();
        $("#nav-home #nlogo").remove();
        $("#exp1").remove();
        $("#exp2").remove();
		$("#nintermission1").remove();
        $("nav").css("display","none");
		$("h6.mobile").css({"font-size": "26px", "margin-top": "10px", "margin-left": "-13px"});
        $(".interna figure, .banner-video").css({"height": "auto", "overflow": "inherit"});
        imgsMobile();
    }
}    

function pauseVideo() {
    getTop = $(".interna.head").position().top;

    $(window).scroll(function () {
        scrolled = $(window).scrollTop();

        if(getTop <= scrolled) {
            $("video").prop('muted', true);
        }
        else if(getTop >= scrolled) {
            $("video").prop('muted', false);
        }
    });
} 

function alignVideo() {
    var iframe = $(".player-video").contents();
    iframe.find(".wm-poster-play").css
    ({ 
        width: 117,
        left: '50%',
        marginLeft: -50,
        top: '50%',
        marginTop: -55
    });    
    iframe.find(".wm-poster-image").css
    ({ 
        width: '100%'
    });
}

if($('#page-qual-o-futuro-do-funk').length == 1) { 
    pauseVideo();
}  


$(window).load(function() {    
    function isMobile() {
        return (/Android|iPhone|iPad|iPod|BlackBerry/i).test(navigator.userAgent || navigator.vendor || window.opera);
    }

    getResize();    
    $(window).resize(getResize);    
    
    $(".bt-nav img").click(function() {
        $("nav").toggle();    
    });

    $(".bt-move-top").click(function() {
        $('html,body').stop().animate({
            scrollTop: $('.interna.head').offset().top
        }, 2500);
    });

    $(".bt-move-bottom").click(function() {
        $('html,body').stop().animate({
            scrollTop: $('body').offset().top
        }, 2500);
    });
    
    $("#owl-demo").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });

    $("#owl-demo-ksc").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });
    
    $("#owl-demo-controle").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });
    
    $("#owl-demo-iss").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    }); 
    
    $("#owl-demo-plataforma").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    }); 
    
    $("#owl-demo-saturno").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });
    
    $("#owl-demo-vab").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });
    
    $("#owl-demo-missao").owlCarousel({
        paginationSpeed : 400,
        slideSpeed : 200,
        slideSpeed : 100,
        navigation : true,
        autoPlay : true,
        stopOnHover : true,
        singleItem : true,
        navigationText : ["",""]
    });

    alignVideo();
    setTimeout( alignVideo, 3000 );

    Pace.once('done', function() {       
        $( 'body' ).css( 'opacity','1' ); 
    });  

    //$(".pace").append("<article id='carregamento'><p><big class='first'>O Mundo <img class='ico-coroa-grande' src='http://estaticog1.globo.com/2015/15/imgs-especial-funk/assets/ico-coroa-grande.png'></big><br><strong>funk</strong><br><big class='last'>Paulista</big></p></article>")
});