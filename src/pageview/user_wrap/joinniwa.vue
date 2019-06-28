<template lang="pug">
  .join-page(style="text-align:left")
    img.we-ui-expend-img(src="/static/img/jion/top.jpg")
    
    .inputDiv
      span
        label.celiangLabel --------   免费上门测量   --------
         .empty
        .editInput
          .leftTitle
            img.inputThumb(src="/static/img/jion/uu.png")
          input( class="niwa-input" type="text" placeholder="你的名字（必填）" name="username")
        .empty
        .editInput
          .leftTitle
            img.inputThumb(src="/static/img/jion/up.png")
          input( class="niwa-input" type="text" placeholder="你的电话（必填）" name="tel")
      .empty
      button.niwa-btn 立即报名

    img.we-ui-expend-img(src="/static/img/jion/lipin.png")

    img.we-ui-expend-img(src="/static/img/jion/pingzhi.jpg")

    img.we-ui-expend-img(src="/static/img/jion/chuanxin.jpg")
</template>
<script>
import {statusText, callNumbers} from '@/router/util.js';
export default {
    methods: {
        callUs: () => {
            let numbers = ['151-966-12058', '177-161-38503'];
            callNumbers(numbers);
        }
    }
};
</script>

<style lang="scss">
      .join-page
      {
          background-size: auto 50%;
          width: 100%;
          height: 60px;
          position: relative;
      }
      .we-ui-expend-img{
        width:100%;
      }

      .inputThumb{
        width:15px;
        margin-top:10px;
      }
      .inputDiv
      {
          text-align:center;
          margin-bottom:15px;
          margin-top:5px;
      }
      .empty
      {
        height:5px;
      }
      .editInput
      {
          height: 40px;
          width: 70%;
          background-color: gainsboro;
          border: solid 0.5px aliceblue;
          margin:0 auto;
      }
      .leftTitle
      {
        height: 40px;
        width: 15%;
        float:left;
      }
      .niwa-input
      {
        height: 35px;
        width: 80%;
        background-color: gainsboro;
        border: none;
        font-size:15px;
      }

      .celiangLabel
      {
        margin-bottom:10px;
      }
      .niwa-btn
      {

          border:none;
          width:70%;
          height:40px;
          
          font-size: 18px;
          text-align: center;
          text-decoration: none;
          color: #fff;
     
          -webkit-tap-highlight-color: rgba(0,0,0,0);
          overflow: hidden;
          background-color:#0093ba;
          margin:0 auto;
      }

      .niwa-btn:hover {
    background-color:#04788c;
}
.niwa-btn:active {
    position:relative;
    top:1px;
}

</style>
