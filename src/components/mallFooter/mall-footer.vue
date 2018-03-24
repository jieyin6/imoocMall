<template>
  <div class="footer">
      <div class="footer-container">
          <div class="footer-left">
              <span class="check-name">Region</span>
              <select>
                  <option>English</option>
                  <option>Chinese</option>
              </select>
          </div>
          <div class="footer-right">
              <span class="right-C"> Copyright ©️ 2017 IMooc All Rights Reserved.</span>
              <a href="">About Us</a>
              <a href="">Terms & Conditions</a>
              <a href="">Privacy Policy</a>
          </div>
      </div>
      <div class="footer-bottom"></div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang='scss'>
    .footer{
        position: relative;
        .footer-container{
            height:100px;
            margin: 50px 36px 0 36px;
            padding: 0 26px;
            line-height: 100px;
            border-top: 1px solid #eee;
            font-size: 16px;
            color: #a1a1a1;
            .footer-left{
                float: left;
            }
            .footer-right{
                float: right;
                a{
                    margin-left: 20px;
                    color: #a1a1a1;
                }
            }
        }
        .footer-bottom{
            width: 100%;
            height: 50px;
            background-color: #000;
        }
    }
@media (max-width:980px){
    .footer{
        .footer-container{
            .footer-left{
                width: 100%;
                text-align: center
            }
            .footer-right{
                float: none;
                line-height: 50px;
                text-align: center;
            }
        }
    }
}
</style>
