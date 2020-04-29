import Vue    from 'vue'
import App    from './App.vue'
import Router from '../router/router.js'
import Store  from '../store/store.js'
import VueAxios from 'vue-axios'
import { securedAxiosInstance, plainAxiosInstance } from '../backend/axios/axios.js'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/ja'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
Vue.use(ElementUI, { locale })

Vue.config.productionTip = false
Vue.use(VueAxios, {
  secured: securedAxiosInstance,
  plain: plainAxiosInstance
})

const app = new Vue({
   el: '#app',
   router: Router,
   store: Store,
   securedAxiosInstance,
   plainAxiosInstance,
   render: h => h(App)
})
