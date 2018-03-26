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
        
        //1:将props里的pageSize每页个数，totalCount总个数。通过计算属性return到data设置好的
        //pageSize和totalCount  2:定义一个改变数组的方法，循环的i和长度是变量，将ipush进数组。
        //3：在methods里定义一个计算页数方法。先计算页数，判断页数是否>10
        //是的话，调用改变数组的方法，i= 1 ，长度 = 10
        //不是的话，调用改变数组的方法，1 = 1 长度等于页数
        //4：data里添加currentIndex，用来高亮page
        //5：后十页点击事件。先判断页数是否>10 不是的话return 是的话 获取当前数组的最后一个
        //值last，计算加载了多少数据 总数据-当前数据量/每页个数 得出剩余页数-10/10 向上取整
        //得到一个数值 如果数值==1的话，说明不到10页 计算出页数-10/10 取余 循环这个数值
        //调用改变数组的方法 i =  last + 1 
        //不然的话就循环 i=last+1 长度为10 调用数组方法
        //6：下一页点击事件。当currentIndex = 数组的长度时。先判断页数是否>10 不是的话return
        //是的话 同上方法加载出页数 且currentIndex = 0 高亮第一个值 
        // 获取当前数组的第一个值  取到第一位数 向父组件传递事件 参数为（currentIndex+1）* 第一位数
        //当currentIndex != 数组的长度时 currentIndex ++ 获取当前数组的第一个值 
        //判断值长度 > 1 取到第一位数 向父组件传递事件 参数为（currentIndex+1）* 第一位数
        //值长度不大于1 向父组件传递事件 参数为currentIndex+1
        //7:前十页点击事件。先判断页数是否>10 不是的话return 是的话 获取当前数组的第一个值first
        // 如果第一个值 == 1 return  调用改变数组的方法，i = first-10 长度 = 10 
        //8：前一页点击事件。当currentIndex = 0 时 获取当前数组的第一个值 first 如果first==1
        //return 不是的话就 调用改变数组的方法 i=first-10 长度=10 且currentIndex=数组的长度
        //高亮最后一个值。获取当前数组的第一个值得第一位数 向父组件传递事件 参数为
        //（currentIndex+1）*第一位数
        //当currentIndex != 0 时 currentIndex -- 获取当前数组的第一个值
        //值长度大于1 就取到第一位数 向父组件传递事件 参数为（currentIndex+1）* 第一位数
        //不大于1，参数为currenIndex + 1 
        //page点击事件。currentIndex = index 判断当前数组的第一位数 长度=1的话 向父组件传递事件 
        //参数为currentIndex+1。长度不等于1的话，获取该数值的第一位数 向父组件传递事件 参数为
        //(currentIndex+1)*第一位数
        
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
