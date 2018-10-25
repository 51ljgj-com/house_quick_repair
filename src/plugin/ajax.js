export default {

  //插件入口
  install(Vue, options) {
    Vue.http.options.emulateJSON = true
    Vue.http.interceptors.push(function(request, next) {
      // if (request.method.toUpperCase() === 'GET') {
      //   request.params._t = Math.random()
      // }

      //request.url = request.url + '.json'

      request.headers.set('Content-Type', request.method === 'PATCH' ? 'application/json;charset=UTF-8' : 'application/x-www-form-urlencoded;charset=UTF-8')

      next(function(res) {
        let data = res.body
        if (res.status === 0) return
        if (res.status === 401) {
          window.localStorage.removeItem('userInfo')
          return
        }
        if (res.status < 200 || res.status >= 300) {
          let msg = typeof data === 'string' ? '操作失败，请稍后重试！' : Object.keys(data).map(i => data[i]).join('\n')
          Vue.prototype.$message.error(msg)
        }
      })
    })
  }
}
