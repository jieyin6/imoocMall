<template>
  <div class="confrim-address">
    <div class="address-top">
      <div class="top-title">S H O P O I N G  A D D R E S S</div>
    <ul>
      <li v-for="(item,index) in addressListfilter"
          :key="index"
          :class="{'checked':index ===currentIndex}"
          @click="setItem(item,index)">
        <div class="address-name">{{item.userName}}</div>
        <div class="address-detail">{{item.streetName}}</div>
        <div class="address-mail">{{item.postCode}}</div>
        <div class="address-reset">
          <p v-if="item.isDefault">Default address</p>
          <p v-if="!item.isDefault" @click="setDefault(item.addressId)">Set Default</p>
          <p @click="deleteItem(item.addressId)">delete</p>
        </div>
      </li>
      <li class="add-address">
        <div>+</div>
        <p>Add new address</p>
      </li>
    </ul>
    <div class="more" @click="moreEvent">{{more}}</div>
    </div>
    <modal v-show="modalShow">
      <p slot="title">确认删除地址？</p>
      <p slot="btn" @click="deleteAddress">确认</p>
      <p slot="btn" @click="modalShow = false">取消</p>
    </modal>
    <div class="nextBtn" @click="nextBtn">N E X T</div>
  </div>
</template>

<script>
import modal from '../modal'
export default {
  components:{
    modal
  },
  data(){
    return{
      addressList:[],
      limit:3,
      more:'more',
      currentIndex:0,
      modalShow:false,
      addressId:'',
      selectedId:''
    }
  },
  computed:{
    addressListfilter(){
      return this.addressList.slice(0,this.limit)
    }
  },
  mounted(){
    console.log(this.addressList);
    
  },
  created(){
    this.getList()
  },
  methods:{
    getList(){
      let _this = this
      this.$http.get('/users/address').then(res => {
        console.log(res);
        if(res.data.status == '0'){
          _this.addressList = res.data.result
        }
      })
    },
  moreEvent(){
    if(this.limit == 3){
      this.limit = this.addressList.length
      this.more = 'hide'
    }else{
      this.limit = 3
      this.more = 'more'
    }
  },
  setDefault(id){
    let _this = this
    this.$http.post('/users/default',{
      addressId:id
    }).then(res => {
      if(res.data.status == '0'){
        _this.getList()
      }
    })
  },
  deleteItem(id){
    this.modalShow = true
    this.addressId = id
  },
  deleteAddress(){
    let _this = this
    this.$http.post('/users/deleteAddress',{
      addressId:this.addressId
    }).then(res => {
      if(res.data.status == '0'){
        _this.modalShow = false
        _this.getList()
      }
    })
  },
  setItem(item,index){
    this.currentIndex = index
    this.selectedId = item.addressId
  },
  nextBtn(){
    let _this = this
    this.$router.push({
      name:'order',
      params:{'id':_this.selectedId}
    }
    )
  }
}
  
}
</script>

<style lang='scss'>
  .confrim-address{
    overflow: hidden;
    cursor: pointer;
    .address-top{
      position: relative;
      .top-title{
        height: 60px;
        margin-bottom: 10px;
        line-height: 60px;
        font-size: 30px;
        font-weight: 600;
        }
      ul{
        overflow: hidden;
        li{
          float: left;
          width: 273px;
          padding: 20px;
          margin: 0 50px 20px 0;
          border: 2px solid #eee;
          background-color: #fff;
          &:hover{
            border-color: #ee7a23;
          }
          &:nth-child(4n){
            margin-right: 0
          }
          .address-name{
            font-size: 18px;
            margin-bottom: 10px;
          }
          .address-detail{
            font-size: 14px;
            margin-bottom: 30px;
          }
          .address-mail{
            font-size: 14px;
            margin-bottom: 10px;
          }
          .address-reset{
            display: flex;
            justify-content: space-between;
            color: #ee7a23
          }
        }
        .checked{
          border-color: #ee7a23;
        }
        .add-address{
          height: 112px;
          text-align: center;
          div{
            margin: 20px 0 10px 0;
            font-size: 50px;
          }
        }
      }
      .more{
        position: absolute;
        bottom: -20px;
        left: 50%;
      }
    }
    .nextBtn{
      float: right;
      margin: 200px 30px 0 0;
      width: 120px;
      height: 60px;
      line-height: 60px;
      font-weight: 600;
      text-align: center;
      background-color: #ee7a23
    }
  }
</style>
