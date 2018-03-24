<template>
  <div class="content">
      <mall-nav class="nav-color">
          <span>goods</span>
      </mall-nav>
      <div class="container">
        <div class="content-nav">
          <div class="nav-container">
              <span class="margin">Sort by:</span>
              <a class="color" href="javascript:void(0)">Default</a>
              <a href="javascript:void(0)"  @click="lowToTop">{{pickPrice}}</a>
          </div>
          <div class="hide-text" @click="slideShow = true">Filter By</div>
        </div>
        <div class="content-container">
          <div class="content-left">
            <price ></price>
          </div>
          <div class="content-goods">
              <good-list :goods='goodList'></good-list>
          </div>
        </div>
      </div>
      <transition name="slide">
      <div class="slide-price" v-show="slideShow">
          <div class="mask-back"></div>
          <div class="mask-title"></div>
          <price :slide='true' class="price"></price>
      </div>
      </transition>
      <transition name="slide">
      <div class="content-mask" v-show="slideShow" @click="slideShow = false"></div>
      </transition>
  </div>
</template>

<script>
import price from './price'
import goodList from './good-list'
import mallNav from '../mallNav/mall-nav'
export default {
    components:{
        price,
        goodList,
        mallNav
    },
    data(){
        return{
            goodList:[],
            slideShow:false,
            pickPrice:'Price ↑'
        }
    },
    created(){
        this.$http.get('/goods').then(res => {
            this.goodList = res.data.result.list
        }).catch(err => {
            console.log(err);
    })
  },
  methods:{
      lowToTop(){
          if(this.pickPrice == 'Price ↑'){
              const goodArr = this.goodList
              goodArr.sort((a,b) => {
                  return a.salePrice - b.salePrice
              })
              this.goodList = goodArr
              this.pickPrice = 'Price ↓'
          }else{
              const goodArr = this.goodList
              goodArr.sort((a,b) => {
                  return b.salePrice - a.salePrice
              })
              this.goodList = goodArr
              this.pickPrice = 'Price ↑'
          }
      }
  }
}
</script>

<style lang='scss'>
.content{
    position: relative;
    background-color: powderblue;
    .nav-color{
        color: #d1434a;
    }
    .container{
        padding: 60px 20px 0 20px;
        .content-nav{
        width: 100%;
        height:55px;
        line-height: 55px;
        color: #605f5f;
        background-color: #fff;
        .nav-container{
            float: right;
            padding-right:20px; 
            .margin{
            display: inline-block;
            margin-right: 10px;
            }
            .color{
                display:inline-block;
                color: #ee7a43;
                margin-right: 20px;
            }
            a{
                color: #605f5f;
            }
        }
        .hide-text{
            float: right;
            display: none;
        }
    }
    .content-container{
        display: flex;
        padding: 30px 0 0 20px;
        .content-left{
            margin-right: 50px;
        }
        .content-goods{
            flex: 1;
        }
    }
    }
    .slide-price{
        position: absolute;
        top: -70px;
        right: 0;
        width: 250px;
        height: 500px;
        z-index: 10;
        .mask-title{
            position: absolute;
            height: 50px;
            background-color: #eee;
            width: 100%;
        }
        .mask-back{
            position: absolute;
            width: 100%;
            height: 100%;
            background-color: #fff;
        }
        .price{
            margin-left: 20px;
        }
    }
    .content-mask{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba($color: #000000, $alpha: 0.6)
    }
    
}
.slide-enter-active,.slide-leave-active{
    transition: all .5s
}
.slide-enter,.slide-leave-to{
    opacity: 0;
}
@media (max-width:980px) {
 .content{
    .container{
        .content-nav{
            .nav-container{
                float: left;
                padding-left:20px; 
            }
            .hide-text{
                float: right;
                display: block;
                margin-right: 20px;
                cursor: pointer;
            }
        }
    .content-container{
        .content-left{
            display:none;
        }
    }
    }
}
    
    
    
}

</style>
