<template>
  <div class="good-list">
      <ul>
        <li v-for="(good,index) in goods" :key="index">
            <goods :good='good'></goods>
        </li>
      </ul>
  </div>
</template>

<script>
import goods from './good'
export default {
    components:{
        goods
    },
    props:{
        goods:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>

<style lang='scss'>
.good-list{
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
@media (max-width:980px) {
    .good-list{
        li{
           width: 100%;
           margin-right: 0;
        }
    }
}
</style>
