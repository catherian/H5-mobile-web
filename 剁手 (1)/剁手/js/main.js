/**
 *  全局函数处理
 *  -----------------------------
 *********************************************************************************************/
var car2 = {
/****************************************************************************************************/
/*  对象私有变量/函数返回值/通用处理函数
*****************************************************************************************************/	
/*************************
 *  = 对象变量，判断函数
 *************************/
	_load         						: 0,									   //加载百分数
	_setIntervalPageLoad		: null,               						//加载函数倒计时
	_setIntervalPageLoad100	: null,           							//加载函数100%倒计时
	
	_score								: 0,           								//游戏得分
	_timer								: 0,										//游戏时间
	_initTimer							: 39,										//游戏时间初始值
	_setIntervalGameTimer		: null,
	_setIntervalGameMain		: null,
	
	_shakeT        					: 0,										//摇一摇标示
	
	_audioWrong1     				: document.getElementById('wrong1'),	 //打错声音
	_audioWrong2     				: document.getElementById('wrong2'),	
	_audioWrong3     				: document.getElementById('wrong3'),	 
	_audioWrong4     				: document.getElementById('wrong4'),	 
	_audioWrongNum			: 1,	 													//打错声音，变量
	
	_audioSuccess1    				: document.getElementById('success1'),	 //打对声音
	_audioSuccess2    				: document.getElementById('success2'),	 //打对声音
	_audioSuccess3    				: document.getElementById('success3'),	 //打对声音
	_wrongSound1					:null,
	_wrongSound2					:null,
	_wrongSound3					:null,
	
	_events 							: {},										// 自定义事件---this._execEvent('scrollStart');
	_windowHeight					: $(window).height(),				// 设备屏幕高度
	_windowWidth 					: $(window).width(),

	_rotateNode						: $('.p-ct'),								// 旋转体

	_page 								: $('.m-page'),						// 模版页面切换的页面集合
	_pageNum						: $('.m-page').size(),				// 模版页面的个数
	_pageNow						: 0,										// 页面当前的index数
	_pageNext						: null,									// 页面下一个的index数

	_touchStartValY				: 0,										// 触摸开始获取的第一个值
	_touchDeltaY					: 0,										// 滑动的距离

	_moveStart						: true,									// 触摸移动是否开始
	_movePosition					: null,									// 触摸移动的方向（上、下）
	_movePosition_c				: null,									// 触摸移动的方向的控制
	_mouseDown					: false,									// 判断鼠标是否按下
	_moveFirst						: true,
	_moveInit							: false,

	_firstChange						: false,

	_map 								: $('.ylmap'),							// 地图DOM对象
	_mapValue						: null,									// 地图打开时，存储最近打开的一个地图
	_mapIndex						: null,									// 开启地图的坐标位置

	_audioNode						: $('.u-audio'),						// 声音模块
	_audio								: null,									// 声音对象
	_audio_val							: true,									// 声音是否开启控制
	
	_elementStyle					: document.createElement('div').style,	// css属性保存对象

	_UC 									: RegExp("Android").test(navigator.userAgent)&&RegExp("UC").test(navigator.userAgent)? true : false,
	_weixin								: RegExp("MicroMessenger").test(navigator.userAgent)? true : false,
	_iPhoen							: RegExp("iPhone").test(navigator.userAgent)||RegExp("iPod").test(navigator.userAgent)||RegExp("iPad").test(navigator.userAgent)? true : false,
	_Android							: RegExp("Android").test(navigator.userAgent)? true : false,
	_IsPC								: function(){ 
												var userAgentInfo = navigator.userAgent; 
												var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"); 
												var flag = true; 
												for (var v = 0; v < Agents.length; v++) { 
													if (userAgentInfo.indexOf(Agents[v]) > 0) { flag = false; break; } 
												} 
												return flag; 
											} ,

/***********************
 *  = gobal通用函数
 ***********************/
 	// 判断函数是否是null空值
	_isOwnEmpty		: function (obj) { 
						for(var name in obj) { 
							if(obj.hasOwnProperty(name)) { 
								return false; 
							} 
						} 
						return true; 
					},
	// 微信初始化函数
	_WXinit			: function(callback){
						if(typeof window.WeixinJSBridge == 'undefined' || typeof window.WeixinJSBridge.invoke == 'undefined'){
							setTimeout(function(){
								this.WXinit(callback);
							},200);
						}else{
							callback();
						}
					},
	// 判断浏览器内核类型
	_vendor			: function () {
						var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
							transform,
							i = 0,
							l = vendors.length;
				
						for ( ; i < l; i++ ) {
							transform = vendors[i] + 'ransform';
							if ( transform in this._elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
						}
						return false;
					},
	// 判断浏览器来适配css属性值
	_prefixStyle	: function (style) {
						if ( this._vendor() === false ) return false;
						if ( this._vendor() === '' ) return style;
						return this._vendor() + style.charAt(0).toUpperCase() + style.substr(1);
					},
	// 判断是否支持css transform-3d（需要测试下面属性支持）
	_hasPerspective	: function(){
						var ret = this._prefixStyle('perspective') in this._elementStyle;
						if ( ret && 'webkitPerspective' in this._elementStyle ) {
							this._injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
								ret = node.offsetLeft === 9 && node.offsetHeight === 3;
							});
						}
						return !!ret;
					},
		_translateZ : function(){
						if(car2._hasPerspective){
							return ' translateZ(0)';
						}else{
							return '';
						}
					},

	// 判断属性支持是否
	_injectStyles 	: function( rule, callback, nodes, testnames ) {
						var style, ret, node, docOverflow,
							div = document.createElement('div'),
							body = document.body,
							fakeBody = body || document.createElement('body'),
							mod = 'modernizr';

						if ( parseInt(nodes, 10) ) {
							while ( nodes-- ) {
								node = document.createElement('div');
								node.id = testnames ? testnames[nodes] : mod + (nodes + 1);
								div.appendChild(node);
								}
						}

						style = ['&#173;','<style id="s', mod, '">', rule, '</style>'].join('');
						div.id = mod;
						(body ? div : fakeBody).innerHTML += style;
						fakeBody.appendChild(div);
						if ( !body ) {
							fakeBody.style.background = '';
							fakeBody.style.overflow = 'hidden';
							docOverflow = docElement.style.overflow;
							docElement.style.overflow = 'hidden';
							docElement.appendChild(fakeBody);
						}

						ret = callback(div, rule);
						if ( !body ) {
							fakeBody.parentNode.removeChild(fakeBody);
							docElement.style.overflow = docOverflow;
						} else {
							div.parentNode.removeChild(div);
						}

						return !!ret;
					},
	// 自定义事件操作
 	_handleEvent 	: function (type) {
						if ( !this._events[type] ) {
							return;
						}

						var i = 0,
							l = this._events[type].length;

						if ( !l ) {
							return;
						}

						for ( ; i < l; i++ ) {
							this._events[type][i].apply(this, [].slice.call(arguments, 1));	
						}
					},
	// 给自定义事件绑定函数
	_on				: function (type, fn) {
						if ( !this._events[type] ) {
							this._events[type] = [];
						}

						this._events[type].push(fn);
					},
	//禁止滚动条
	_scrollStop		: function(){
						//禁止滚动
						$(window).on('touchmove.scroll',this._scrollControl);
						$(window).on('scroll.scroll',this._scrollControl);
					},
	//启动滚动条
	_scrollStart 	: function(){		
						//开启屏幕禁止
						$(window).off('touchmove.scroll');
						$(window).off('scroll.scroll');
					},
	//滚动条控制事件
	_scrollControl	: function(e){e.preventDefault();},



