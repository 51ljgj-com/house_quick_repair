import router from '../router';

class WXP {
  constructor(wxid, Vue) {
    this.Vue = Vue
    if (wxid) {
      this.wxid = wxid
    } else {
      this.auth()
    }
  }

  get isWxBrowser() {
    return /MicroMessenger/i.test(navigator.userAgent.toLowerCase());
  }
  /**
   * 页面跳转 /api/wxuser/authorize?state=${location.pathname} 获取wxid
   */
  auth() {
    let url = `${this.Vue.prototype.SERVER_HOST}/api/wxuser/authorize?state=${encodeURIComponent(location.href)}`
    location.href = url
  }

  getWxConfig() {
    this.Vue.http.post('/api/payment/createWxConfig', {
      url: encodeURIComponent(location.href.split('#')[0]),
      token: this.Vue.userInfo.token
    }).then(res => {
      let body = res.body
      if (body.code) {
        return alert(body.message)
      }
      this.configWx(body.data)
      return Promise.resolve(body.data)
    })
  }

  configWx(data) {
    wx.config({
      ...data,
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
    })
  }

  async pay(id) {
    this.orderId = id
    await this.getWxConfig()
    let params = {
      orderId: this.orderId,
      wxOpenId: this.wxid,
      tradeType: 'JSAPI',
      token: this.Vue.userInfo.token
    }
    this.Vue.http.post('/api/payment/createUnifiedOrder', params).then(res => {
      let body = res.body
      if (body.code) {
        alert(body.message)
        return Promise.reject(body.message)
      }
      return Promise.resolve(body.data)
    }).then(async data => {

      // alert(`创建订单成功${JSON.stringify(params)}${JSON.stringify(data)}`)
      if (WeixinJSBridge) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          (wxRes) => {
            if (wxRes.err_msg === 'get_brand_wcpay_request:ok') {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // wxRes.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              // todo: check success
              alert('支付成功')
              // Now we can refresh the order status via getMyOrders/getOrderDetail api.
              setTimeout(() => { 
                this.refresh();
              }, 500);
            }
          })
      } else {
        // Step 4. Or use chooseWXPay via WeChat JS-SDK.
        // todo: Not tested yet.
        await this.chooseWXPay(data)
        setTimeout(() => { 
          this.refresh();
        }, 500);
      }
    }, (err) => {
      setTimeout(() => { 
        this.refresh();
      }, 500);
      // alert(`支付失败1${JSON.stringify(params)}${JSON.stringify(err)}`)
    })
  }

  async prepayFund(fundItemId) {
    this.fundItemId = fundItemId;
    await this.getWxConfig()
    let params = {
      fundItemId: this.fundItemId,
      wxOpenId: this.wxid,
      tradeType: this.isWxBrowser ? 'JSAPI' : 'MWEB',
      token: this.Vue.userInfo.token
    }
    this.Vue.http.post('/api/payment/createUnifiedOrderByFundItemViaClient', params).then(res => {
      let body = res.body
      if (body.code) {
        alert(body.message)
        return Promise.reject(body.message)
      }
      return Promise.resolve(body.data)
    }).then(async data => {

      // alert(`创建订单成功${JSON.stringify(params)}${JSON.stringify(data)}`)
      if (WeixinJSBridge) {
        WeixinJSBridge.invoke(
          'getBrandWCPayRequest', data,
          (wxRes) => {
            if (wxRes.err_msg === 'get_brand_wcpay_request:ok') {
              // 使用以上方式判断前端返回,微信团队郑重提示：
              // wxRes.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
              // todo: check success
              alert('支付成功')
              // Now we can refresh the order status via getMyOrders/getOrderDetail api.
              setTimeout(() => { 
                this.refresh();
              }, 500);
            }
          })
      } else {
        // Step 4. Or use chooseWXPay via WeChat JS-SDK.
        // todo: Not tested yet.
        await this.chooseWXPay(data);
        setTimeout(() => { 
          this.refresh();
        }, 500);
      }
    }, (err) => {
      // alert(`支付失败1${JSON.stringify(params)}${JSON.stringify(err)}`)
      setTimeout(() => { 
        this.refresh();
      }, 500);
    })
  }

  async chooseWXPay(paymentParams) {
    return new Promise(async (resolve, reject) => {
      /** received paymentParams:
       *
       *  appId: paymentParams.appId,
          timeStamp: paymentParams.timestamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
          nonceStr: paymentParams.nonceStr, // 支付签名随机串，不长于 32 位
          package: paymentParams.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
          signType: paymentParams.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
          paySign: paymentParams.paySign, // 支付签名
      */
      wx.chooseWXPay({
        // ***Note: if we're using chooseWXPay api, 'timeStamp' in paymentParams might need to be changed to 'timestamp'.
        ...paymentParams,
        success: function (res) {
          alert('支付成功')
          return resolve(res)
        },
        error: function (err) {
          console.error(err)
          alert(err)
        }
      })
    })
  }

  refresh() {
    router.go(0);
    // router.push({ path: '/user/orders', query: { wxOpenId: location.search.match(/wxOpenId=([^&]+)&?/) } })
  }
}
export default {
  install (Vue, options) {
    let wxid = location.search.match(/wxOpenId=([^&]+)&?/)
    if (wxid && wxid.length) {
      wxid = wxid[1]
    }
    const agent = navigator.userAgent.toLowerCase()
    if (!/MicroMessenger/i.test(agent)) {
      wxid = 'webwxopenid'
    }
    let wxp = new WXP(wxid, Vue)
    Vue.prototype.$wxp = wxp
    Vue.wxp = wxp
  }
}
