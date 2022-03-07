/* GNB */

gnbUI();

function gnbUI() {

	// 서브 메뉴 current 추가시 부모 메뉴 current 자동 추가
	if ($('.nav-sub > ul > li').hasClass('current')){
		$('.nav-sub > ul > li.current').parent().parent().parent().addClass('current');
	}
	if ($('.nav-sub > ul ul > li').hasClass('current')){
		$('.nav-sub > ul ul > li.current').parent().parent().addClass('current')
										  .parent().parent().parent().addClass('current');
	}
	/*if ($('.nav-sub > h3').hasClass('h3current')){
	    $('.nav-sub > h3.h3current').parent().parent().addClass('current');
	}*/
	
	$('.nav > ul > li > a').on('mouseenter', function() {
		$('header').addClass('open');
	});
	$('.nav > ul > li').on('focusin mouseenter touchend', function() {
		$(this).addClass('active').siblings().removeClass('active');
		$('header').addClass('open');
	}).on('focusout mouseleave', function() {
		$(this).removeClass('active');
		//$('header').removeClass('open');
	});
	$('.header').on('focusout mouseleave', function() {
		$('header').removeClass('open');
	});

	// 서브 메뉴 클릭시 current 삭제 및 추가 
	$('.nav-sub > ul > li > a').on('click', function() {
		$('.nav-sub > ul > li').removeClass('current');
		$(this).parent().addClass('current')
			   .parent().parent().parent().addClass('current')
			   .siblings().removeClass('current');
		$('.nav-sub > ul ul > li').removeClass('current');
		$(this).siblings().children().eq(0).addClass('current');
	});
	$('.nav-sub > ul ul > li > a').on('click', function() {
		$('.nav-sub > ul > li').removeClass('current');
		$('.nav-sub > ul ul > li').removeClass('current');
		$(this).parent().addClass('current')
			   .parent().parent().addClass('current')
			   .parent().parent().parent().addClass('current')
			   .siblings().removeClass('current');
	});
}

// 마이페이지
$(".private").click(function(e) {
	e.preventDefault();
	$(".side-menu").addClass("open");
	$(".side-menu-dim").addClass("on");
	$("body").addClass("no-scroll");
});
$(".btn-close").click(function(e) {
	e.preventDefault();
	$(".side-menu").removeClass("open");
	$(".side-menu-dim").removeClass("on");
	$("body").removeClass("no-scroll");
});

$(".menu-btn > button").click(function(e) {
	e.preventDefault();
	$("nav").addClass('open');
	$(".side-menu-head.mobile").show().addClass('open');		
	$(".side-menu").removeClass('open');
	$("body").addClass("no-scroll");
	$(".side-menu-dim").removeClass('on');		gnbUI();
});

$(".side-menu-head.mobile > .btn-close").click(function(e) {
	e.preventDefault();
	$("nav").removeClass('open');
	$(".side-menu-head.mobile").hide().removeClass('open');
	$("body").removeClass("no-scroll");
});

$(".click-side-menu").click(function(e) {
	e.preventDefault();
	$(".side-menu-head.mobile").hide().removeClass('open');
	$(".side-menu").addClass('open').show();
	$("body").addClass("no-scroll");
	$(".side-menu-dim").addClass('on');
	$("header").removeClass('open');
});

$(".bookmark").click(function(e) {
	e.preventDefault();
	$(this).toggleClass('active');
});


$(".btn-modify").click(function(e) {
	e.preventDefault();
	$('.state-list').addClass('modify');
	$('.btn-modify').addClass('hide');
	$('.btn-modify-done').removeClass('hide');
});

$(".btn-modify-done").click(function(e) {
	e.preventDefault();
	$('.state-list').removeClass('modify');
	$('.btn-modify-done').addClass('hide');
	$('.btn-modify').removeClass('hide');
	$(".state-list").removeClass('modify');
});



$(".state-list > li").click(function () {
	var t = $(this).parent('.state-list');
	if (t.hasClass("modify")) {
		$(this).addClass('active').siblings().removeClass('active');
	} 
});

/* selectbox */
$(".mu-selectbox .mu-value").click(function () {

	if ($(this).parent().hasClass("disabled") == true){
		return false;
	}

	$(this).next(".mu-list").slideToggle("fast");
	$(this).parent().toggleClass("on");

	$(this).next(".mu-list").children("li").click(function(){
		if ($(this).hasClass("disabled") == true){
			//return false;
		} else if ($(this).children().hasClass("mu-checkbox") == true){
			//return false;
			//$(this).parent().siblings(".mu-value").text($(this).children(".mu-checkbox").children("input:checked").siblings("label").text() + " 외 1개");
		} else {
			$(this).parent().siblings(".mu-value").text($(this).text());
			
			$(this).addClass("active").siblings().removeClass("active");
			$(this).parent().hide();
			$(this).parent().parent().removeClass("on");
		}
	});

});

// accordion
$(".mu-accordion .mu-accordion-head").click(function(e) {
	e.preventDefault();

	var $current = $(this).parents(".mu-accordion");
	
	$current.find(".mu-accordion-head").next().slideUp();
	$(this).next().slideDown(function(){
		$current.find(".mu-accordion-head").removeClass("active");
		$(this).prev().addClass("active");
	});
});

/* datepicker */
$(".datepicker").datepicker({
	dateFormat: "yy-mm-dd",
	yearSuffix: ".",
	monthNames:["1","2","3","4","5","6","7","8","9","10","11","12"],
	dayNamesMin: ["S","M","T","W","T","F","S"],
	showMonthAfterYear: true
}).datepicker('setDate', new Date());

/* tab */
$(".mu-tab li").click(function (e) {
	e.preventDefault(); //a링크이동막기

	if ($(this).hasClass("disabled") == true){
		return false;
	}

	$(this).siblings(".active").removeClass("active");
	//클릭한 요소에 active클래스를 add함
	$(this).addClass("active");

	// 우리가 클릭한 요소의 index를 얻어옴
	var index = $(this).index();
	var $current = $(this).parent().next(".mu-tab-body");

	//아래쪽 tab3개를 선택후 index번지의 요소를 선택후 active클래스를 줍니다.
	$current.children(".mu-tab-cont").removeClass("active").eq(index).addClass("active");
});
