<template>
  <div class="order">
    <div class="order-title">O R D E R   C O N T E N T</div>
      <ul class="table-title">
          <li>ORDER  CONTENTS</li>
          <li>PRICE</li>
          <li>QUANTITY</li>
          <li>SUBTOTAL</li>
      </ul>
      <ul class="table-content" v-for="(item,index) in cartList" :key="index" v-if="item.checked == 1">
          <li class="li-product">
              <img :src="'/static/'+item.productImage" />
              <div class="content-title">{{item.productName}}</div>
          </li>
          <li>{{item.salePrice}}</li>
          <li>
             <div>x{{item.productNum}}</div>
          </li>
          <li class="li-total">{{item.salePrice * item.productNum}}</li>
      </ul>
    
        <ul class="price-container">
          <li>
            <span>Item subtotal:</span>
             <span>{{itemSubtotal}}</span>
          </li>
          <li v-for="(priceItem,index) in priceList" :key="index">
            <span>{{priceItem.name}}:</span>
            <span>{{priceItem.price}}</span>
          </li>
           <li >
            <span>Order total:</span>
             <span class="order-total">{{orderTotal}}</span>
          </li>
        </ul>
      <div class="next-btn">
        <div class="btn-container">
          <div class="previous" @click="backBtn">PREVIOUS</div>
          <div class="nextto-pay" @click="nextBtn">PROCEED TO PAYMENT</div>
        </div>
      </div>
  </div>
 
</template>

<script>
export default {
  data(){
    return{
      priceList:[
        {
        'name':'Shipping',
        'price':100
        },
        {
          'name':'Discount',
          'price':0
        },
        {
          'name':'Tax',
          'price':400
        }],
      cartList:[],
      orderTotal:null,
      itemSubtotal:null
    }
  },
  computed:{

  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      let _this = this
      this.$http.get('/users/cart').then(res => {
        if(res.data.status == '0'){
          _this.cartList = res.data.result
          _this.cartList.forEach(item => {
            if(item.checked == 1){
              _this.itemSubtotal += item.salePrice*item.productNum
            }
          })
          _this.priceList.forEach(item => {
            let extra = 0
            extra += item.price
            console.log(extra);
            
            _this.orderTotal = extra+_this.itemSubtotal
          })
        }
      })
    },
    backBtn(){
      this.$router.back()
    },
    nextBtn(){
      let _this = this
      let addressId = this.$route.params.id
      this.$http.post('/users/payment',{
        addressId:addressId,
        totalPrice:_this.orderTotal
      }).then(res => {
        if(res.data.status == 0){
          _this.$router.push({
            name:'payment',
            params:{
              'id':res.data.result.orderId
            }
          })
        }
      })
    }
  }
}
</script>

<style lang='scss'>
.order{
   overflow: auto;
  .order-title{
    height: 60px;
    margin-bottom: 10px;
    line-height: 60px;
    font-size: 30px;
    font-weight: 600;
  }
     .table-title{
        width: 100%;
        height: 40px;
        line-height: 40px;
        background-color: gray;
        display: flex;
        li{
            flex: 1;
            text-align:center;
            &:nth-child(1){
                flex: 2
            }
        }
    }
    .table-content{
        width: 100%;
        height: 80px;
        margin-bottom: 30px;
        line-height: 80px;
        background-color: #fff;
        display: flex;
        li{
            flex: 1;
            margin-bottom: 50px;
            text-align:center;
            &:nth-child(1){
                flex: 2
            }
            
        }
        .li-product{
          position: relative;
            img{
                position: absolute;
                top: 10px;
                left: 50%;
                transform: translateX(-120px);
                width: 60px;
                height: 60px;
                margin: 0 0 0 30px;
            }
            div{
                position: absolute;
                top: 0;
                left: 50%;
            }
        }
        .li-total{
            color: #ee7a23;
        }
    }
    .price-container{
      float: right;
      margin-top: 50px;
      font-size: 20px;
    /*  &::after{
        content: '';
        display: block;
        height: 0;
        width: 0;
        clear: both;
        visibility: hidden;
        }*/
      li{
        margin-bottom: 15px;
        text-align: right;
        span{
          &:last-child{
            display: inline-block;
            margin-left: 20px;
            width: 50px;
          }
        }
        .order-total{
          color: red;
        }
      }
      
    }
    .next-btn{
      position: absolute;
      bottom: -30px;
      left: 0;
      right: 0;
      .btn-container{
        display: flex;
        justify-content: space-between;
        div{
          height: 50px;
          font-size: 14px;
          text-align: center;
          line-height: 50px;
        }
        .previous{
           width: 120px;
           margin-left: 50px;
           color: red;
           border: 1px solid red;
           background-color: #fff;
        }
        .nextto-pay{
          width: 200px;
          color: #fff;
          background-color: red;
          border: 1px solid #fff;
        }
      }
    }
}

</style>