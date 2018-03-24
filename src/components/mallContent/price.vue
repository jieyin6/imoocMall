<template>
  <div class="price">
      <div class="price-title" @click="clearAll" ref="priceTitle">P R I C E :</div>
      <ul>
          <li ref="priceLi" @click="changeStyle(index)" :class="{'current':index === currentIndex}" class="price-item" v-for="(price,index) in priceList" :key="index">{{price}}</li>
      </ul>
  </div>
</template>

<script>
export default {
    props:{
        slide:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            priceList:[
                '0.00 - 100.00',
                '101.00-500.00',
                '501.00-1000.00',
                '1001.00-2000.00'
            ],
            currentIndex:null
        }
    },
    mounted(){
           this.slideStyle() 
        },
    methods:{
        changeStyle(index){
            this.currentIndex = index
        },
        clearAll(){
            this.currentIndex = null
        },
        slideStyle(){
            if(this.slide === true){
                //this.$refs.priceLi.style.borderBottom = '1px solid #ee7a23'
            }
        }
    }
}
</script>

<style lang='scss'>
    .price{
        position: relative;
        width: 160px;
        padding-right:20px; 
        cursor: pointer;
        .price-title{
            height: 50px;
            color: #000;
            line-height: 50px;
            
        }
        ul{
            display: flex;
            flex-direction: column;
            li{
               height: 46px;
               line-height: 46px;
               
            }
            :hover{
                padding-left: 20px;
                border-left: 2px solid #ee7a23;
                color: #ee7a23;
            }
            .current{
                padding-left: 20px;
                border-left: 2px solid #ee7a23;
                color: #ee7a23;
            }
        }
    }
</style>
