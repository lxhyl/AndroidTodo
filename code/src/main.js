import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

import axios from 'axios';
Vue.prototype.$axios = axios;
axios.defaults.withCredentials =true;

import router from './router/router';

import 'element-ui/lib/theme-chalk/index.css';
import {Tabs,TabPane,Form,FormItem,Input,Button,Checkbox,Message,Avatar,Dialog,DatePicker,Rate,Drawer,Row,Col,Carousel,CarouselItem,Popover} from 'element-ui';
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Button);
Vue.use(Checkbox);
Vue.use(Avatar);
Vue.use(Dialog);
Vue.use(DatePicker);
Vue.use(Rate);
Vue.use(Drawer);
Vue.use(Row);
Vue.use(Col);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Popover);
Vue.prototype.$message = Message;

Vue.filter('toTime', function (e) {
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + ""));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  return new Date(e).Format('yy-MM-dd');
})





new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

