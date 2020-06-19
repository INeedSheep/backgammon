<template>
  <div id="app" >
    <el-container>
    <el-header>
  
    </el-header>
    <el-main>
      
         <Backgammon/>
    </el-main>

  </el-container>
  </div>
</template>

<script>
import Backgammon from './components/ Backgammon'

export default {
  name: 'App',
  components: {
    Backgammon
  },
  data(){
    return{
  
    }
  }
 
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 0px;
  background:url("../static/cheng.jpg");
  width:100%;		
  height:100%;		
  position:fixed;
  background-size:100% 100%;
}
</style>
