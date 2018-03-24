<template>
  <div class="header">
      <div class="logo-container">
          <img src="./images/logo1.png" />
      </div>
      <div class="header-right">
          <span class="right-login">Login</span>
          <i></i>
      </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.header{
    padding: 0 40px 0 0;
    height: 70px;
    line-height: 70px;
    background-color: #fff;
    .logo-container{
        float: left;
        img{
            width: 200px;
            height: 70px;
        }
    }
    .header-right{
        float: right;
        .right-login{
            font-size: 16px;
        }
    }
}

</style>
