<template>
  <div class="nav">
      <div class="menu-container">
          <span class="menu-home">Home /</span>
          <slot></slot>
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
        .menu-home{
            font-size: 14px;
            color: #a1a1a1;
        }
        
    }
}
</style>
