<template>
  <div class="good-list">
      <ul class="goods-container">
        <li v-for="(good,index) in goods" :key="index">
            <goods :good='good' @show='showEvent' @alert='alertEvent'></goods>
        </li>
      </ul>
      <ul  class="page-container">
          <li v-for="(indexnum,index) in indexNum" 
              :key="index"
              @click="sendPage(index)"
              :class="{current:currentIndex == index}"
              >{{index+1}}</li>
      </ul>  
      <modal class="modal" v-show="alertModal">
           <p slot="title" >请先登录</p>
           <p slot="btn" class="slot-btn" @click="alertModal = false">关闭</p>
           
     </modal>
      <modal class="modal" v-show="showModal">
           <p slot="title" >加入购物车成功</p>
           <p slot="btn" class="slot-btn" @click="showModal = false">继续购物</p>
           <router-link slot="btn" class="slot-btn" to="/shoppingCart">查看购物车</router-link>
     </modal>
  </div>
</template>

<script>
import modal from '../modal'
import goods from './good'
export default {
    components:{
        goods,
        modal
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
        
    },
    data(){
        return{
            showModal:false,
            alertModal:false
        }
    },
   methods:{
       sendPage(index){
           this.$emit('sendPage',index+1)
       },
       showEvent(){
           this.showModal = true
       },
       alertEvent(){
           this.alertModal = true
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
    .modal{
        .slot-btn{
            padding: 10px;
            border: 1px solid skyblue;
            &:hover{
                background-color: skyblue
            }
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
