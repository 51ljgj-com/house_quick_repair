export default {
  install (Vue, options) {
    let parseDateDiff = (first, last) => { // 计算告警持续时间
      if (!first || !last) return
      first = first.replace(/-/g, '/')
      last = last.replace(/-/g, '/')
      let time = new Date(last) - new Date(first)
      if (time < 0) { time = -time }
      time = Math.floor(time / 1000 / 60) // 换算成分钟为单位
      return Math.floor(time / (60 * 24)) + '天' + Math.floor(time % (60 * 24) / 60) + '小时' + Math.floor(time % 60) + '分钟'
    }
    Vue.filter('parseDateDiff', parseDateDiff)
    Vue.parseDateDiff = parseDateDiff
    Vue.prototype.$parseDateDiff = parseDateDiff

    /*
    * 接收一个Date对象和使用yyyy MM dd HH mm ss组成的时间格式字符串
     */
    let timeFormat = (time, format = 'yyyy-MM-dd HH:mm:ss') => {
      function prefix0(num) {
        return num < 10 ? ('0' + num) : num
      }
      return format.replace('yyyy', time.getFullYear())
        .replace('MM', prefix0(time.getMonth() + 1))
        .replace('dd', prefix0(time.getDate()))
        .replace('HH', prefix0(time.getHours()))
        .replace('mm', prefix0(time.getMinutes()))
        .replace('ss', prefix0(time.getSeconds()))
    }
    Vue.filter('timeFormat', timeFormat)
    Vue.parseDateDiff = timeFormat
    Vue.prototype.$timeFormat = timeFormat
  }
}
