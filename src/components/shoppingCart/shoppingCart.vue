<template>
  <div class="shopping-cart">
      <div class="title">
         <p>M Y  C A R T</p>
         <p @click="back">返回</p>
      </div>
      <ul class="table-title">
          <li>ITEMS</li>
          <li>PRICE</li>
          <li>QUANTITY</li>
          <li>SUBTOTAL</li>
          <li>EDIT</li>
      </ul>
      <ul class="table-content" v-for="(item,index) in cartList" :key="index">
          <li class="li-product">
              <input type="checkbox" :checked='item.checked == 1' ref="checkbox" @click="cartItem('check',item)" />
              <img :src="'/static/'+item.productImage" />
              <div class="content-title">{{item.productName}}</div>
          </li>
          <li>{{item.salePrice}}</li>
          <li class="li-btn">
              <button @click="cartItem('dec',item)">-</button>
              <div>{{item.productNum}}</div>
              <button @click="cartItem('add',item)">+</button>
          </li>
          <li class="li-total">{{item.salePrice * item.productNum}}</li>
          <li @click="deleteProduct(item.productId)">删除</li>
      </ul>
      <div class="footer">
          <div class="footer-left">
              <input type="checkbox" name="" id="" :checked='selectAll' @click="selectEvent">
              <span @click="selectAll">Select all</span>
              <span>Delete selected</span>
          </div>
          <div class="footer-right">
              <div class="right-num">
                  <span>Item Total:</span>
                  <span>{{alltotalPrice}}</span>
              </div>
              <div class="right-btn" :class="{'nothing-btn':checkCount == 0}" @click="checkout">C H E C K O U T</div>
          </div>
      </div>
    <modal v-show="isShow">
        <p slot="title">请登录</p>
        <p slot="btn" @click="closeCart">关闭</p>
    </modal>
    <modal v-show="deleteShow">
        <p slot="title">确认删除？</p>
        <p slot="btn" @click="confirmDelete">确认</p>
        <p slot="btn" @click="deleteShow = false">取消</p>
    </modal>
  </div>
</template>

<script>
import modal from '../modal'
import { returnStatement, tryStatement } from 'babel-types';
export default {
    components:{
        modal
    },
    data(){
        return{
            cartList:[],
            isShow:false,
            deleteShow:false,
            productId:'',
        }
    },
    
    created(){
        this.getList()
    },
   computed:{
     selectAll(){
         return this.checkCount == this.cartList.length
       },
    checkCount(){
        let i = 0
        this.cartList.forEach(item => {
            if(item.checked == '1') i++
        })
        return i
       },
    alltotalPrice(){
        let money = 0
        console.log(this.cartList);
        
        this.cartList.forEach(item => {
            if(item.checked == '1'){
                money += item.salePrice * parseFloat(item.productNum)
            }
        })
        return money
    }
   },
    methods:{
        getList(){
            let _this = this
            this.$http.get('/users/cart').then(res => {
                console.log(res);
                if(res.data.status === '0'){
                    _this.cartList = res.data.result
                    console.log(_this.cartList);
                }else{
                    _this.isShow = true
                }
            })
           
        },
       
        closeCart(){
            this.$router.back()
        },
        deleteProduct(id){
            this.productId = id
            this.deleteShow = true
        },
        confirmDelete(){
            console.log(this.productId); 
            let _this = this
            this.$http.post('/users/del',{
                productId:_this.productId,
                "Content-Type": 'application/x-www-form-urlencoded'
            }).then(res => {
                console.log(res);
                if(res.data.status === '0'){
                    _this.deleteShow = false
                    _this.getList()
                }else{
                    console.log('删除失败');
                }
                
            })
        },
        cartItem(type,item){
            if(type === 'add'){
                item.productNum ++
            }else if(type === 'dec'){
                if(item.productNum <= 1){
                    return
                }
                item.productNum --
            }else{
               item.checked == 1 ? item.checked = 0 : item.checked = 1
               if(item.checked == 0) this.selectAll = false
            }
            this.$http.post('/users/cartNum',{
                'productId':item.productId,
                'productNum':item.productNum,
                'checked':item.checked
            }).then(res => {
                console.log(res);
                
                if(res.data.status === '0'){
                    console.log('操作成功');
                    
                }
            })
        },
       
        selectEvent(){
            let check =  !this.selectAll
            this.cartList.forEach((item)=>{
                item.checked = check ? 1 : 0
            })
            this.$http.post('/users/checkAll',{
                'checkAll':check
            }).then(res => {
                console.log(res);
            })
        },
        checkout(){
            if(this.checkCount == 0){
                return
            }else{
                this.$router.push('/adress')
            }
        },
        back(){
            this.$router.back()
        }
    }
}
</script>

<style lang='scss'>
.shopping-cart{
    margin: 30px 10px 0 10px;
    cursor: pointer;
    .title{
        display: flex;
        justify-content: space-between;
        font-size: 18px;
        font-weight: 800;
        margin-bottom: 20px;
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
            
            input{
                float: left;
                margin: 35px 70px  0 20px 
            }
            img{
                display: block;
                float: left;
                width: 60px;
                height: 60px;
                margin-top: 10px;
            }
            div{
                display: block;
                float: left;
                margin-left: 40px;
            }
        }
        .li-btn{
            div{
                display: inline-block;
                margin: 0 5px;
            }
        }
        .li-total{
            color: #ee7a23;
        }
    }
    .footer{
        display: flex;
        justify-content: space-between;
        width: 100%;
        height: 50px;
        padding:  0 10px;
        line-height: 50px;
        background-color: #fff;
        box-sizing: border-box;
        .footer-left{
            span{
                display: inline-block;
                margin-left: 10px;
            }
        }
        .footer-right{
            display: flex;
            .right-num{
                margin-right: 20px;
                span:nth-child(2){
                    color: #ee7a23;
                }
            }
            .right-btn{
                padding: 0 10px;
                color: #fff;
                background-color: #ee7a23;
            }
            .nothing-btn{
                background-color: gray
            }
        }
    }
}
</style>
