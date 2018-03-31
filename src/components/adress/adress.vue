<template>
<div class="adress">
    <div class="top-back">back</div>
      <nav-adress></nav-adress>
      <router-view/>
  </div>
</template>

<script>
import navAdress from './navAdress'
export default {
   components:{
       navAdress
   }
}
</script>

<style lang='scss'>
.adress{
    padding: 30px 10px 0 10px;
    position: relative;
    .top-back{
        position: absolute;
        top: 20px;
        right: 40px;
    }
    
}
</style>
