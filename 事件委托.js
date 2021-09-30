/*
  事件委托
  parentDOM: 绑定委托事件的节点
  eventType: 事件类型
  selector: 选择器
  callback: 事件触发的回调
*/ 

function delegate(parentDOM,eventType,selector,callback){
  parentDOM.addEventListener(eventType,e => {
    let el = e.target;
    while(!el.matches(selector)){
      if(el === parentDOM){
        el = null
        break
      }
      el = el.parentNode
    }
    el && callback.call(el,e,el)
  })
}