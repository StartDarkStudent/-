$(document).ready(function(){
		// 轮播图
	var timerId;
	var index = 0;
	function startLoop(){
		timerId = setInterval(function(){

			index ++ ;
			if(index == 4)
				index = 0;
			showBanner(index);
			showData(index);
		},5000);
	}
	startLoop();

	$(".paihang-top li").mouseenter(function(event) {
		if(index == $(this).attr("id").substr(-1) - 1){
			return;
		}
		clearInterval(timerId);
		index = $(this).attr("id").substr(-1) - 1;
		showBanner();
	});

	$(".paihang-top li").mouseenter(function(event) {
		 var index = $(this).attr('id').substr(-1);

		 showBanner(index);
		 showData(index);
		
	});
	$(".paihang-top li").mouseleave(function(event) {
		var index = $(this).attr('id').substr(-1);
		
		startLoop(index);
	});

	function showBanner(){
		$(".paihang-middle-tab").css("display","none");
		$(".paihang-top li").removeClass('paihang_highlight');
		$(".paihang-middle-tab").fadeIn('slow');
		$(".paihang-top li").eq(index).addClass('paihang_highlight');
	}



	// 动态获取后台数据
	var recordCount = 0;//总记录数
	var pageSize = 8;//每页多少条
	var pageCount = 0;//共几页
	var pageNum = 1;//当前页码

	//数据集合
	var data;

	$.ajax({
		url: 'data.json',
		type: 'GET',
		dataType: 'json',
		async:false//同步请求
	})
	.done(function(json) {
		data = json;
		alert('ok');
	})
	.fail(function() {
		alert('请求失败')
	})

	//就算总记录数
	recordCount = data.length;

	//计算一共几页
	pageCount = parseInt(recordCount / pageSize);
	if(recordCount % pageSize != 0)
		pageCount ++;

	/*显示当前指定页码的数据*/


	function showData(){
		//清空当前排行数据
		pageNum = index*2 + 1;
		
		pageNumx = pageNum + 1;
		var start = (pageNum - 1)*pageSize;
		var end = pageNum * pageSize;
		var end2 = pageNumx * pageSize;

		//得到当前页得数据
		var newArray = data.slice(start,end);
		var newxArray = data.slice(end,end2)
		$('.ol1 li').remove();

		$.each(newArray, function(index, val) {
			x = index + 1;
			 html = '';
			 html += '<li>';
			 html += '<sub id="paihang-sub">'+ x + '</sub>';
			 html += '<a href="#">'+ val.date+'</a>';
			 html +='<i class="paihang-middle-i"></i>'
			 html +='</li>'
			 
			 $(html).appendTo('.paihang-middle-tab ol[name=ol1]');
			 
		});
		 $('.ol2 li').remove();
		$.each(newxArray, function(index, val) {
			x = index + 9;
			 html = '';
			 html += '<li>';
			 html += '<sub id="paihang-sub">'+ x + '</sub>';
			 html += '<a href="#">'+ val.date+'</a>';
			 html +='<i class="paihang-middle-i"></i>'
			 html +='</li>'
			 
			 $(html).appendTo('.paihang-middle-tab ol[name=ol2]');
			 
		});

	}

	// 默认加载第一条数据
	showData();
	



//自动翻转
	var time;
	var i = -1;
	function pingLv(){
		time = setInterval(function(){
			i ++;
			if(i == 4)
				i = 0;
			fanZhuan(i);
			

		},5000);
	}

	pingLv();

	$(".banner-swiper ul li a").mouseenter(function(event) {
		$(".hr-bird").css("display","none")
		$(".forward").css("transform","rotateY(0deg)");
		$(".back").css("transform","rotateY(180deg)");
		clearInterval(time);
		
		$(this).children('.forward').css("transform","rotateY(-180deg)");
		$(this).children('.back').css("transform","rotateY(0deg)");
		
	});
	$(".banner-swiper").mouseleave(function(event) {
		$(".hr-bird").css("display","block")
		$(".forward").css("transform","rotateY(0deg)");
		$(".back").css("transform","rotateY(180deg)");
		pingLv();
	});

	
	function fanZhuan(){
		var x1 =228*i + 228 ;
		var x = x1 - 228;
		
		$(".forward").css("transform","rotateY(0deg)");
		$(".back").css("transform","rotateY(180deg)");
		$(".back").eq(i).css("transform","rotateY(0deg)");
		$(".forward").eq(i).css("transform","rotateY(-180deg)");
		if(i== 0){
			$('.hr-bird').animate({left:0},0);
			$('.hr-bird').animate({left:x1}, 5000);
		}else{
			$('.hr-bird').animate({left:x1}, 5000);
		}
		
		
		
	}



//强档推荐轮播图
		var speed = 1;
		var result= $('.content-scroll ul').html();
		$('.content-scroll ul').append(result);

		function marquee() {
			var sLeft = $('.content-scroll').position().left;
			var bsLeft = $('.content-scroll').width();
			if (sLeft <= -1632) {				
				sLeft = 0;	
			}			
		
			sLeft = sLeft - 1;
			sLeft = sLeft + 'px';
			$('.content-scroll').css('left',sLeft);			
		}
		var time1 = setInterval(marquee, speed);

		


		$(".recommend-content").mouseenter(function(event) {
				clearInterval(time1);
		});
		$(".recommend-content").mouseleave(function(event) {
				time1 = setInterval(marquee, speed);
		});





/*滚动监听事件*/
		

	// 获得回到顶部按钮
	var right = $('.right');
	var daohang = $('#right-daohang');
	
	// // 获得导航条对象
	var nav = $('.head-nav');
	// 导航条的高度
	var navHeight= nav.outerHeight();
	// 导航条相对于网页原点的位置
	var navPos = nav.offset().top;

	/*回到顶部按钮单击*/
	// daohang.click(function(event) {
		
	// 	$('html,body').animate({scrollTop:0}, 1000);

	// });
	
	/*
		滚动条事件
	*/
	$(window).scroll(function(event) {
		
		/*
			动态显示隐藏回到顶部按钮
		*/
		// 滚动条卷去的大小
		var sTop = $(window).scrollTop();

		// 超过200像素
		if (sTop >= 200) {
			right.slideDown(1000);
		} else {
			right.slideUp(1000);
		}

		/*
			动态设置导航条固定
		*/ 
		if (sTop >= navPos ) {
			if (!nav.hasClass('fixed')){
				nav.addClass('fixed');
				$('.head-nav-main').addClass('fixed');
				$('.head-nav-left ul li a').addClass('fixed');
				// $('.banner').css('margin-bottom',navHeight); //banner下方空出原始导航的高度，保证下方元素不会上移				
			}						
		} else {
			if (nav.hasClass('fixed')) {
				$('.head-nav-left ul li a').removeClass('fixed');
				nav.removeClass('fixed');
				$('.head-nav-main').removeClass('fixed');	
				// $('.banner').css('margin-bottom',0);			
			}
		}

		/*
			滚动监听高亮导航
		*/
		// 高亮函数
		function highLight(target) {
			$('.right li').removeClass('right-li');
			$(target).addClass('right-li');
		}

		var head = $('#head');
		var recommend = $('#recommend');
		var comic = $('#comic');
		var footer = $('#footer');
		var dujia = $('#dujia');

		var head = {
			start:head.offset().top,
			end:head.offset().top + head.outerHeight() 
		}

		var  recommend = {
			start: recommend.offset().top ,
			end: recommend.offset().top +  recommend.outerHeight() 
		}

		var comic = {
			start:comic.offset().top ,
			end:comic.offset().top + comic.outerHeight() 
		}

		var dujia ={
			start:dujia.offset().top ,
			end:dujia.offset().top + dujia.outerHeight() 
		}

		

		if ( sTop >= head.start && sTop < recommend.start) {
			highLight('#right-daohang');
		} else if ( sTop >= recommend.start && sTop < recommend.end) {
			highLight('#right-daohang1');
		} else if ( sTop >= comic.start && sTop < comic.end) {
			highLight('#right-daohang2');
		} 
		else if ( sTop >= comic.end) {
			highLight('#right-daohang3');
		}else {
			highLight('#right-daohang3');
		}


	});

	/*
		导航链接滑动到锚点
	*/
	$('.right ul li a').click(function(event) {
		
		// 获得对应区块的相对于网页原点的偏移量
		var top = $(this.hash).offset().top ; 

		$('html,body').animate({scrollTop:top}, 1000);

		return false;
	});



});	
