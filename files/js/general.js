// WOW sport general javascript file

var carousel = function() {

    if(window.innerWidth>750){
        var swiper = new Swiper('.swiper-container:not(#how-it-works)', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 3,
            spaceBetween: 30,
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: true
        });
    } else {

        document.querySelector('#app').style.height = '800px';
        document.querySelector('#how-it-works').classList.add('swiper-container');
        document.querySelector('.how-it-works-wrapper').classList.add('swiper-wrapper');
        document.querySelectorAll('.revolve_iphone').forEach(function(value){
            value.classList.add('swiper-slide');
        });

        var swiper = new Swiper('.swiper-container', {
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            slidesPerView: 1,
            loop: true,
            autoplay: 2500,
            autoplayDisableOnInteraction: true
        });
    }
}();

var resizeImg = function(source) {
	var img = typeof source == 'string' ? document.querySelectorAll(source) : source ;

	if(img instanceof NodeList||img instanceof HTMLCollection){
		for(let i=0,lenI=img.length;i<lenI;i++){
			resize(img[i]);
		}
	} else {
		resize(img);
	}

	function resize(image){

		var naturalWidth = image.width,
			naturalHeight = image.height,
			targetWidth = image.parentNode.clientWidth,
			targetHeight = image.parentNode.clientHeight;

		if(naturalWidth/naturalHeight>targetWidth/targetHeight){
			image.style.width = targetWidth+"px";
            image.style.height = naturalHeight*(targetWidth/naturalWidth);
		}else{
			image.style.height = targetHeight+"px";
            image.style.width = naturalWidth*(targetHeight/naturalHeight);
		}
	}
}

resizeImg('.swiper-slide>img');

resizeTimer = 0;
window.addEventListener('resize',function(){ 
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(
        resizeImg.bind(null,'.swiper-slide>img'),500
    )
});


var redBtn = function() {
    var btnArr = document.querySelectorAll('.red_btn');
    for(var i=0,lenI=btnArr.length;i<lenI;i++){
        btnArr[i].addEventListener('click',function(e){
            location.href=e.target.getAttribute('data-href');
        });
    }
}();

var fadeInNav = function (nav,start,end) {
    var nav = document.querySelector(nav),
    beginAt = document.querySelector(start),
    completeAt = document.querySelector(end),
    rect = {};

    window.addEventListener('scroll',function(e){
        rect = beginAt.getBoundingClientRect();
    	if(rect.top <= 0){
				nav.style.backgroundColor = 'rgba(207,16,45,'+(rect.top/(completeAt.getBoundingClientRect().top-rect.top)*-1) + ')';
      } else {
      	nav.style.backgroundColor = 'transparent';
      }
    })
}

fadeInNav('#nav_container','#headline>h1','#home_floor');



var navButton = function(time){
    var arr = document.querySelectorAll('.nav_button');
    var timer=0;
    for(var i=0,lenI=arr.length;i<lenI;i++){
            arr[i].addEventListener('click',function(e){
                clearInterval(timer);
            var element = document.getElementById(e.target.innerText.toLowerCase());
            var rectTop = element.getBoundingClientRect().top;
            var perFrame = time/20;
            var y = (rectTop/perFrame);
            timer = setInterval(function(){
                scrollBy(0,y);
            },20);

            setTimeout(function() {
                clearInterval(timer);
                element.scrollIntoView();
            },time);
        });
    }
}(500);

var paraBox = function(element,extraScale,operator) {
    this.operator = operator === '-' ? -1 : 1;
    this.box = document.querySelector(element);
    this.rect = box.getBoundingClientRect();
    this.winHeight = window.innerHeight;
    this.moveableSpace = (this.rect.height*extraScale)/2;
    this.liftRatio = (moveableSpace)/this.winHeight;
    this.box.style.backgroundSize = 'auto '+(this.rect.height*(1+extraScale))+'px';

    window.addEventListener('scroll',function(){
        this.rect = box.getBoundingClientRect();
        if(this.rect.top-winHeight <= 0 && this.rect.bottom >= 0){
            this.box.style.backgroundPositionY = this.operator * (((winHeight+this.rect.top)*this.liftRatio)-(this.moveableSpace))+'px';
        }
    });
    this.timer = 0;
    window.addEventListener('resize',function(){
        clearTimeout(this.timer);
        this.timer=setTimeout(function(){
            this.rect = box.getBoundingClientRect();
            this.winHeight = window.innerHeight;
            this.moveableSpace = this.rect.height*extraScale;
            this.liftRatio = (this.moveableSpace/2)/this.winHeight;
            this.box.style.backgroundSize = 'auto '+(this.rect.height*(1+extraScale))+'px';
            this.box.style.backgroundPositionY = this.operator * (((winHeight+this.rect.top)*this.liftRatio)-(this.moveableSpace))+'px';
        },500);

    })
}

paraBox('#vision_bg',0.1);
