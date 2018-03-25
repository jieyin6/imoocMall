<template>
  <div class="page-list">
      <div @click="pageGo">go</div>
      <div @click="hideFront">后十页</div>
      <ul v-show="front">
          <li :class="{'active':currentIndex == index}" 
              v-for="(item,index) in list"
              @click="changIndex(index)" 
              :key='index'>{{item}}</li>
      </ul>
      <ul v-show="latter">
          <li  :class="{'active':currentIndex == index+10}" 
               v-for="(item,index) in lastList" 
               @click="changIndex(index+10)" 
               :key="index">{{item+10}}</li>
      </ul>
      <div @click="hideLatter">前十页</div>
      <div @click="pageBack">back</div>
  </div>
</template>

<script>
export default {
    props:{
        listNum:{
            type:Number,
            default:0
        },
        
    },
    data(){
        return{
            list:10,
            front:true,
            latter:false,
            currentIndex:0,
            
        }
    },
   computed:{
       lastList(){
            return this.listNum - this.list
        }
   },
  
    methods:{
        hideFront(){
            this.latter = true
            this.front = false
        },
        hideLatter(){
            this.latter = false
            this.front = true
        },
        changIndex(index){
            this.currentIndex = index
        },
        pageGo(){
            if(this.currentIndex == this.listNum-1){
                return
            }else{
                if(this.currentIndex == 9){
                    this.front = false
                    this.latter = true
                }
                this.currentIndex ++
                
            }
        },
        pageBack(){
            if(this.currentIndex == 0){
                return
            }else{
                if(this.currentIndex == 10){
                    this.front = true
                    this.latter = false
                }
                this.currentIndex --
            }
        }
    },
    watch:{
        currentIndex(newVal){
            this.$emit('pageChange',newVal+1)
        }
    }
}
</script>

<style lang='scss'>
    .page-list{
        display:flex;
        cursor: pointer;
        div{
            height: 20px;
            padding: 5px;
            border:1px solid #000;
            border-left: none;
            line-height: 20px;
            text-align: center;
            background-color: #eee;
            &:first-child{
                border-left: 1px solid #000;
            }
        }
        ul{
            display: flex;
            li{
                height: 20px;
                padding: 5px;
                border:1px solid #000;
                border-left: none;
                line-height: 20px;
                text-align: center;
                background-color: #eee;
            }
            .active{
                color: #ee7a23
            }
        }
    }
</style>
