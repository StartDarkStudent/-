/*滚动监听事件*/


// 获得回到顶部按钮
var right = $('.right');
var daohang = $('#right-daohang');

// // 获得导航条对象
var nav = $('.head-nav');
// 导航条的高度
var navHeight = nav.outerHeight();
// 导航条相对于网页原点的位置
var navPos = nav.offset().top;



$(window).scroll(function(event) {

	/*
			动态显示隐藏回到顶部按钮
		*/
	// 滚动条卷去的大小
	var sTop = $(window).scrollTop();


	// // 超过200像素
	// if (sTop >= 200) {
	// 	right.slideDown(1000);
	// } else {
	// 	right.slideUp(1000);
	// }

	// /*
	// 	动态设置导航条固定
	// */ 
	// if (sTop >= navPos ) {
	// 	if (!nav.hasClass('fixed')){
	// 		nav.addClass('fixed');
	// 		$('.head-nav-main').addClass('fixed');
	// 		$('.head-nav-left ul li a').addClass('fixed');

	// 	}						
	// } else if(sTop <= navPos){
	// 	if (nav.hasClass('fixed')) {
	// 		$('.head-nav-left ul li a').removeClass('fixed');
	// 		nav.removeClass('fixed');
	// 		$('.head-nav-main').removeClass('fixed');	

	// 	}
	// }

	a = document.body.clientHeight;



	x = sTop + 'px';
	$('.manhua-cf li>a').click(function(event) {
		$('#modal').css("display", "block")
		
		document.body.style.overflow="hidden"
		return false;
	});

	$(document).click(function(event) {
		$('#modal').css("display", "none")
		 //启动滚动条
		 $("#modal").css("overflow","hidden");
 		document.body.style.overflow="auto"
		myVideo.pause();
	});



	var myVideo = document.getElementById('myVideo');

	$('#videoList li a').click(function(event) {

		// 获得播放路径
		var url = $(this).attr('data-video');
		// 指定src路径
		myVideo.src = url;
		// 播放视频
		myVideo.play();
		return false;

	});



});

//利用angular完成界面排版与搜索
$(document).ready(function() {
	var myApp = angular.module('myApp', []);

	myApp.controller('list', ['$scope', '$http', function($scope, $http) {


		// get请求的快捷方法
		var promise = $http.get('js/data.txt');

		promise.success(function(data) {
			alert('请求成功');
			console.log(data);
			$scope.data = data;
		});

		promise.error(function() {
			alert('请求失败');
		});



	}]);
});