/**************************************************************************************************************/
/*  关联处理函数
***************************************************************************************************************/
/**
 *  单页面-m-page 切换的函数处理
 *  -->绑定事件
 *  -->事件处理函数
 *  -->事件回调函数
 *  -->事件关联函数【
 */
 	// 页面切换开始
 	page_start		: function(){
 		car2._page.on('touchstart mousedown',car2.page_touch_start);
 		car2._page.on('touchmove mousemove',car2.page_touch_move);
 		car2._page.on('touchend mouseup',car2.page_touch_end);
 	},

 	// 页面切换停止
 	page_stop		: function(){
		car2._page.off('touchstart mousedown');
 		car2._page.off('touchmove mousemove');
 		car2._page.off('touchend mouseup');
 	},

 	// page触摸移动start
 	page_touch_start: function(e){
 		if(!car2._moveStart) return;

 		if(e.type == "touchstart"){
        	car2._touchStartValY = window.event.touches[0].pageY;
        }else{
        	car2._touchStartValY = e.pageY||e.y;
        	car2._mouseDown = true;
        }

        car2._moveInit = true;

        // start事件
        car2._handleEvent('start');
 	},

 	// page触摸移动move
 	page_touch_move : function(e){
 		e.preventDefault();

		if(!car2._moveStart) return;
		if(!car2._moveInit) return;

		// 设置变量值
 		var $self = car2._page.eq(car2._pageNow),
 			h = parseInt($self.height()),
 			moveP,
 			scrollTop,
 			node=null,
 			move=false;

 		// 获取移动的值
 		if(e.type == "touchmove"){
        	moveP = window.event.touches[0].pageY;
        	move = true;
        }else{
        	if(car2._mouseDown){
        		moveP = e.pageY||e.y;
        		move = true;
        	}else return;
        }

		// 获取下次活动的page
        node = car2.page_position(e,moveP,$self);

		// page页面移动 		
 		car2.page_translate(node);

        // move事件
        car2._handleEvent('move');
 	},

 	// page触摸移动判断方向
 	page_position	: function(e,moveP,$self){ 		
 		var now,next;
	
 		// 设置移动的距离
 		if(moveP!='undefined') car2._touchDeltaY = moveP - car2._touchStartValY;

 		// 设置移动方向
    	car2._movePosition = moveP - car2._touchStartValY >0 ? 'down' : 'up';
    	if(car2._movePosition!=car2._movePosition_c){
    		car2._moveFirst = true;
    		car2._movePosition_c = car2._movePosition;
    	}else{
			car2._moveFirst = false;
    	}

		// 设置下一页面的显示和位置        
        if(car2._touchDeltaY<=0){
        	if($self.next('.m-page').length == 0){
        		if (car2._firstChange) {
 					car2._pageNext = 0;	
 				} else {
 					return;
 				}
        	}else if(car2._pageNow == 3){
				return;
			}else {
        		car2._pageNext = car2._pageNow+1;	
        	}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}else{
 			if($self.prev('.m-page').length == 0 ) {
 				if (car2._firstChange) {
 					car2._pageNext = car2._pageNum - 1;
 				} else {
 					return;
 				}
 			}else {
 				car2._pageNext = car2._pageNow-1;	
 			}
 			
 			next = car2._page.eq(car2._pageNext)[0];
 		}

 		now = car2._page.eq(car2._pageNow)[0];
 		node = [next,now];

 		// move阶段根据方向设置页面的初始化位置--执行一次
 		if(car2._moveFirst) init_next(node);

 		function init_next(node){
 			var s,l,_translateZ = car2._translateZ();

 			car2._page.removeClass('action');
 			$(node[1]).addClass('action').removeClass('f-hide');
 			car2._page.not('.action').addClass('f-hide');
 			
 			// 模版高度适配函数处理
	 		car2.height_auto(car2._page.eq(car2._pageNext),'false');

 			// 显示对应移动的page
			$(node[0]).removeClass('f-hide').addClass('active'); 

	 		// 设置下一页面的显示和位置        
	        if(car2._movePosition=='up'){
 				s = parseInt($(window).scrollTop());
 				if(s>0) l = $(window).height()+s;
 				else l = $(window).height();
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+l+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',l);

 				$(node[1]).attr('data-translate',0);
	 		}else{
 				node[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+Math.max($(window).height(),$(node[0]).height())+'px)'+_translateZ;
 				$(node[0]).attr('data-translate',-Math.max($(window).height(),$(node[0]).height()));

 				$(node[1]).attr('data-translate',0);
	 		}
 		}
 		
 		return node;
 	},

 	// page触摸移动设置函数
 	page_translate	: function(node){
 		// 没有传值返回
 		if(!node) return;
		
 		var _translateZ = car2._translateZ(),
 			y_1,y_2,scale,
 			y = car2._touchDeltaY;

 		// 切换的页面移动
 		if($(node[0]).attr('data-translate')) y_1 = y + parseInt($(node[0]).attr('data-translate'));
		node[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y_1+'px)'+_translateZ;
		
		// 当前的页面移动
		if($(node[1]).attr('data-translate')) y_2 = y + parseInt($(node[1]).attr('data-translate'));
		scale = 1 - Math.abs(y*0.2/$(window).height());
		y_2 = y_2/5;
		node[1].style[car2._prefixStyle('transform')] = 'translate(0,'+y_2+'px)'+_translateZ+' scale('+scale+')';
 	},

 	// page触摸移动end
 	page_touch_end	: function(e){
 		car2._moveInit = false;
 		car2._mouseDown = false;
 		if(!car2._moveStart) return;
 		if(!car2._pageNext&&car2._pageNext!=0) return;

 		car2._moveStart = false;

 		// 确保移动了
 		if(Math.abs(car2._touchDeltaY)>10){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 			car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = 'all .3s';
 		}
			
		// 页面切换
 		if(Math.abs(car2._touchDeltaY)>=100){		// 切换成功
 			car2.page_success();
 		}else if(Math.abs(car2._touchDeltaY)>10&&Math.abs(car2._touchDeltaY)<100){	// 切换失败		
 			car2.page_fial();
 		}else{									// 没有切换
 			car2.page_fial();
 		}

 		// end事件
        car2._handleEvent('end');

        // 注销控制值
 		car2._movePosition = null;
 		car2._movePosition_c = null;
 		car2._touchStartValY = 0;
 	},

 	// 切换成功
 	page_success	: function(){
 		var _translateZ = car2._translateZ();

 		// 下一个页面的移动
 		car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ;

 		// 当前页面变小的移动
 		var y = car2._touchDeltaY > 0 ? $(window).height()/5 : -$(window).height()/5;
 		var scale = 0.8;
 		//var scale = 1;
 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+y+'px)'+_translateZ+' scale('+scale+')';

 		// 成功事件
    	car2._handleEvent('success');
 	},

 	// 切换失败
 	page_fial	: function(){
 		var _translateZ = car2._translateZ();

 		// 判断是否移动了
		if(!car2._pageNext&&car2._pageNext!=0) {
			car2._moveStart = true;
			car2._moveFirst = true;
			return;
		}

 		if(car2._movePosition=='up'){
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,'+$(window).height()+'px)'+_translateZ;
 		}else{
 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = 'translate(0,-'+$(window).height()+'px)'+_translateZ;
 		}

 		car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = 'translate(0,0)'+_translateZ+' scale(1)';

 		// fial事件
    	car2._handleEvent('fial');
 	},

/**
 *  对象函数事件绑定处理
 *  -->start touch开始事件
 *  -->mov   move移动事件
 *  -->end   end结束事件
 */
 	haddle_envent_fn : function(){
 		// 当前页面移动，延迟加载以后的图片
		car2._on('start',car2.lazy_bigP);

		// 当前页面移动
		car2._on('move',function(){
			
		});

		// 切换失败事件
		car2._on('fial',function(){
			setTimeout(function(){
				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			car2._page.eq(car2._pageNext).removeClass('active').addClass('f-hide');
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._touchDeltaY = 0;
				car2._page.eq(car2._pageNow).attr('style','');
	 		},300)
		})

		// 切换成功事件
		car2._on('success',function(){
			// 判断最后一页让，开启循环切换
			if (car2._pageNext == 0 && car2._pageNow == car2._pageNum -1) {
				car2._firstChange = false;
			}

			// 判断是否是最后一页，让轻APP关联页面隐藏
 			if(car2._page.eq(car2._pageNext).next('.m-page').length != 0){
 				car2.lightapp_intro_hide(true);
 			}
			setTimeout(function(){
	 			car2._page.eq(car2._pageNow).addClass('f-hide');

				car2._page.eq(car2._pageNow).attr('data-translate','');
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transform')] = '';
 				car2._page.eq(car2._pageNow)[0].style[car2._prefixStyle('transition')] = '';
 				car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transform')] = '';
	 			car2._page.eq(car2._pageNext)[0].style[car2._prefixStyle('transition')] = '';

	 			// 初始化切换的相关控制值
	 			$('.p-ct').removeClass('fixed');
	 			car2._page.eq(car2._pageNext).removeClass('active');
				car2._page.eq(car2._pageNext).removeClass('fixed');
				car2._pageNow = car2._pageNext;
				car2._moveStart = true;
				car2._moveFirst = true;
				car2._pageNext = null;
				car2._page.eq(car2._pageNow).attr('style','');
				car2._page.eq(car2._pageNow).removeClass('fixed');
				car2._page.eq(car2._pageNow).attr('data-translate','');
				car2._touchDeltaY = 0;

				// 切换成功后，执行当前页面的动画---延迟200ms
				setTimeout(function(){
					if(car2._page.eq(car2._pageNow).hasClass('z-animate')) return;
					car2._page.eq(car2._pageNow).addClass('z-animate');
				},20)

				// 隐藏图文组件的文本
				$('.j-detail').removeClass('z-show');
				$('.txt-arrow').removeClass('z-toggle');

				// 切换停止视频的播放
				$('video').each(function(){
					if(!this.paused) this.pause();
				})

				// 判断是否滑动最后一页，并让轻APP介绍关联页面贤淑
	 			if(car2._page.eq(car2._pageNow).next('.m-page').length == 0){
	 				car2.lightapp_intro_show();
	 				car2.lightapp_intro();
	 			}
	 		},300)
		})
 	},

/**
 *  media资源管理
 *  -->绑定声音控制事件
 *  -->函数处理声音的开启和关闭
 *  -->异步加载声音插件（延迟做）
 *  -->声音初始化
 *  -->视频初始化
 *  -->声音和视频切换的控制
 */
 	// 声音初始化
 	audio_init : function(){
 		// media资源的加载
		var options_audio = {
			loop: true,
            preload: "auto",
            src: car2._audioNode.attr('data-src')
		}
		
        car2._audio = new Audio(); 

        for(var key in options_audio){
            if(options_audio.hasOwnProperty(key) && (key in car2._audio)){
                car2._audio[key] = options_audio[key];
            }
        }
        car2._audio.load();
 	},

 	// 声音事件绑定
 	audio_addEvent : function(){
 		if(car2._audioNode.length<=0) return;

 		// 声音按钮点击事件
 		var txt = car2._audioNode.find('.txt_audio'),
 			time_txt = null;
 		car2._audioNode.find('.btn_audio').on('click',car2.audio_contorl);

 		// 声音打开事件
 		$(car2._audio).on('play',function(){
 			car2._audio_val = false;
			$('.audio_open').removeClass('audio_close');
 		})

 		// 声音关闭事件
 		$(car2._audio).on('pause',function(){
			$('.audio_open').addClass('audio_close');
 		})

 		function audio_txt(txt,val,time_txt){
 			if(val) txt.text('打开');
 			else txt.text('关闭');

 			if(time_txt) clearTimeout(time_txt);

 			txt.removeClass('z-move z-hide');
 			time_txt = setTimeout(function(){
 				txt.addClass('z-move').addClass('z-hide');
 			},1000)
 		}
 	},

 	// 声音控制函数
 	audio_contorl : function(){
 		if(!car2._audio_val){
 			car2.audio_stop();
 		}else{
 			car2.audio_play();
 		}
 	},	

 	// 声音播放
 	audio_play : function(){
 		car2._audio_val = false;
 		if(car2._audio) car2._audio.play();
 	},

 	// 声音停止
 	audio_stop	: function(){
 		car2._audio_val = true;
 		if(car2._audio) car2._audio.pause(); 
 	},

 	// 视频初始化
 	video_init : function(){
 		// 视频
        $('.j-video').each(function(){
        	var option_video = {
        		controls: 'controls',
        		preload : 'none',
        		// poster : $(this).attr('data-poster'),
        		width : $(this).attr('data-width'),
        		height : $(this).attr('data-height'),
        		src : $(this).attr('data-src')
        	}

        	var video = $('<video class="f-hide"></video>')[0];

        	for(var key in option_video){
                if(option_video.hasOwnProperty(key) && (key in video)){
                    video[key] = option_video[key];
                }
                this.appendChild(video);
            }

            var img = $(video).prev();

            $(video).on('play',function(){
            	img.hide();
            	$(video).removeClass('f-hide');
            });

            $(video).on('pause',function(){
            	img.show();
            	$(video).addClass('f-hide');
            });
        })

        $('.j-video .img').on('click',function(){
        	var video = $(this).next()[0];

        	if(video.paused){
        		$(video).removeClass('f-hide');
        		video.play();
        		$(this).hide();
        	}
        })
 	},

 	//处理声音和动画的切换
	media_control : function(){
		if(!car2._audio) return;
		if($('video').length<=0) return;

		$(car2._audio).on('play', function(){
			$('video').each(function(){
				if(!this.paused){
					this.pause();
				}
			});	
		});

		$('video').on('play', function(){
			if(!car2._audio_val){
				car2.audio_contorl();			
			}
		});
	},

	// media管理初始化
	media_init : function(){
		// 声音初始化
		car2.audio_init();

        // 视频初始化
        car2.video_init();

		// 绑定音乐加载事件
		car2.audio_addEvent();

		// 音频切换
		car2.media_control();
	},

/**
 *  图片延迟加载功能
 *  -->替代需要延迟加载的图片
 *  -->优化加载替代图片
 *  -->切换功能触发图片的延迟加载
 *  -->替代图片为400*400的透明大图片
 */
	/* 图片延迟加载 */
	lazy_img : function(){
		var lazyNode = $('.lazy-img');
		lazyNode.each(function(){
			var self = $(this);
			if(self.is('img')){
				self.attr('src','images/load.gif');
			}else{
				// 把原来的图片预先保存下来
				var position = self.css('background-position'),
					size = self.css('background-size');

				self.attr({
					'data-position' : position,
					'data-size'	: size
				});

				if(self.attr('data-bg')=='no'){
					self.css({
						'background-repeat'	: 'no-repeat'
					})
				}

				self.css({
					'background-image'	: 'url(images/load.gif)',
					'background-size'	: '120px 120px',
					'background-position': 'center'
				})

				if(self.attr('data-image')=='no'){
					self.css({
						'background-image'	: 'none'
					})
				}
			}
		})
	},

	// 开始加载前三个页面
	lazy_start : function(){
		// 前三个页面的图片延迟加载
		setTimeout(function(){
			for(var i=0;i<30;i++){
				var node = $(".m-page").eq(i);
				if(node.length==0) break;
				if(node.find('.lazy-img').length!=0){
					car2.lazy_change(node,false);
					// 飞出窗口的延迟
					if(node.attr('data-page-type')=='flyCon'){
						car2.lazy_change($('.m-flypop'),false);
					}
				}else continue;
			}
		},200)
	},
	
	// 加载当前后面第三个
	lazy_bigP : function(){
		for(var i=30;i<=5;i++){
			var node = $(".m-page").eq(car2._pageNow+i);
			if(node.length==0) break;
			if(node.find('.lazy-img').length!=0){
				car2.lazy_change(node,true);
				// 飞出窗口的延迟
				if(node.attr('data-page-type')=='flyCon'){
					car2.lazy_change($('.m-flypop'),false);
				}
			}else continue;
		}
	},

	// 图片延迟替换函数
	lazy_change : function(node,goon){
		// 3d图片的延迟加载
		if(node.attr('data-page-type')=='3d') car2.lazy_3d(node);

		// 飞出窗口的延迟
		if(node.attr('data-page-type')=='flyCon'){
			var img = $('.m-flypop').find('.lazy-img');
			img.each(function(){
				var self = $(this),
					srcImg = self.attr('data-src');

				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}
					})
					.attr("src",srcImg);
			})
		}

		// 其他图片的延迟加载
		var lazy = node.find('.lazy-img');
		lazy.each(function(){
			var self = $(this),
				srcImg = self.attr('data-src'),
				position = self.attr('data-position'),
				size = self.attr('data-size');

			if(self.attr('data-bg')!='no'){
				$('<img />')
					.on('load',function(){
						if(self.is('img')){
							self.attr('src',srcImg)
						}else{
							self.css({
								'background-image'	: 'url('+srcImg+')',
								'background-position'	: '0 0',
								'background-size' : '640px 1136px'
							})
						}

						// 判断下面页面进行加载
						if(goon){
							for(var i =0;i<$(".m-page").size();i++){
								var page = $(".m-page").eq(i);
								if($(".m-page").find('.lazy-img').length==0) continue
								else{
									car2.lazy_change(page,true);
								}
							}
						}
					})
					.attr("src",srcImg);

				self.removeClass('lazy-img').addClass('lazy-finish');
			}else{
				if(self.attr('data-auto')=='yes') self.css('background','none');
			}
		})	
	},

