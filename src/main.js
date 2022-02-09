import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import "./plugins/axios.js"
import "./plugins/filters.js"
import "./plugins/session.js"
import 'animate.css';
import './plugins/money.js'
import './utils/button_gold.css';
import '../node_modules/vue-anka-cropper/dist/VueAnkaCropper.css';
import './plugins/konva'
Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
