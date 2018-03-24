<template>
  <div id="app">
    <mall-header></mall-header>
    <mall-content ></mall-content>
    <mall-footer></mall-footer>
    <router-view/>
  </div>
</template>

<script>
import mallHeader from './components/mallHeader/mall-header'
import mallFooter from './components/mallFooter/mall-footer'
import mallContent from './components/mallContent/mall-content'
export default {
  components:{
    mallHeader,
    mallFooter,
    mallContent
  },
 
}
</script>

<style lang='scss'>
@import '../common/css/reset.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
