/*
* 监听元素进入全屏和离开全屏
*/
function fullscreenchange_add(DOM,callBack){
  !(callBack instanceof Function) && (callBack = ()=> {})
  if(DOM){
    if (DOM.requestFullscreen) {
      DOM.addEventListener("fullscreenchange",callBack,false);
    }else if (DOM.msRequestFullscreen) {
      DOM.addEventListener("MSFullscreenChange",callBack,false);
    }
  }
}
/*
* 移除监听元素进入全屏和离开全屏
*/ 
function fullscreenchange_remove(DOM,callBack){
  !(callBack instanceof Function) && (callBack = ()=> {})
  if(DOM){
    if (DOM.requestFullscreen) {
      DOM.removeEventListener("fullscreenchange",callBack);
    }else if (DOM.msRequestFullscreen) {
      DOM.removeEventListener("MSFullscreenChange",callBack);
    }
  }
}
/*
* 当浏览器无法切换​​到全屏模式时，将触发该事件
*/
function fullscreenerror_add(DOM,callBack){
  !(callBack instanceof Function) && (callBack = ()=> {})
  if(DOM){
    if (DOM.requestFullscreen) {
      DOM.addEventListener("fullscreenerror",callBack,false);
    }else if (DOM.msRequestFullscreen) {
      DOM.addEventListener("MSFullscreenError",callBack,false);
    }else if (DOM.mozRequestFullScreen) {
      DOM.addEventListener("mozfullscreenerror",callBack,false);
    }
  }
}
/*
* 移除 当浏览器无法切换​​到全屏模式时触发的事件
*/
function fullscreenerror_remove(DOM,callBack){
  !(callBack instanceof Function) && (callBack = ()=> {})
  if(DOM){
    if (DOM.requestFullscreen) {
      DOM.removeEventListener("fullscreenerror",callBack);
    }else if (DOM.msRequestFullscreen) {
      DOM.removeEventListener("MSFullscreenError",callBack);
    }else if (DOM.mozRequestFullScreen) {
      DOM.removeEventListener("mozfullscreenerror",callBack);
    }
  }
}
/*
* 发起全屏请求
*/ 
function requestFullscreen(DOM) {
  if(DOM){
    if(DOM.requestFullscreen){
      return DOM.requestFullscreen();
    }else if(DOM.msRequestFullscreen){
      return DOM.msRequestFullscreen();
    }else if(DOM.mozRequestFullScreen){
      return DOM.mozRequestFullScreen();
    }else if(DOM.webkitRequestFullscreen){
      return DOM.webkitRequestFullscreen();
    }else{
      return Promise.reject()
    }
  }
}

/*
* 退出全屏
*/
function exitFullscreen() {
  if (document.exitFullscreen){
    document.exitFullscreen();
  }else if(document.msExitFullscreen){
    document.msExitFullscreen();
  }else if(document.mozCancelFullScreen){
    document.mozCancelFullScreen();
  }else if(document.webkitCancelFullScreen){
    document.webkitCancelFullScreen();
  }else{
    console.log("exitFullscreen API is not supported");
  }
}

/*
* 获取全屏元素
*/
function fullscreenElement() {
  if(document.fullscreenElement){
    return document.fullscreenElement;
  }else if(document.msFullscreenElement){
    return document.msFullscreenElement;
  }else if(document.mozFullScreenElement){
    return document.mozFullScreenElement;
  }else if(document.webkitFullscreenElement){
    return document.webkitFullscreenElement;
  }else{
    return null
  }
}
/*
* 该fullscreenEnabled属性返回文档是否能够全屏模式。
* 主要用途是检查iframe的contentDocument是否设置了allowfullscreen属性。
* 当iframe的contentDocument具有allowfullscreen属性时，fullscreenEnabled返回true，否则返回false。
* fullscreenEnabled不应该被用来检测一般全屏功能。
*/
function fullscreenEnabled(){
  if(document.fullscreenEnabled){
    return document.fullscreenEnabled;
  }else if(document.msFullscreenEnabled){ 
    return document.msFullscreenEnabled;
  }  else if (document.mozFullScreenEnabled){
    return document.mozFullScreenEnabled;
  }
}

const fs = {
  fullscreenchange_add,
  fullscreenchange_remove,
  fullscreenerror_add,
  fullscreenerror_remove,
  requestFullscreen,
  exitFullscreen,
} 
Object.defineProperties(fs,{
  fullscreenElement:{
    configurable:false,
    enumerable:true,
    get:fullscreenElement
  },
  fullscreenEnabled:{
    configurable:false,
    enumerable:true,
    get:fullscreenEnabled
  }
})

export default fs