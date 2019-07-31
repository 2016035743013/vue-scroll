<template>
  <div id="app">
    <div class="scroll-container">
      <ScrollBar :scrollStyle='scrollStyle'>
        <ul>
            <li v-for="(item, index) in arr" :key = 'index'>
              {{index}}item
            </li>
        </ul>
      </ScrollBar>
    </div>
  </div>
</template>

<script>
import ScrollBar from 'cjhcj-scroll'
export default {
  name: 'App',
  data() {
    return {
      arr: [1,2,3,4,5,6,7,8,9,5,4,2,1,4,5,8,5,2,1,2,6,1,2,3,4,5,6,7,8,9,5,4,2,1,4,5,8,5,2,1,2,6,1,2,3,4,5,6,7,8,9,5,4,2,1,4,5,8,5,2,1,2,6],
      msg: 'hello world',
      arr2: [1,2,4],
      scrollStyle: {
        rail: {
          // background: 'rgba(0,0,0,0.5)'
        },
        bar: {
          // background: 'green'
        }
      }
    }
  },
  methods: {
    
  },
  components: {
    ScrollBar
  },
  mounted() {
    

  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
li {
  list-style: none;
}
.scroll-container {
  
  margin: 0 auto;
  height: 300px;
  width: 200px;
  background: rgba(167, 161, 161, 0.5);
}
</style>