// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.$http = axios
const store = new Vuex.Store({
  state:{
    'nickName':'',
    'cartNum':0
  },
  mutations:{
    updateName(state,name){
      state.nickName = name
    },
    initNum(state,num){
      state.cartNum = num
    },
    updataNum(state,num){
      state.cartNum += num
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
