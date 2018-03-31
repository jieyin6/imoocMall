import Vue from 'vue'
import Router from 'vue-router'
import goodList from '../components/mallContent/mall-content'
import shoppingCart from '../components/shoppingCart/shoppingCart'
import adress from '../components/adress/adress'
import orderConfirm from '../components/adress/orderConfirm'
import payment from '../components/adress/payment'
import order from '../components/adress/order'
import confirmAdress from '../components/adress/confrimAdress'

Vue.use(Router)


export default new Router({
  //linkActiveClass:'active',
  linkExactActiveClass:'active',
  routes: [
    {
      path: '/',
     // name: 'HelloWorld',
     // component: HelloWorld
    },{
      path:'/goods',
      component:goodList,
    },
    {
      path:'/shoppingCart',
      component:shoppingCart
    },
    {
      path:'/adress',
      component:adress,
      
      children:[
        
        
        {
          path:'',
          component:confirmAdress
        },
        
        {
          path:'confrimAdress',
          name:'confromAdress',
          component:confirmAdress
        },
        {
          path:'payment',
          component:payment
        },
        {
          path:'order',
          component:order
        },
        {
          path:'orderConfrim',
          component:orderConfirm
        }
      ]
    }
  ]
})
