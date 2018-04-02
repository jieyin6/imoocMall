<template>
  <div class="good-container" >
        <img :src="'/static/'+good.productImage" />
        <div class="good-item">
            <div class="good-name">{{good.productName}}</div>
            <div class="good-price">${{good.salePrice}}</div>
            <div class="good-add" @click.stop="addCart(good.productId)">加入购物车</div>
        </div>
       
  </div>
</template>

<script>

export default {
    
    props:{
        good:{
            type:Object,
            default(){
                return {}
            }
        }
    },
   methods:{
       addCart(id){
           
           this.$http.post('/goods/cart',{productId:id}).then(res => {
               if(res.data.status == '0'){
                    this.$emit('show')
                    this.$store.commit('updateNum',1)
                }else{
                    this.$emit('alert')
                }
           })
           
       }
   }
}
</script>

<style lang='scss'>
.good-container{
    background-color: #fff;
    border: 2px solid #e9e9e9;
    &:hover{
        border-color: #ee7a23;
        transform: translateY(-10px)
    }
    img{
        width: 100%;
        height: 250px;
        }
    .good-item{
        padding: 20px 10px 10px 10px;
        .good-name{
            margin-bottom: 40px;
        }
        .good-price{
            margin-bottom: 10px;
            font-size: 18px;
            color: #d1434a;
        }
        .good-add{
            height: 39px;
            line-height: 39px;
            border: 1px solid #d1434a;
            text-align: center;
            font-size: 18px;
            &:hover{
                color: #fff;
                background-color: #d1434a
            }
        }
    }
    
    
}
@media (max-width:980px){
    .good-container{
        padding: 10px;
        position: relative;
    img{
        display: block;
        float: left;
        width: 110px;
        height: 110px;
        margin-right: 30px;
        border: 1px solid #e1e1e1;
        }
    .good-item{
        .good-add{
            position: absolute;
            bottom: 10px;
            right: 20px;
            width: 150px;
            cursor: pointer;
        }
    }
    
}
}
</style>
