<template>
  <div class="content">
      <div class="container">
        <div class="content-nav">
          <div class="nav-container">
              <span class="margin">Sort by:</span>
              <a class="color" href="javascript:void(0)">Default</a>
              <a href="javascript:void(0)" @click="sortPrice" >{{pickPrice}}</a>
          </div>
          <div class="hide-text" @click="slideShow = true">Filter By</div>
        </div>
        <div class="content-container">
          <div class="content-left">
            <price @pickPrice='pickPriceItem'></price>
          </div>
          <div class="content-goods">
              <good-list :goods='goodList' 
                         :indexNum='pageNum'
                         :currentIndex='page - 1'
                         :pageListNum='pageListNum' 
                         @sendPage='changePage'
                         @pageSend='pageChange'></good-list>
          </div>
        </div>
      </div>
      <transition name="slide">
      <div class="slide-price" v-show="slideShow">
          <div class="mask-back"></div>
          <div class="mask-title"></div>
          <price :slide='true' class="price" @pickPrice='pickPriceItem'></price>
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
            pickPrice:'Price ↑',
            page:1,
            //pageSize:8,
            pageSize:1,
            sort:true,
            addData:true,
            //scroll:true,
            pageNum:1,
            priceItem:0,
            //分页组件数据
            pageListNum:0
        }
    },
    
 created(){
        this.getData()
        this.getAllData()
        this.pageGetData()
  },
  mounted(){
     // window.addEventListener('scroll',this.handleScroll)
  },
  methods:{
      //实现分页组件的数据请求
      pageGetData(){
          let param = {
                'pageSize':18,
                'page':1,
                'sort':1,
                'pickPrice':this.priceItem
            }
            let _this = this
            this.$http.get('/goods',{
                params:param
            }).then(res => {
                console.log(res.data.result.count)
                _this.pageListNum = res.data.result.count
                
            })
            
      },
      //请求所有数据
      getAllData(){
          let param = {
                'pageSize':18,
                'page':1,
                'sort':1,
                'pickPrice':this.priceItem
            }
            let _this = this
            this.$http.get('/goods',{
                params:param
            }).then(res => {
                _this.pageNum = res.data.result.count
                _this.pageNum = parseInt(_this.pageNum/_this.pageSize)+1
            })
            
      },
      getData(add){
        let param = {
            'page':this.page,
            'pageSize':this.pageSize,
            'sort':this.sort ? 1 : -1,
            'pickPrice':this.priceItem
        }
        let _this = this
        this.$http.get('/goods',{
            params:param
        }).then(res => {
            console.log(res.data.result.list)
            if(add == true){
                _this.pageCount = res.data.result.list.length
                _this.goodList = this.goodList.concat(res.data.result.list)
               // console.log(this.pageCount)
            /*    if(_this.pageCount < _this.pageSize){
                    _this.scroll = false
                }*/
            }else{
                _this.goodList = res.data.result.list
            }
        }).catch(err => {
            console.log(err);
        })
      },
   /*   lowToTop(){
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
      }*/
      sortPrice(){
         if(this.sort === true){
              this.pickPrice = 'Price ↓'
              this.page = 1
              this.sort = false
              this.getData()
          }else{
              this.pickPrice = 'Price ↑'
              this.page = 1
              this.sort = true
              this.getData()
          }
      },
      changePage(index){
          this.page = index
          this.getData()
      },
      //page组件
      pageChange(index){
          this.page = index
          this.getData()
      },
      //价格区间
      pickPriceItem(index){
          this.priceItem = index
          this.getData()
          this.getAllData()
      }
    /*  handleScroll(){
          if(this.scroll === true){
              let scrollY = window.scrollY
              let height = window.innerHeight/2
              console.log(this.scroll)
              if(scrollY > height){
                    this.page ++
                    this.getData(true)
                }
        }
    }*/
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
        padding: 60px 20px 20px 20px;
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
