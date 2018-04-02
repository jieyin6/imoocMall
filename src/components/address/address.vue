<template>
<div class="address">
    <div class="top-back" @click="back">back</div>
      <nav-address></nav-address>
      <router-view/>
  </div>
</template>

<script>
import navAddress from './navAddress'
export default {
   components:{
       navAddress
   },
    methods:{
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang='scss'>
.address{
    padding: 30px 10px 20px 10px;
    position: relative;
    .top-back{
        position: absolute;
        top: 20px;
        right: 40px;
        width: 50px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        font-weight: 400;
        background-color: #ee7a23
    }
    
}
</style>
