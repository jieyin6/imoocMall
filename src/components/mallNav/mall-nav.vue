<template>
  <div class="nav">
      <div class="menu-container">
          <router-link to="/home">Home /</router-link>
          <router-link to="/goods">goods</router-link>
      </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
.nav{
    width: 100%;
    height: 45px;
    background-color: #f0f0f0;
    padding-left: 20px;
    .menu-container{
        float: left;
        line-height: 45px;
        a{
            color: #000;
        }
        .active{
            font-size: 14px;
            color: #ee7a23;
        }
        
    }
}
</style>
