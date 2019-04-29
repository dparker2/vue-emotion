import Vue from "vue";
import App from "./App.vue";
import { scopedStyles } from '../../lib/plugins';

Vue.use(scopedStyles);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
