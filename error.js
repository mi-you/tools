/*
*  自定义错误类型
*  创建自定义错误类型需要提供name属性和message属性
*  page:680
*/
class CustomError extends Error{
  constructor(message){
    super(message)
    this.name = 'CustomError';
    this.message = message;
  }
}
/*
*  把错误记录到服务器中
*  sev：严重程度
*  msg：错误消息
*  所有浏览器都支持Image对象，不受跨域影响，记录错误的过程很少出错
*/ 
function logError(sev,msg) {
  const img = new Image(),
        url = '',
        encodedSev = encodeURIComponent(sev),
        encodedMsg = encodeURIComponent(msg);
  img.src = `${url}?sev=${encodedSev}&msg${encodedMsg}`
}