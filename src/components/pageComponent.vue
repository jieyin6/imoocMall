<template>
<ul class="page">
    <li @click="previousTenPage">前十页</li>
    <li @click="lastPage">上一页</li>
      <li v-for="(item,index) in pageArr " 
          :key="index"
          :class="{'active':currentIndex == index}"
          @click="changePage(index)">{{item}}</li>
    <li @click="nextPage">下一页</li>
    <li @click="laterTenPage">后十页</li>
  </ul>
</template>

<script>
export default {
    props:{
        obj:{
            type:Object,
            default(){
                return{
                     pageSize:1,
                    totalCount:50
                }
            }
        }
    },
    data(){
        return{
            propsPageSize:this.obj.pageSize,
            propsTotalCount:this.obj.totalCount,
            pageTotalCount:null,
            pageArr:[],
            currentIndex:0
        }
    },
   
    created(){
       // this.getProps()
        this.getPageCount()
    },
    methods:{
      /*  getProps(){
            let newObj = Object.assign({},this.obj)
            this.propsPageSize = newObj.pageSize
            this.propsTotalCount = newObj.totalCount
            console.log(this.propsPageSize,this.propsTotalCount);
            
        },*/
        getPageCount(){
            this.pageTotalCount =  Math.ceil(this.propsTotalCount/this.propsPageSize)
            if(this.pageTotalCount > 10){
                this.changeArray(1,10)
            }else{
                this.changeArray(1,this.propsTotalCount)
            }
        },
        changeArray(x,length){
            let arr = []
            for(let i = x ; i <= length ;i++){
                arr.push(i)
            }
            this.pageArr = arr
        },
        changePage(index){
            this.currentIndex = index
            this.$emit('page',this.pageArr[index])
        },
        nextPage(){
            this.currentIndex ++
            if(this.currentIndex > this.pageArr.length-1){
                if(this.pageTotalCount > 10){
                    let currentpageCount = this.pageArr[this.pageArr.length-1]
                    let rest = this.pageTotalCount - currentpageCount
                    if(rest == 0){
                        this.currentIndex = this.pageArr.length-1
                        return
                    }else if(rest < 10){
                        this.changeArray(currentpageCount+1,rest+currentpageCount)
                        this.currentIndex = 0
                        
                    }else{
                        this.changeArray(currentpageCount+1,currentpageCount+10)
                        this.currentIndex = 0
                    }
                }else{
                    this.currentIndex = this.pageArr.length-1
                    return
                }
            }
            this.$emit('page',this.pageArr[this.currentIndex])
            
        },
        lastPage(){
            this.currentIndex --
            if(this.pageArr[0] == 1 && this.currentIndex < 0){
                this.currentIndex = 0
                return
            }else if(this.currentIndex < 0 ){
                let currentpageCount = this.pageArr[0]
                this.changeArray(currentpageCount-10,currentpageCount-1)
                this.currentIndex = this.pageArr.length-1
            }
            this.$emit('page',this.pageArr[this.currentIndex])
        },
        laterTenPage(){
            let last = this.pageArr[this.pageArr.length-1]
            if(last == this.pageTotalCount){
                return
            }else{
                if(this.pageTotalCount < 10){
                    return
                }else{
                    let rest = this.pageTotalCount - last
                    if(rest > 10){
                        this.changeArray(last+1,last+10)
                    }else{
                        this.changeArray(last+1,last+rest)
                    }
                }
            }
            this.currentIndex = 0
            this.$emit('page',this.pageArr[this.currentIndex])
        },
        previousTenPage(){
            let first = this.pageArr[0]
            if(first == 1){
                return
            }else{
                this.changeArray(first-10,first-1)
            }
            this.currentIndex = 0
            this.$emit('page',this.pageArr[this.currentIndex])
        }
    }

}
</script>

<style lang='scss'>
.page{
    display: flex;
    li{
        height: 30px;
        line-height: 30px;
        padding: 5px;
        border: 1px solid #000;;
        border-left: none;
        text-align: center;
        &:first-child{
            border-left: 1px solid #000;
        }
    }
    .active{
        color: red
    }
}

</style>
