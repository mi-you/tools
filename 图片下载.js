  /*
  * 图片下载1
  * url: String | Array(url)
  * imgName: String
  * 如果url指向同源资源，是正常的。如果url指向第三方资源，download会失效，
  * 表现和不使用download时一致——浏览器能打开的文件，浏览器会直接打开，不能打开的文件，会直接下载。浏览器打开的文件，可以手动下载。
  */
  export const downloadImg = (url,imgName) => {
    // a标签的写法ie不支持
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/a#attr-download
    // const aTag = document.createElement('a');
    // aTag.href = url;
    // aTag.download = true;
    // aTag.click()

    // area标签都支持
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/area
    const mapEle = document.createElement('map'),
    areaEle = document.createElement('area');
    mapEle.appendChild(areaEle);
    areaEle.download = imgName || 'photo';
    if(typeof url === 'string'){
      areaEle.href = url;
      areaEle.click();
    }else if(url instanceof Array){
      for (const u of url) {
        areaEle.href = u;
        areaEle.click();
      }
    }
  }
  
/*
* 图片下载2
* 通过将跨域的图片绘制到canvas上，之后引用canvas下载图片
*/ 
export const downloadCanvasImg = url => {
  const img = new Image();
  // 可以把跨域的图片绘制到canvas上
  img.crossOrigin = 'anonymous'; //'use-credentials'
  img.onload = function(){
    const canvas = document.createElement('canvas');
    if(canvas.getContext){
      const ctx = canvas.getContext('2d'),
        { width,height } = img; 
      canvas.height = height;
      canvas.width = width;
      ctx.drawImage(img,0,0,width,height)
      downloadImg(canvas.toDataURL())
    }
  }
  img.src = url
}
/*
* 图片下载3
* 非同源需加{mode:'no-cors'}
* 响应需设置:Access-Control-Allow-Origin,
* 否则It skips response body. Blob {size: 0, type: ""}.
* https://www.it1352.com/2077428.html
*/  
export const blobImg = url => {
  fetch(url).then(res => res.blob()).then(res => {
    downloadImg(window.URL.createObjectURL(res))
  })
}