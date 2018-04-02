<template>

  <div class="order-confrim">
    <div class="confrim-container">
      <img src="../../../static/ok-2.png">
      <p>Congratulations !</p>
      <p>Your order is under processing !</p>
      <div class="id-container">
        <p>Order ID:{{idOrder}}</p>
        <p>Order total:{{totalPrice}}</p>
      </div>
      <div class="btn-container">
        <p>CART LIST</p>
        <p>GOODS LIST</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      idOrder:null,
      totalPrice:null
    }
  },
  created(){
    this.getData()
  },
  methods:{
    getData(){
      let _this = this
     
     let id = this.$route.params.id
     console.log(id);
     
      this.$http.get('/users/order',{
        orderId:id
      }).then(res => {
        if(res.data.status == 0){
          _this.totalPrice = res.data.result.total
          _this.idOrder = res.data.result.orderId
        }
      })
    }
  }
}
</script>

<style lang='scss'>
  .order-confrim{
    img{
      display: block;
      width: 200px;
      height: 200px;
      margin: 50px auto;
    }
    p{
      margin: 10px auto;
      font-size: 24px;
      text-align: center;
      font-weight: 600;
    }
    .id-container{
      margin: 20px auto;
      width: 600px;
      display: flex;
      justify-content: center;
      p{
        font-size: 20px;
        color: gray;
      }
    }
    .btn-container{
      width: 500px;
      margin: 30px auto 0 auto;
      display: flex;
      justify-content: space-between;
      p{
        width: 200px;
        height: 40px;
        border: 1px solid red;
        color: red;
        font-size: 16px;
        text-align: center;
        line-height: 40px;
      }
    }
  }
</style>