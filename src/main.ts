import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import AsyncComputed from "vue-async-computed";
import "tocas-ui/dist/tocas";
import "tocas-ui/dist/tocas.css";

const VueFbCustomerChat = require("vue-fb-customer-chat");

Vue.config.productionTip = false;

Vue.use(AsyncComputed);
Vue.use(VueFbCustomerChat, {
  page_id: "100606028247960", // 輸入 Facebook Page ID,
  theme_color: "#d9d9d9", // 設定messenger顏色
  locale: "zh_TW", // 設定語言
  logged_out_greeting: "你好,我是W.C開發者本人，有什麼可以幫助你的嗎?", //登入狀態歡迎詞
  logged_in_greeting: "你好,我是W.C開發者本人，有什麼可以幫助你的嗎?" //登出(未登入)狀態歡迎詞
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
