<template>
  <div class="header">
      <div class="logo-container">
          <img src="./images/logo1.png" />
      </div>
      <div class="header-right">
          <span class="right-login" v-show="nickName">{{nickName}}</span>
          <span class="right-login" @click="isHide = true" v-show="!nickName">Login</span>
          <span class="right-login" @click="loginOut" v-show="nickName">Login Out</span>
          <span class="right-login" @click="openCart">购物车</span>
          <span class="cart-num" v-show="cartNum > 0">{{cartNum}}</span>
      </div>
      <login :isHide='isHide' @hide='hideLogin'></login>
    </div>
</template>

<script>
import login from './login'
import { mapState } from 'vuex'
export default {
   components:{
       login
   },
   data(){
       return{
       isHide:false,
        }
   },
   computed:{
       ...mapState(['nickName','cartNum'])
   },
    mounted(){
        this.checkLogin()
    },
   methods:{
       checkLogin(){
            let _this = this
            this.$http.get('/users/checkLogin').then(res => {
                console.log(res)
                if(res.data.status == '0'){
                    //this.userName = res.data.result
                    _this.$store.commit('updateName',res.data.result)
                    _this.getcartNum()
                }
            })
        },
       hideLogin(user){
            this.isHide = false
            //this.userName = user
            this.$store.commit('updateName',user)
        },
        loginOut(){
            this.$http.post('/users/loginout').then(res => {
                console.log(res)
                if(res.status == 200){
                    //this.userName = ''
                    this.$store.commit('updateName','')
                    console.log('loginout')
                }
            })
        },
        openCart(){
            this.$router.push('/shoppingCart')
        },
        getcartNum(){
            let _this = this
            this.$http.get('users/cartNum').then(res => {
                if(res.data.status == '0'){
                    _this.$store.commit('initNum',res.data.result)
                }
            })
        }
   }
   
}
</script>

<style lang='scss' scoped>
.header{
    padding: 0 40px 0 0;
    height: 70px;
    background-color: #fff;
    cursor: pointer;
    .logo-container{
        float: left;
        line-height: 70px;
        img{
            width: 200px;
            height: 70px;
        }
    }
    .header-right{
        float: right;
        line-height: 70px;
        .right-login{
            display: inline-block;
            margin-left: 20px;
            font-size: 16px;
        }
        .cart-num{
            position: absolute;
            right: 25px;
            top: 18px;
            width: 15px;
            height: 15px;
            font-size: 12px;
            line-height: 15px;
            text-align: center;
            font-weight: 800;
            border-radius: 7px;
            background-color: red;
            color: #fff;
        }
    }
}

</style>
