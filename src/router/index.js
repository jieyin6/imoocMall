import Vue from 'vue'
import Router from 'vue-router'
import goodList from '../components/mallContent/mall-content'



Vue.use(Router)


export default new Router({
  'linkExactActiveClass':'active',
  routes: [
    {
      path: '/',
     // name: 'HelloWorld',
     // component: HelloWorld
    },{
      path:'/goods',
      component:goodList
    }
  ]
})
