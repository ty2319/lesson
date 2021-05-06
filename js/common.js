(function($) {
	
	set = function() {
		
		$('<div class="back">').prependTo('body > header , article');		
		$('article , body > header').addClass('contents');
	},	
	
	size = function() {
		
		if ($(window).width() < 600) {
			$('h2 img').attr('src' , 'img/logo2.png');
		} else {
			$('h2 img').attr('src' , 'img/logo.png');		
		}
		$('iframe').height(($('iframe').width() / 16) * 9);
	},	
		
	// SmoothScroll
	smoothScroll = function() {
		
		var boxTop			= new Array,
			current			= -1,
			startPosition	= 0,
			scrollswitch 	= 0;
		
		$('a[href^="#"]').click(function(ev) {
			var href= $(this).attr("href"),
				target = $(href == "#" || href == "" ? 'html' : href),
				position = target.offset().top + 1;
			
			scrollswitch = 1;
			
			$("html , body").animate({scrollTop:position}, 500, "swing" , function() {
				$("html , body").stop(true,true);
				setTimeout(function(){
					scrollswitch = 0;
				},1000);
			});
			ev.preventDefault();
		});
		
		//各要素の位置
		$(window).on("load resize", function(){
			$('.contents').each(function(i) {
				boxTop[i] = $(this).offset().top;
			});
		});
		//最初の要素にclass="on"をつける
		changeBox(0);
		//スクロールした時の処理
		$(window).scroll(function(){
			
			var scrollPosition	= $(window).scrollTop();
				
			for (var i = boxTop.length - 1 ; i >= 0; i--) {
				if (scrollPosition >= boxTop[i]) {
					changeBox(i);
					break;
				} else if (scrollPosition < boxTop[0]) {
					changeBox(-1);
				}
			}

			if (scrollPosition > boxTop[1]) {

				$('main nav').fadeIn();

			} else {

				$('main nav').fadeOut();
			}
			
			startPosition = scrollPosition;
		});
		
		//ナビの処理
		function changeBox(secNum) {
			
			/*if($(window).width() > 1200) {
				
				var scrollBottom = $(window).scrollTop() + $(window).height();

				if (secNum != current && scrollswitch == 0) {

					if (secNum < current) {
						$("html , body").animate({scrollTop: boxTop[current] - $(window).height() - 1}, 500, "swing");
					}

					current = secNum;
					secNum2 = secNum + 1;//HTML順序用
					$('main nav li').removeClass('on');
					$('main nav li:nth-child(' + secNum2 +')').addClass('on');

				} else {

					if (scrollBottom > boxTop[current + 1] && startPosition < $(window).scrollTop() && secNum != 0 && scrollswitch == 0) {
						$("html , body").stop(true,false).animate({scrollTop: boxTop[current + 1] + 1}, 50, "swing");

						current = secNum;
						secNum2 = secNum + 1;//HTML順序用
						$('main nav li').removeClass('on');
						$('main nav li:nth-child(' + secNum2 +')').addClass('on');
					}
				}
				
			} else {
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('main nav li').removeClass('on');
				$('main nav li:nth-child(' + secNum2 +')').addClass('on');
			}*/
			
			current = secNum;
			secNum2 = secNum + 1;//HTML順序用
			$('main nav li').removeClass('on');
			$('main nav li:nth-child(' + secNum2 +')').addClass('on');
		};
	},
	
	//sidemenu
	side = function() {
		$('main nav a').append('●');
		
		$('main nav').on('mouseenter touchstart', function(){
			$('main').append('<div id="modal"></div>');
			$('span',this).fadeIn('fast').css('display' , 'inline');
    	}).on('mouseleave touchend', function(){
        	$('div#modal').remove();
			$('span',this).fadeOut('slow');
    	});
	}
	
	$(document).ready(function() {
		set();
		smoothScroll();
		side();
		size();
	});
	
	$(window).resize(function() {
		size();
	});
	
})($);
