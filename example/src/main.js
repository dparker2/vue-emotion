import Vue from "vue";
import VueEmotion from "vue-emotion-block/plugin"
import App from "./App.vue";

Vue.use(VueEmotion);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
