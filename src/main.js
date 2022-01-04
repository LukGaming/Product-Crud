import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import "./plugins/axios.js"
import "./plugins/filters.js"
import "./plugins/session.js"
import 'animate.css';

Vue.config.productionTip = false



new Vue({
  router,
  vuetify,
  
  
  render: h => h(App)
}).$mount('#app')
