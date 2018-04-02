import Vue from 'vue'
import Router from 'vue-router'
import goodList from '../components/mallContent/mall-content'
import shoppingCart from '../components/shoppingCart/shoppingCart'
import address from '../components/address/address'
import orderConfirm from '../components/address/orderConfirm'
import payment from '../components/address/payment'
import order from '../components/address/order'
import confirmAddress from '../components/address/confrimAddress'

Vue.use(Router)


export default new Router({
  linkActiveClass:'active',
  linkExactActiveClass:'exact',
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
      path:'/address',
      component:address,
      children:[
        {
          path:'',
          redirect:'/address/confrimAddress'
        },
        
        {
          path:'confrimAddress',
          name:'confromAddress',
          component:confirmAddress
        },
        {
          path:'payment:id',
          component:payment,
          name:'payment',
          props:true
        },
        {
          path:'order:id',
          component:order,
          name:'order',
          props:true
        },
        {
          path:'orderConfrim:id',
          component:orderConfirm,
          name:'orderConfrim',
          props:true
        }
      ]
    }
  ]
})
