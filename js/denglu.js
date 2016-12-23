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


	// 超过200像素
	if (sTop >= 200) {
		right.slideDown(1000);
	} else {
		right.slideUp(1000);
	}

	/*
			动态设置导航条固定
		*/
	if (sTop >= navPos) {
		if (!nav.hasClass('fixed')) {
			nav.addClass('fixed');
			$('.head-nav-main').addClass('fixed');
			$('.head-nav-left ul li a').addClass('fixed');

		}
	} else if (sTop <= navPos) {
		if (nav.hasClass('fixed')) {
			$('.head-nav-left ul li a').removeClass('fixed');
			nav.removeClass('fixed');
			$('.head-nav-main').removeClass('fixed');

		}
	}



});


$(document).ready(function() {
	/*产生随机验证码*/

	var code = new Array();

	function random() {
		var str = '';
		for (var i = 0; i <= 3; i++) {
			code[i] = parseInt((90 - 55 + 1) * Math.random() + 55);
			if (code[i] >= 55 && code[i] <= 64) {
				code[i] -= 7;
			}

			code[i] = String.fromCharCode(code[i]);
		}

		var randomCode = code.join("");
		$(".yanzheng span").text(randomCode);
	}

	random();

	$(".yanzheng a").click(function(event) {
		random();
	});



	// 勾选记住我选项，提示安全信息
	$("#remeber input").click(function(event) {
		if ($(this).prop("checked")) {
			$(".remeber_msg").fadeIn("slow");
			setTimeout(function() {
				$(".remeber_msg").fadeOut("slow");
			}, 2500);
			// 如果登录时选中记住我，则记录此次登录的用户名
			localStorage.setItem("remember", $("#denglu").val());

		} else {
			// 取消记住我选项，删除localstorage中的remember
			localStorage.removeItem("remember");
		}
	});

	// 如果localstorage中存在remember，则自动显示用户名和密码，记住我仍为选中状态
	if (localStorage.getItem("remember")) {

		$("#remeber input").attr("checked", true);

		// 取出remember中存储的用户名
		$("#denglu").val(localStorage.getItem("remember"));

		// 取出对应用户名的密码
		$("#mima").val(JSON.parse(localStorage.getItem(localStorage.getItem("remember"))).userPwd);
	}

	// 点击登录按钮，验证用户名和密码
	$("#submit-login").click(function(event) {
		var username = $("#denglu").val();
		var password = $("#mima").val();
		
		if (!localStorage.getItem(username)) {
			alert("请输入正确的用户名！");
			
			return;
		} else {
			if (password == JSON.parse(localStorage.getItem(username)).userPwd) {

				alert("登录成功");
				location.href = "index.html";
			} else {
				alert("用户名或密码不正确");
				
			}
		}


	});

});