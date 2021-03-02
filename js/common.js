(function($) {
	
	set = function() {
		
		$('<div class="back">').prependTo('body > header , article');		
		$('article , body > header').addClass('contents');	
	},	
		
	// SmoothScroll
	smoothScroll = function() {
		
		$('a[href^="#"]').on('click' , function(){
			var href= $(this).attr("href"),
				target = $(href == "#" || href == "" ? 'html' : href),
				position = target.offset().top;
			
			$("html , body").animate({scrollTop:position}, 500, "swing");
			return false;
		});
		
		var boxTop			= new Array,
			current			= -1,
			startPosition	= 0;
		
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
				if (scrollPosition > boxTop[i]) {
					changeBox(i);
					break;
				} else if (scrollPosition <= boxTop[0]) {
					changeBox(-1);
					$("html , body").stop(true,false);
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
				
			var scrollBottom = $(window).scrollTop() + $(window).height();
			
			if (secNum != current) {

				if (secNum < current && secNum != 0) {
					$("html , body").animate({scrollTop: boxTop[current] - $(window).height()}, 500, "swing");
				}
				
				current = secNum;
				secNum2 = secNum + 1;//HTML順序用
				$('main nav li').removeClass('on');
				$('main nav li:nth-child(' + secNum2 +')').addClass('on');
				
			} else {
				
				if (scrollBottom >= boxTop[current + 1] && startPosition < $(window).scrollTop()) {
					$("html , body").stop(true,false).animate({scrollTop: boxTop[current + 1]}, 50, "swing");
				
					current = secNum;
					secNum2 = secNum + 1;//HTML順序用
					$('main nav li').removeClass('on');
					$('main nav li:nth-child(' + secNum2 +')').addClass('on');
				}
			}
		};
	},
	
	//sidemenu
	side = function() {
		$('main nav a').append('●');
		
		$('main nav').hover(function() {
			$('body').append('<div id="modal"></div>');
			$('span' , this).fadeIn('slow').css('display' , 'inline');
		},function() {
			$('div#modal').remove();
			$('span' , this).fadeOut('slow');
		});
		
		$('main nav').on('touchstart', function(){
			$('body').append('<div id="modal"></div>');
			$('span',this).fadeIn('slow');
    	}).on('touchend', function(){
        	$('div#modal').remove();
			$('span',this).fadeOut('slow');
    	});
	}
	
	$(document).ready(function() {
		set();
		smoothScroll();
		side();
	});
	
})($);
