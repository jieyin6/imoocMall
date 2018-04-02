<template>
  <div class="payment">
    <div class="next-to-confrim" @click="next">N E X T</div>
  </div>
</template>

<script>
export default {
  methods:{
    next(){
      let orderId = this.$route.params.id
      console.log(orderId);
      this.$router.push({
        name:'orderConfrim',
        params:{
          'id':orderId
        }
      })
      
    }
  }
}
</script>

<style lang='scss'>
.payment{
  position: relative;
  top: 50%;
  left: 50%;
  .next-to-confrim{
    width: 100px;
    height: 60px;
    color: red;
    background-color: #ffffff;
    border: 1px solid red;
    line-height: 60px;
    text-align: center;
  }
}

</style>