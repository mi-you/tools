 //身份证号验证函数
 function idNoFormatCheck (value) {
  var num = value.toUpperCase();
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X。
  var reg = /^(\d{18,18}|\d{15,15}|\d{17,17}X)$/;
  if (!reg.test(num)) {
      return false;
  }
  // 校验位按照ISO 7064:1983.MOD 11-2的规定生成，X可以认为是数字10。
  // 下面分别分析出生日期和校验位
  var len, re;
  len = num.length;
  if (len == 15) {
      re = new RegExp(/^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/);
      var arrSplit = num.match(re);
      // 检查生日日期是否正确
      var dtmBirth = new Date('19' + arrSplit[2] + '/' + arrSplit[3] + '/' + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getYear() == Number(arrSplit[2])) &&
      ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
          return false;
      }
  }
  if (len == 18) {
      re = new RegExp(/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/);
      var arrSplit = num.match(re);
      // 检查生日日期是否正确
      var dtmBirth = new Date(arrSplit[2] + "/" + arrSplit[3] + "/" + arrSplit[4]);
      var bGoodDay;
      bGoodDay = (dtmBirth.getFullYear() == Number(arrSplit[2])) &&
      ((dtmBirth.getMonth() + 1) == Number(arrSplit[3])) && (dtmBirth.getDate() == Number(arrSplit[4]));
      if (!bGoodDay) {
          return false;
      } else {
          // 检验18位身份证的校验码是否正确。
          // 校验位按照ISO 7064:1983.MOD
          // 11-2的规定生成，X可以认为是数字10。
          var arrInt = new Array(7, 9, 10, 5, 8, 4,2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
          var arrCh = new Array('1', '0', 'X', '9','8', '7', '6', '5', '4', '3', '2');
          var valNum,nTemp = 0,i;
          for (var i = 0; i < 17; i++) {
              nTemp += num.substr(i, 1) * arrInt[i];
          }
          valNum = arrCh[nTemp % 11];
          if (valNum != num.substr(17, 1)) {
              return false;
          }
      }
  }
  return true;
}