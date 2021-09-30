  /* 
  * 大数相加 不考虑a，b包含小数
  * 返回的是number则没有越界，返回string则越界
  */ 
  export function bigNumberAdd(a,b){
    let sum = '';
    a = String(a).split('');
    b = String(b).split('');
    while(a.length || b.length || c){
      c += ~~a.pop() + ~~b.pop();
      sum = c % 10 + sum;
      c = c > 9;
    }
    return sum.replace(/^0+/,'')
  }
  function bigNumAdd(str1,str2){
    let flag = 0,abSum,
      sum = [];
    str1 = str1.split('');
    str2 = str2.split('');
    while(str1.length || str2.length){
      abSum = ~~str1.pop() +  ~~str2.pop() + flag;
      if(abSum <= 9){
        sum.unshift(abSum)
        flag = 0
      }else{
        sum.unshift(abSum - 10)
        flag = 1
      }
    }
    if(flag){
      sum.unshift(flag)
    }
    return sum.join('')
  }
  
  /* 
  * 节流函数
   */
export function throttle(fn,delay = 50){
  let flag = true;
  return (...arg) => {
    if(flag){
      flag = false;
      window.requestAnimationFrame(() => fn(...arg));
      setTimeout(() => flag = true,delay);
    }
  }
}
/* 
* 防抖函数
 */
export function debounce(fn,delay = 50){
  let timer = null;
  return (...arg) => {
    clearTimeout(timer)
    timer = setTimeout(() => window.requestAnimationFrame(() => fn(...arg)),delay)
  }
}
/*
  确定参数的函数柯里化
*/ 
export function curry(fn,...arg) {
  return fn.length > arg.length 
    ? (...params) => curry(fn,...arg,...params)
    :fn(...arg)
}
/*
  不定参数的函数柯里化
  求和
*/ 
export function curryLoop(...arg){
  const loop = (...params) => {
    arg.push(...params)
    return loop
  }
  loop.toString = () => {
    if(!arg.length){
      return 0
    }
    return arg.reduce((prev,next) => prev + next)
  }
  return loop
}
/*
  打平数组
  Array.prototype.flat(Infinity) // 打平任意深度嵌套
*/ 
export function flatAll(arr){
  return arr.length
    ?arr.reduce((prev,next) => {
      return Array.isArray(next)
        ?[...prev,...flatAll(next)]
        :[...prev,next]
    },[])
    :[]
}

/*
  深拷贝
*/
export function deepClone(obj,map = new WeakMap()){
  if(obj instanceof RegExp) return new RegExp(obj);
  if(obj instanceof Date) return new Date(obj);
  if(obj === null || typeof obj !== 'object') return obj;

  if(map.has(obj)) return map.get(obj);
  let emptyObj = new obj.constructor();
  map.set(obj,emptyObj);

  for(let key in obj){
    if(obj.hasOwnProperty(key)){
      emptyObj[key] = deepClone(obj[key],map)
    }
  }
  return emptyObj
}