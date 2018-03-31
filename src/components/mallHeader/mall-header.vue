<template>
  <div class="header">
      <div class="logo-container">
          <img src="./images/logo1.png" />
      </div>
      <div class="header-right">
          <span class="right-login" v-show="userName">{{userName}}</span>
          <span class="right-login" @click="isHide = true" v-show="!userName">Login</span>
          <span class="right-login" @click="loginOut" v-show="userName">Login Out</span>
          <span class="right-login" @click="openCart">购物车</span>
      </div>
      <login :isHide='isHide' @hide='hideLogin'></login>
    </div>
</template>

<script>
import login from './login'
export default {
   components:{
       login
   },
   data(){
       return{
       isHide:false,
       userName:''
       }
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
                    this.userName = res.data.result
                }
            })
        },
       hideLogin(user){
            this.isHide = false
            this.userName = user
        },
        loginOut(){
            this.$http.post('/users/loginout').then(res => {
                console.log(res)
                if(res.status == 200){
                    this.userName = ''
                    console.log('loginout')
                }
            })
        },
        openCart(){
            this.$router.push('/shoppingCart')
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
    }
}

</style>
