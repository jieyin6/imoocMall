<template>
  <div class="header">
      <div class="logo-container">
          <img src="./images/logo1.png" />
      </div>
      <div class="header-right">
          <span class="right-login" @click="isHide = true">Login</span>
          <i></i>
      </div>
      <login :isHide='isHide' @hide='isHide = false'></login>
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
       isHide:false
       }
   },
   hideLogin(){
       this.isHide = false
   }
}
</script>

<style lang='scss' scoped>
.header{
    padding: 0 40px 0 0;
    height: 70px;
    background-color: #fff;
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
            font-size: 16px;
        }
    }
}

</style>
