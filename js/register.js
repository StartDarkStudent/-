





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
					
			}						
		} else if(sTop <= navPos){
			if (nav.hasClass('fixed')) {
				$('.head-nav-left ul li a').removeClass('fixed');
				nav.removeClass('fixed');
				$('.head-nav-main').removeClass('fixed');	
						
			}
		}

	



		
	});


	/*产生随机验证码*/

	var code = new Array();
	function random(){
		var str = '';
		for(var i =0; i <=3; i++){
			code[i] = parseInt((90 - 55 + 1) * Math.random() + 55);
			if(code[i] >= 55 && code[i] <= 64){
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

	// 登陆名输入框失去焦点，检测输入是否合法
	$('#denglu').blur(function(event) {
		var username = $(this).val();
		var usernameReg = /^\w+@((qq|126|163|sina|hotmail|sohu|139)\.com|sina\.cn|yeah\.net)$/;
		if(username){
			if(!usernameReg.test(username)){
				$(this).parent().after('<p class="usernameMsg msg">请输入正常使用邮箱</p>');
			}else{
				$(".usernameMsg").remove();
				$(".userIdMsg").remove();
				
			}
		}
	});

	$('#denglu').focus(function(event) {
		$(".userIdMsg").remove();
		$(".usernameMsg").remove();
	});


	//输入密码失去焦点，检测密码位数是否在6~16位
	$('#mima').blur(function(event) {
		var password = $(this).val();
		var passwordReg = /^.{6,16}$/;
		if(password){
			if(!passwordReg.test(password)){
				$(this).parent().after('<p class="passwordMsg msg">请输入6~16位的密码</p>');
			}else{
				$(".passwordIdMsg").remove();
				$(".passwordMsg").remove();
				
			}
		}
	});

	//密码输入框会的焦点是，提示框消失
	$('#mima').focus(function(event){
		$(".passwordIdMsg").remove();
		$(".passwordMsg").remove();
	});

	//验证码输入框失去焦点，检测输入是否与验证码相同
	$('#yzm').blur(function(event) {
		var randomInput = $(this).val();
		var randomLetter = code.join('');
		if(randomInput){
			//忽略大小写
			if(randomInput.toUpperCase() != randomLetter){
				alert(randomInput);
				$('.yanzheng').parent().after('<p class="randomMsg msg">验证码错误</p>')
			}else{
				$('.randomMsg').remove();
			}
		}
	});

	//验证码输入框获得焦点，提示信息消失
	$('#yzm').focus(function(event) {
		$('.randomMsg').remove();
	});


	$('#regbtn').click(function(event) {
		
		var username = $('#denglu').val();
	
		
		if(!username){
			if($(".msg").length != 0)
				return;
			$("#denglu").after('<p class="userIdMsg msg">请输入邮箱账号</p>');
			return;
		}

		var password = $('#mima').val().length;
		var  pas = $('#mima').val()
		
		if(password == 0){
			if($('.msg').length != 0)
				return;
			$('#mima').after('<p class="passwordIdMsg msg">请输入密码</p>');
			return;
		}

		if(!$('#yzm').val()){
			if($(".randomMsg").length != 0)
				return;
			$('.yanzheng').parent().after('<p class="randomMsg msg">请输入验证码</p>')
			return;
		}

		//创建用户类 
		function User(userName,userPwd){
			this.userName = userName;
			this.userPwd = userPwd;
			this.flag = false;
		}

		var u = new User(username,pas);

	

		//所有输入合法ok时候
		if($(".msg").length == 0){
			localStorage.setItem(username,JSON.stringify(u));
			
			if(localStorage.getItem(username)){
				alert("注册成功！");
				location.href = "login.html";
				
			} 
		}
	});









	

	


	



