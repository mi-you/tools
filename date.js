// moment.js 是一个很好地第三方日期处理的工具库

/*
* 判断某一年有多少周
* year:哪一年，如：2020 | "2020"
*/
export function getWeeksByYear(year = (new Date()).getFullYear()){
  let isLeapYear = year % 4 === 0 && year % 100 !==0 || year % 400 === 0
  let isSunday = (new Date(year + "-01-01 00:00:00")).getDay() === 0
  if(isLeapYear && isSunday){
    return 54
  }
  return 53
}

/*
* 根据周数获取在指定年中的时间段
* num:第几周,如：3 | "3"
* year:哪一年，如：2020 | "2020"
*/
export function getDateByWeek(num,year = (new Date()).getFullYear()){
    //判断该周数是否在指定年内
    let weeks = getWeeksByYear(year)
    if(isNaN(num) || num < 1 || num > weeks){
      return []
    }
    //计算时间段
    let base,nowStart,nowEnd,dtDay,overDay,start,end;
    base = new Date('2018-01-01 00:00:00') //参考年：该年1月1号是周一
    nowStart = new Date(year + "-01-01 00:00:00") //指定年的第一天
    nowEnd = new Date(year + "-12-31 23:59:59") //指定年的最后一天
    dtDay = (nowStart.getTime() - base.getTime()) / (1000*60*60*24) //时间差（日）
    overDay = dtDay % 7 > 0 ? dtDay % 7:dtDay % 7 + 7
    start = new Date(nowStart.getTime() + ((num -1) * 7 - overDay) * 24 * 3600 * 1000)
    end = new Date(start)
    end.setDate(start.getDate() + 6)
    if(nowStart > start){ //第一周边界
      start = nowStart
    }
    if(end > nowEnd){ //最后一周边界
      end = nowEnd
    }
    return [start,end]
  }
/*
* 判断某年的某日是第几周
* date:是时间对象,如：new Date("2020-02-02 02:02:02")
*/
export function getWeekByDate(date = new Date()){
  let weekStart = 1,
      weekEnd = 54, //一年最多54周
      week,
      flag = true,
      timeArr = []; //weekNumber对应的时间段
  while(flag){
    week = Math.floor(( weekStart + weekEnd ) / 2)
    timeArr = getDateByWeek(week,date.getFullYear())
    if(timeArr.length === 0){
      flag = false
      week = ""
    }
    if(timeArr[0] > date){
      weekEnd = week
      continue 
    }
    if(timeArr[1] < date){
      weekStart = week
      continue
    }
    flag = false
  }
  return week
}