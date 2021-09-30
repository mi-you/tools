/*
* 页面加载完成执行指定函数
* @params func是待执行函数名
*/
function addLoadEvent(func){
  var oldOnload = window.onload
  if(typeof oldOnload !== 'function'){
    window.onload = func
  }else{
    window.onload = function(){
      oldOnload()
      func()
    }
  }
}

/*
* throttle节流
*/
function throttle(fn,wait){
  var timer = null
  return function(){
    var arr = arguments,
        context = this;
    if(!timer){
      timer = setTimeout(function(){
        fn.apply(context,arr)
        timer = null
      },wait)
    }
  }
}

/*
* throttle节流
* 增加前缘
*/
var Throttle = (fn, wait, immediate) => {
	let timer, timeStamp=0;
	let context, args;
 
	let run = () => {
		timer=setTimeout(()=>{
			if(!immediate){
				fn.apply(context,args);
			}
			clearTimeout(timer);
			timer=null;
		},wait);
	}
 
	return function () {
		context=this;
		args=arguments;
		if(!timer){
			console.log("throttle, set");
			if(immediate){
				fn.apply(context,args);
			}
			run();
		}else{
			console.log("throttle, ignore");
		}
	}
 
}

/*
* debounce防抖
* 优化版： 定时器执行时，判断start time 是否向后推迟了，若是，设置延迟定时器
*/
var Debounce = (fn, wait) => {
	let timer, startTimeStamp=0;
	let context, args;
 
	let run = (timerInterval)=>{
		timer= setTimeout(()=>{
			let now = (new Date()).getTime();
			let interval=now-startTimeStamp
			if(interval<timerInterval){ // the timer start time has been reset, so the interval is less than timerInterval
				console.log('debounce reset',timerInterval-interval);
				startTimeStamp=now;
				run(wait-interval);  // reset timer for left time 
			}else{
				fn.apply(context,args);
				clearTimeout(timer);
				timer=null;
			}
			
		},timerInterval);
	}
 
	return function(){
		context=this;
		args=arguments;
		let now = (new Date()).getTime();
		startTimeStamp=now;
 
		if(!timer){
			console.log('debounce set',wait);
			run(wait);    // last timer alreay executed, set a new timer
		}
		
	}
 
}


// 对象转查询字符串
function objToQuery(obj) {
  let query = '?'
  if (typeof obj === 'object' && obj) {
    for(let [key,value] of Object.entries(obj)) {
      query += key + '=' + encodeURIComponent(value) + '&'
    }
  }
  return query.slice(0,-1)
}

 /* 
* DOM元素的放大缩小调整
* step:每次宽度调整数值
* minWidth:最小宽度
* maxWidth:最大宽度
* ratio:高 / 宽
* element:要操作的DOM元素，可以是选择器或者DOM元素
*/
export function scaleElement({step = 5,minWidth = 70,maxWidth = 760,ratio = 250 / 300,element} = {}){
  //如果元素不存在就退出
  if(!element){
    return
  }
  // 判断element是DOM还是选择器
  let isDOM,DOM;
  isDOM = ( typeof HTMLElement === 'object' ) 
    ? element instanceof HTMLElement 
    :element && typeof element === 'object' && 
    (element.nodeType === 1 && typeof element.nodeName === 'string' || element[0] && element[0].nodeType === 1 && typeof element[0].nodeName === 'string');
  if(typeof element === "string"){
    DOM = document.querySelectorAll(element)
  }else if(isDOM){
    DOM = element
  }else{
    return
  }

  // 定义变量、检测值的有效检测
  let stepX = parseInt(step) || 0,
      width = 0,
      height = 0;
  minWidth = parseInt(minWidth) || 0
  maxWidth = parseInt(maxWidth) || 0
  ratio = parseFloat(ratio) || 1

  // 遍历每个DOM元素设置尺寸
  Array.from(DOM).forEach(v => {
    if(v.style.width && v.style.height){
      width = parseInt(v.style.width),
      height = parseInt(v.style.height);
      setElementSize(v,width,height,stepX,minWidth,maxWidth,ratio)  
    }else{
      width = v.offsetWidth
      height = v.offsetHeight
      setElementSize(v,width,height,stepX,minWidth,maxWidth,ratio)  
    }
  })
}

// 设置DOM元素 v 的尺寸
function setElementSize(v,width,height,stepX,minWidth,maxWidth,ratio){
  let stepY = parseInt(stepX * ratio) || 0
  if(width + stepX >= minWidth && width + stepX <= maxWidth){
    v.style.width = width + stepX + "px"
    v.style.height = height + stepY + "px"
  }
  if(maxWidth >= minWidth && width + stepX < minWidth){
    v.style.width = minWidth + "px"
    v.style.height = minWidth * ratio + "px"
  }
  if(maxWidth >= minWidth && width + stepX > maxWidth){
    v.style.width = maxWidth + "px"
    v.style.height = maxWidth * ratio + "px"
  }
}
