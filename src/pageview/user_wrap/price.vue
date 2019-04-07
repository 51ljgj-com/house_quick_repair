<template lang="pug">
  article.weui-article(style="text-align:left")
    section
      img(src="/static/img/price.jpg")
    section
      a.weui-btn.weui-btn_plain-primary(href="#/group_buy/") 立即团购
      a.weui-btn.weui-btn_plain-default(@click="callUs()") 电话预约
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