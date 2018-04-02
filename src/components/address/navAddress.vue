<template>
  <ul class="top-options" >
          <li v-for="(item,index) in titles" :key="index">
              <router-link :to="'/address/'+item.path">
                <div  class="options-title">{{item.title}}</div>
                <div class="options-line"></div>
                <div class="options-circle"></div>
              </router-link>
          </li>
    </ul>
</template>

<script>
export default {
     data(){
        return{
            titles:[
                {
                     'title': 'Confirm Address',
                     'path':'confrimAddress'
                },
                {
                    'title': 'View Your Order',
                    'path': 'order'
                },
                {
                    'title':'Make Payment',
                    'path':'payment'
                },
                {
                    'title':'Order Confrimation',
                    'path':'orderConfrim'
                }
          ]
        }
    }
}
</script>

<style lang='scss'>
    .top-options{
        display: flex;
        margin: 40px 0;
         li{
            flex: 1;
            margin-right: 5px;
            text-align: center;
            &:last-child{
                margin-right: 0;
            }
            .options-title{
                margin-bottom: 20px;
                color:black
            }
            .options-line{
                width: 100%;
                height: 5px;
                background-color: black;
                border-radius:  5px
            }
            .options-circle{
                position: relative;
                top: -8px;
                left: 50%;
                width: 10px;
                height: 10px;
                transform: translateX(-5px);
                border-radius: 5px;
                background-color: #000;
            }
           
            .exact{
                .options-title{
                    color: red;
                }
                .options-circle,.options-line{
                    background-color: red
                }
            }
        }
    }
</style>
