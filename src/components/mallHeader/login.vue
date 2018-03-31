<template>
<transition name="slideIn">
  <div class="login" v-show="isHide">
      <div class="login-container">
          <form>
              <div class="form-title">Login</div>
              <div class="alert-text" v-show="errTip">用户名或密码错误</div>
              <div class="input-text">
                <input type="text" placeholder="User Name" v-model="userName">
              </div>
              <div class="input-password">
                <input type="password" placeholder="Password" v-model="password">
              </div>
              <div class="submit" @click="login">登录</div>
          </form>
          <div class="icon" @click.stop="hideLogin">X</div>
      </div>
  </div>
  </transition>
</template>

<script>
export default {
    props:{
        isHide:{
            type:Boolean,
            default:false
        }
    },
    data(){
        return{
            errTip:false,
            userName:'',
            password:''
        }
    },
   
    methods:{
        
        hideLogin(){
            this.$emit('hide')
        },
        login(){
            let _this = this
            this.$http.post('/users/login',{
                username:this.userName,
                password:this.password
            }).then(res => {
                if(res.status == 200){
                    console.log(res.data.result.user)
                    let result = res.data.result.user
                    _this.errTip = false
                    _this.$emit('hide',result)
                }else{
                    _this.errTip = true
                }
            })
            
        }
    }
}
</script>

<style lang='scss'>
    .login{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 20;
        background-color: rgba($color: #000000, $alpha: 0.6);
        .login-container{
            position: relative;
            top: 50%;
            left: 50%;
            width: 420px;
            height: 300px;
            padding: 0 40px;
            background-color: #fff;
            transform: translate3d(-250px,-150px,0);
            .form-title{
                height: 50px;
                line-height: 50px;
                font-size: 17px;
            }
            .alert-text{
                height: 14px;
                margin-bottom: 10px;
                line-height: 14px;
                color: red;
                font-size: 12px;
            }
            .input-text{
                display: flex;
                margin-bottom: 20px;
               input{
                    width: 100%;
                    height: 20px;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #e1e1e1;
                }
            }
            .input-password{
                display: flex;
                margin-bottom: 40px;
                input{
                    width: 100%;
                    height: 20px;
                    padding: 10px;
                    font-size: 16px;
                    border: 1px solid #e1e1e1;
                }
            }
            .submit{
                width: 100%;
                height: 40px;
                line-height: 40px;
                border: none;
                font-size: 14px;
                color: #fff;
                text-align: center;
                background-color: skyblue;
            } 
            .icon{
                position: absolute;
                right: 15px;
                top: 15px;
                cursor: pointer;
            }    
        }
    }
.slideIn-enter-active,.slideIn-leave-active{
    transition: all .3s
}
.slideIn-enter,.slideIn-leave-to{
    opacity: 0;
}
</style>
