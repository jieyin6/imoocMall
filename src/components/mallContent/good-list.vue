<template>
  <div class="good-list">
      <ul class="goods-container">
        <li v-for="(good,index) in goods" :key="index">
            <goods :good='good'></goods>
        </li>
      </ul>
   <!--   <ul  class="page-container">
          <li v-for="(indexnum,index) in indexNum" 
              :key="index"
              @click="sendPage(index)"
              :class="{current:currentIndex == index}"
              >{{index+1}}</li>
      </ul>  -->
      <page-list :listNum='pageListNum' @pageChange='changePage' class="page-list"></page-list>
  </div>
</template>

<script>
import pageList from './page-list'
import goods from './good'
export default {
    components:{
        goods,
        pageList
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        },
        indexNum:{
            type:Number,
            default:0
        },
        currentIndex:{
            type:Number,
            default:0
        },
        //分页组件数据
        pageListNum:{
            type:Number,
            default:0
        }
    },
   methods:{
       sendPage(index){
           this.$emit('sendPage',index+1)
       },
       //page组件
       changePage(index){
           this.$emit('pageSend',index)
       }
   }
}
</script>

<style lang='scss'>
.good-list{
    overflow: hidden;
    display: flex;
    flex-direction: column;
    .goods-container{
        li{
            float: left;
            width: 23.80952%;
            margin-right: 1.5873%;
            margin-bottom: 1.5873%;
            &:nth-of-type(4n){
                margin-right: 0;
            }
        }
    }
    .page-list{
        display: flex;
        justify-content: flex-end;
    }
    .page-container{
        display: flex;
        justify-content: flex-end;
        height: 30px;
        line-height: 30px;
        font-size: 16px;
        li{
            width: 30px;
            border: 1px solid #eee;
            border-radius: 15px;
            margin-left: 20px;
            text-align: center;
            cursor: pointer;
        }
        .current{
            background-color:#ee7a23; 
        }
    }

}
@media (max-width:980px) {
    .good-list{
        .goods-container{
        li{
           width: 100%;
           margin-right: 0;
        }
      }
    }
}
</style>
