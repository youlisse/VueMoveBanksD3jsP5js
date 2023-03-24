<!-- <template>
  <img alt="Vue logo" src="./assets/logo.png">
  <artistCard/>
</template>


<script>
import artistCard from './components/artist.vue'

export default {
  name: 'App',
  components: {
    artistCard
  }
}
</script> -->
<template>
  <div id="app">
    <p5jsCanva  />
    <AnimalWidget />
    <button @click="doStuff">Click me!</button>
    <p>{{ apiText }}</p>




  </div>
</template>

<script>
import p5jsCanva from './components/p5jsCanva.vue';
import AnimalWidget from './components/parameterWidget.vue';
import Req from './services/api.js';



export default {
  name: 'App',
  data(){
    return{
      apiText: '',
    }
  },

  methods: {
			async doStuff() {
					this.apiText = await Req.foo()
			}},
  components: {
    p5jsCanva,
    AnimalWidget

  },
  

};



</script>


<!-- <template>
  <div id="app">
    <p5-component></p5-component>
  </div>
</template>

<script>
import P5Component from "./components/p5jsCanva.vue";

export default {
  name: "App",
  components: {
    P5Component,
  },
};
</script> -->

<!-- <style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style> -->