/**************************************************************************************************************/
/*  单个处理函数
***************************************************************************************************************/
/**
 * 单个函数处理-unit
 * -->高度的计算
 * -->文本的展开
 * -->文本的收起
 * -->输入表单的操作
 * -->微信的分享提示
 */
	// 根据设备的高度，来适配每一个模版的高度，并且静止滑动
	// --文档初始化计算
	// --页面切换完成计算
	height_auto	: function(ele,val){
		ele.children('.page-con').css('height','auto');
		var height = $(window).height();

		// 需要解除固定高度的page卡片
		var vial = true;
		if(!vial){
			if(ele.height()<=height){
				ele.children('.page-con').height(height+2);
				if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
			}else{
				car2._scrollStart();
				if(val=='true') $('.p-ct').removeClass('fixed');
				ele.children('.page-con').css('height','100%');
				return;
			}
		}else{
			ele.children('.page-con').height(height+2);
			if((!$('.p-ct').hasClass('fixed'))&&val=='true') $('.p-ct').addClass('fixed');
		}
	},

	// 显示轻APP按钮
	lightapp_intro_show : function(){
		$('.market-notice').removeClass('f-hide');
		setTimeout(function(){
			$('.market-notice').addClass('show');
		},100)
	},

	// 隐藏轻APP按钮
	lightapp_intro_hide : function(val){
		if(val){
			$('.market-notice').addClass('f-hide').removeClass('show');
			return;
		} 

		$('.market-notice').removeClass('show');
		setTimeout(function(){
			$('.market-notice').addClass('f-hide')
		},500)
	},

	// 轻APP介绍弹窗关联
	lightapp_intro : function(){
		// 点击按钮显示内容
		$('.market-notice').off('click');
		$('.market-notice').on('click',function(){
			$('.market-page').removeClass('f-hide');
			setTimeout(function(){
				$('.market-page').addClass('show');
				setTimeout(function(){
					$('.market-img').addClass('show');
				},100)
				car2.lightapp_intro_hide();
			},100)

			// 禁止滑动
			car2.page_stop();
			car2._scrollStop();
		});

		// 点击窗口让内容隐藏
		$('.market-page').off('click');
		$('.market-page').on('click',function(e){
			if($(e.target).hasClass('market-page')){
				$('.market-img').removeClass('show');
				setTimeout(function(){
					$('.market-page').removeClass('show');
					setTimeout(function(){
						$('.market-page').addClass('f-hide');
					},200)
				},500)
				car2.lightapp_intro_show();

				// 禁止滑动
				car2.page_start();
				car2._scrollStart();
			}
		});
	},

 	// loading显示
	loadingPageShow : function(){
		$('.u-pageLoading').show();
	},
	
	// loading隐藏
	loadingPageHide : function (){
		$('.u-pageLoading').hide();	
	},

	// 对象私有变量刷新
	refresh	: function(){
		$(window).height() = $(window).height();
		car2._windowWidth = $(window).width();
	},

