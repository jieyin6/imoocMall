<template>
  <div id="app">
    <mall-header></mall-header>
    <mall-nav></mall-nav>
    <router-view/>
    <mall-footer></mall-footer>
  </div>
</template>

<script>
import mallHeader from './components/mallHeader/mall-header'
import mallFooter from './components/mallFooter/mall-footer'
import mallNav from './components/mallNav/mall-nav'
export default {
  components:{
    mallHeader,
    mallFooter,
    mallNav,
   
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