/**************************************************************************************************************/
/*  函数初始化
***************************************************************************************************************/
/**
 * app初始化
 */
	// 样式适配
	styleInit : function(){
		// 禁止文版被拖动
		document.body.style.userSelect = 'none';
		document.body.style.mozUserSelect = 'none';
		document.body.style.webkitUserSelect = 'none';

		// 判断设备的类型并加上class
		if(car2._IsPC()) $(document.body).addClass('pc');
		else $(document.body).addClass('mobile');
		if(car2._Android) $(document.body).addClass('android');
		if(car2._iPhoen) $(document.body).addClass('iphone');

		// 判断是否有3d
		if(!car2._hasPerspective()){
			car2._rotateNode.addClass('transformNode-2d');
			$(document.body).addClass('no-3d');
		}
		else{
			car2._rotateNode.addClass('transformNode-3d');
			$(document.body).addClass('perspective');
			$(document.body).addClass('yes-3d');
		}

		// 图片延迟加载的处理
		this.lazy_img();
		
		// 模版提示文字显示
		setTimeout(function(){
			$('.m-alert').find('strong').addClass('z-show');
		},1000)

		$('.u-arrow').on('touchmove',function(e){e.preventDefault()})

		$('.p-ct').height($(window).height());
		$('.m-page').height($(window).height());
		$('#j-mengban').height($(window).height());
		$('.translate-back').height($(window).height());
	},
	
	//随机数函数
	/*
	num 要产生多少个随机数
	from 产生随机数的最小值
	to 产生随机数的最大值
	*/
	createRandom : function(num,from,to){
		var arr=[];
		for(var i=from;i<=to;i++)
			arr.push(i);
		arr.sort(function(){
			return 0.5-Math.random();
		});
		arr.length=num;
		return arr;
	},	
	// 加载函数
	pageLoad : function (){
		var numRandom = car2.createRandom(1,90,96);
		car2._setIntervalPageLoad = setInterval(function(){		
			$('.percent').html(car2._load);			
			if(car2._load < numRandom){				
				car2._load = car2._load + 1;
				//加载进度
				var baLeft = -300 + car2._load * 3;
				$('.loading-bar').css("marginLeft",baLeft);
			}	
		},40)	
	},
	pageLoad100 : function (){
		car2._setIntervalPageLoad100 = setInterval(function(){	
			$('.percent').html(car2._load);					
			if(car2._load < 100){			
				car2._load = car2._load + 1;
				//加载进度
				var baLeft = -300 + car2._load * 3;
				$('.loading-bar').css("marginLeft",baLeft);
			}	
		},50)	
	},
	//背景音乐播放事件，音效播放完毕后播放背景音乐
	playBGM : function(){
		if(!car2._audio_val){
			car2._audio.play();	
		}
	},
	//
	//游戏得分判断逻辑
	scoreJudge : function(index){
		//锤子动作
		$('#wz3-hammer').rotate({
            duration: 100,
            angle: -50,
            animateTo: 0
        })
		
		//计算并更新得分
		var strPeople = '#wz3-people-' + index;	
		if($(strPeople).hasClass('up')){//得分
			if(index == 1 || index == 4 || index == 7){//打击声音根据人物不同而不同
				car2._audioSuccess1.play();
			}else if(index == 2 || index == 5 || index == 8){
				car2._audioSuccess2.play();
			}else{
				car2._audioSuccess3.play();
			}			
			car2._score = car2._score + 10;	
		}else{//扣分
			if(car2._audioWrongNum % 4 == 0){
				car2._audioWrong1.play();	
				car2._audioWrongNum = 0;
			}else if(car2._audioWrongNum % 4 == 1){
				car2._audioWrong2.play();				
			}else if(car2._audioWrongNum % 4 == 2){
				car2._audioWrong3.play();				
			}else if(car2._audioWrongNum % 4 == 3){
				car2._audioWrong4.play();				
			}
			car2._audioWrongNum++;
			car2._score = car2._score - 10;
			if(car2._score <= 0){
				car2._score = 0;
			}
		}
		$('.wz3-score').html(car2._score);
		
		//人物被砸后的动作
		$(strPeople).removeClass('up');	
		if(index == 2){
			$('.wz3-people-2-animation').addClass('f-hide');	
		}else if(index == 9){
			$('.wz3-people-9-animation').addClass('f-hide');	
		}
		$(strPeople).addClass('out');	
		setTimeout(function(){
			$(strPeople).removeClass('out');
			if(index == 2){
				$('.wz3-people-2-animation').removeClass('f-hide');	
			}else if(index == 9){
				$('.wz3-people-9-animation').removeClass('f-hide');	
			}
		},200);
	},
	
	//游戏初始化
	gameInit : function(){		
		//初始化人物状态
		for(var i = 1; i<=10; i++){
			var strPeople = '#wz3-people-' + i;
			$(strPeople).removeClass('up');
			$(strPeople).removeClass('out');
		}
		//初始化锤子位置
		$('#wz3-hammer').css({'left' : '640px', 'top' : '800px'});
		
		//添加音效播放完毕事件，android兼容代码
		if(!car2._iPhoen){
			car2._audioSuccess1.addEventListener('ended', car2.playBGM, false);
			car2._audioSuccess2.addEventListener('ended', car2.playBGM, false);
			car2._audioSuccess3.addEventListener('ended', car2.playBGM, false);
			car2._audioWrong1.addEventListener('ended', car2.playBGM, false);
			car2._audioWrong2.addEventListener('ended', car2.playBGM, false);
			car2._audioWrong3.addEventListener('ended', car2.playBGM, false);
			car2._audioWrong4.addEventListener('ended', car2.playBGM, false);			
		}
		
		//添加点击事件
		var tap = 'touchstart  ';	
		$('#people-1').on(tap,function(){		
			$('#wz3-hammer').css({'left' : '78px', 'top' : '16px'});
			car2.scoreJudge(1);
		});		
		$('#people-2').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '78px', 'top' : '150px'});
			car2.scoreJudge(2);
		});		
		$('#people-3').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '78px', 'top' : '310px'});
			car2.scoreJudge(3);		
		});		
		$('#people-4').on(tap,function(){
			$('#wz3-hammer').css({'left' : '78px', 'top' : '465px'});
			car2.scoreJudge(4);				
		});		
		$('#people-5').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '78px', 'top' : '596px'});
			car2.scoreJudge(5);					
		});		
		$('#people-6').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '566px', 'top' : '16px'});
			car2.scoreJudge(6);		
		});		
		$('#people-7').on(tap,function(){
			$('#wz3-hammer').css({'left' : '566px', 'top' : '150px'});
			car2.scoreJudge(7);		
		});		
		$('#people-8').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '566px', 'top' : '310px'});
			car2.scoreJudge(8);				
		});		
		$('#people-9').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '566px', 'top' : '465px'});
			car2.scoreJudge(9);				
		});		
		$('#people-10').on(tap,function(){	
			$('#wz3-hammer').css({'left' : '566px', 'top' : '596px'});
			car2.scoreJudge(10);					
		});		
		
		//初始化得分、评语和游戏时间
		car2._score = 0;
		$('.wz4-1-1').addClass('f-hide');
		$('.wz4-1-2').addClass('f-hide');
		$('.wz4-1-3').addClass('f-hide');
		$('.wz4-1-4').addClass('f-hide');
		car2._timer = car2._initTimer;
		$('.wz3-score').html('0');
		$('.timer').html(car2._initTimer);
		$('.wz4-percent').html('20');
		$('.wz4-percent').addClass('f-hide');
		
		car2.gameMain();	
	},
	//游戏主函数
	gameMain : function(){
		//游戏时间倒计时
		car2._setIntervalGameTimer = setInterval(function(){		
			car2._timer--;
			if(car2._timer == 0){
				$('.timer').html('00');	
				car2.gameOver();
			}else if(car2._timer < 10){
				$('.timer').html('0' + car2._timer);	
			}else{
				$('.timer').html(car2._timer);
			}
		},1000);	
		
		//游戏时间，随机出现人物伸手
		car2._setIntervalGameMain = setInterval(function(){		
			var index = Math.ceil(Math.random() * 10);
			var strPeople = '#wz3-people-' + index;
			if(!$(strPeople).hasClass('up')){	
				$(strPeople).addClass('up');	
				setTimeout(function(){//2秒钟后，人物自动缩手时间
					$(strPeople).removeClass('up');
				},1500)
			}			
		},500);			
	},
	//游戏结束函数
	gameOver : function(){		
		//取消游戏点击事件
		for(var i = 1; i<=10; i++){
			var strPeople = '#people-' + i;
			$(strPeople).unbind();
		}
		
		//取消游戏倒计时
		clearInterval(car2._setIntervalGameTimer);
		clearInterval(car2._setIntervalGameMain);
		
		//根据得分显示分数及评语
		var percent = car2.createRandom(1, 10, 24);//不同分数不同百分比
		
		$('.wz4-score').html(car2._score);
		if(car2._score < 200){
			$('.wz4-1-1').removeClass('f-hide');
		}else if(car2._score < 400){
			$('.wz4-percent').removeClass('f-hide');
			$('.wz4-1-2').removeClass('f-hide');
			if(car2._score > 350){
				percent = car2.createRandom(1, 75, 99);
			}else if(car2._score > 300){
				percent = car2.createRandom(1, 50, 74);
			}else if(car2._score > 250){
				percent = car2.createRandom(1, 25, 49);
			}	
		}else if(car2._score < 600){
			$('.wz4-1-3').removeClass('f-hide');
		}else{
			$('.wz4-1-4').removeClass('f-hide');
		}
		$('.wz4-percent').html(percent);
		//显示游戏结果页
		$('.page-3').addClass('f-hide');
                var bug = 0;
                if(car2._score < 1000){
                    var ajaxUrl = $("#url").val();
                    var params = {
                        score : car2._score
                    }
                    $.post(ajaxUrl, params, function (data) {
                        if (data.error == 0) {
                        } else {
                        }
                    }, 'json');
                }else{
                    bug = 1;
                }
		$('.page-4').removeClass('f-hide'); 
                if (bug){
                    $(".bug").show();
                }
	},
	// 对象初始化
	init : function(){
		// 样式，标签的渲染
		// 对象操作事件处理
		this.styleInit();
		this.haddle_envent_fn();
		car2.pageLoad();		
		
		$('input[type="hidden"]').appendTo($('body'));
		
		// 图片预先加载
		$('<img />').attr('src',$('.m-fengye').find('.page-con').attr('data-src'));
		$('<img />').attr('src',$('.m-page').find('.page-con').attr('data-src'));
		$('<img />').attr('src',$('.wz1-1').attr('data-src'));		
		$('<img />').attr('src',$('.wz1-2-1').attr('data-src'));	
		$('<img />').attr('src',$('.wz1-2-2').attr('data-src'));		
		$('<img />').attr('src',$('.wz1-3').attr('data-src'));		
		$('<img />').attr('src',$('.wz1-4').attr('data-src'));		
		$('<img />').attr('src',$('.wz1-5').attr('data-src'));		
		$('<img />').attr('src',$('.wz2-1').attr('data-src'));		
		$('<img />').attr('src',$('.wz2-2').attr('data-src'));		
		$('<img />').attr('src',$('.wz2-3').attr('data-src'));		
		$('<img />').attr('src',$('.wz2-4-1').attr('data-src'));	
		$('<img />').attr('src',$('.wz2-4-2').attr('data-src'));		
		$('<img />').attr('src',$('.wz3-hammer').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-1').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-2').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-3').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-4').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-5').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-6').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-7').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-8').attr('data-src'));				
		$('<img />').attr('src',$('.wz3-people-9').attr('data-src'));			
		$('<img />').attr('src',$('.wz3-people-10').attr('data-src'));	
		$('<img />').attr('src',$('.wz4-1-1').attr('data-src'));		
		$('<img />').attr('src',$('.wz4-1-2').attr('data-src'));	
		$('<img />').attr('src',$('.wz4-1-3').attr('data-src'));	
		$('<img />').attr('src',$('.wz4-1-4').attr('data-src'));		
		$('<img />').attr('src',$('.wz4-2').attr('data-src'));			
		$('<img />').attr('src',$('.wz4-3-1').attr('data-src'));		
		$('<img />').attr('src',$('.wz4-3-2').attr('data-src'));		
		$('<img />').attr('src',$('.wz4-4').attr('data-src'));		
		$('<img />').attr('src',$('.wz5-1').attr('data-src'));		
		$('<img />').attr('src',$('.wz5-2').attr('data-src'));		
		$('<img />').attr('src',$('.wz5-3').attr('data-src'));		
		$('<img />').attr('src',$('.wz5-4').attr('data-src'));		
		$('<img />').attr('src',$('.wz5-5').attr('data-src'));		
		$('<img />').attr('src',$('.wz3-people-1-animation').attr('data-src'));	
		$('<img />').attr('src',$('.wz3-people-2-animation').attr('data-src'));	
		$('<img />').attr('src',$('.wz3-people-9-animation').attr('data-src'));	
		$('<img />').attr('src',$('.wz3-people-10-animation').attr('data-src'));			

		// loading执行一次
		var loading_time = new Date().getTime();
		
		$(window).on('load',function(){
			var now = new Date().getTime();
			var loading_end = false;
			var time;
			var time_del = now - loading_time;

			if ( time_del >= 500 ) {
				loading_end = true;
			}

			if ( loading_end ) {
				time = 0;
			} else {
				time = 500 - time_del;
			}
			car2.pageLoad100();	
			// loading完成后请求
			setTimeout(function(){
				// 模版提示隐藏
				setTimeout(function(){
					$('.m-alert').addClass('f-hide');
					car2.loadingPageHide();					
				},1000)

				// 显示封面内容
				setTimeout(function(){
					$('.translate-back').removeClass('f-hide');
					$('.m-fengye').removeClass('f-hide');
					$('.page-3').removeClass('f-hide');//为了避免显示延迟，提前显示游戏界面 	
					//car2.gameInit();
					car2.height_auto(car2._page.eq(car2._pageNow),'false');					

					//取消setInterval()
					clearInterval(car2._setIntervalPageLoad);
					clearInterval(car2._setIntervalPageLoad100);
					
					$('.timer').html(car2._initTimer);
				},1000)

				// media初始化
				car2.media_init();			
				
				// 播放声音
				if(!car2._audio) return;
				car2._audioNode.removeClass('f-hide');
				car2._audio.play();		
					        
				// 声音启动
				$(document).one("touchstart", function(){
		            car2._audio.play();
		        });
				
				setTimeout(function(){
					$('.wz1-2-2').addClass('f-hide');
					$('.wz1-1').removeClass('show-rotate');
					$('.wz1-4').removeClass('wz1-4-action');
					$('.wz1-4').addClass('show-rotate');
					$('.wz1-5').animate({left: 104}, 600);
				},2500)	
				
				setTimeout(function(){
					car2._shakeT = 1;
					//初始化摇一摇
					var myShakeEvent = new Shake({ 
				        threshold: 15 
				    }); 				 
				    myShakeEvent.start(); 				 
				    window.addEventListener('shake', shakeEventDidOccur, false); 
				},3100)
			
				//var tap = 'touchstart  ';	
				var tap = 'click  ';
				$('.wz1-5').on(tap,function(){	
                                        var error = $('#error').val();
                                        if (error == 2){
                                            $('.unsubscribe').show();
                                        }
                                        if (error == 4){
                                            $('.nonum').show();
                                        }
					$('.page-1').addClass('f-hide');	
					$('.page-2').removeClass('f-hide'); 
                                        
					setTimeout(function(){
						$('.wz2-4-1').animate({left: 301}, 400);
						$('.wz2-4-2').animate({left: 301}, 400);
					},1600)	
				});
				//开始游戏
				$('.wz2-4-2').on(tap,function(){			
					$('.page-2').addClass('f-hide');	
					car2._audioNode.addClass('f-hide');
					car2.gameInit();
				});
				//炫耀一下
				$('.wz4-3-1').on(tap,function(){	
					$('.page-4').addClass('f-hide');	
					$('.page-5').removeClass('f-hide'); 
				});
				//再玩一次
				$('.wz4-3-2').on(tap,function(){
                                    window.location.reload();
//					$('.page-4').addClass('f-hide');	
//					$('.page-3').removeClass('f-hide'); 
//					car2.gameInit();
				});
				
				// 延迟加载后面三个页面图片
				car2.lazy_start();

			 	$('.p-ct').height($(window).height());
				$('.m-page').height($(window).height());
				$('#j-mengban').height($(window).height());
				$('.translate-back').height($(window).height());
			},time)
		})
	}
};

/*初始化对象函数*/
car2.init();

//获取摇手机开始事件
function shakeEventDidOccur () {//
	if(car2._shakeT == 1){
		$('.page-1').addClass('f-hide');	
		$('.page-2').removeClass('f-hide'); 	 
		$('.page-3').removeClass('f-hide');//为了避免显示延迟，提前显示游戏界面 	 		
		setTimeout(function(){
			$('.wz2-4-1').animate({left: 301}, 400);
			$('.wz2-4-2').animate({left: 301}, 400);
		},1600)
		car2._shakeT = 0;
	}
}