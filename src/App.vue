<template>
  <div>
    <div class="canva" id="p5js-container">
      <D3Chart />
      <!-- <p5jsCanva :resize="resize" /> -->
    </div>
    <div id="app">
      <AnimalWidget />
      <button @click="Askfor">Click me!</button>
      <button @click="accesibleContent">crack me up!</button>

      <p>{{ apiText }}</p>
    </div>

    <!-- Render your D3.js chart component here -->
  </div>
</template>







<script>
//import p5jsCanva from "./components/p5jsCanva.vue";
import AnimalWidget from "./components/parameterWidget.vue";
import Req from "./services/api.js";
import D3Chart from "./components/D3Canva.vue"; // Import your D3Chart component

export default {
  name: "App",
  data() {
    return {
      apiText: "",
      resize: false,
    };
  },
  // created() {
  //   window.addEventListener("resize", this.handleResize);
  // },
  // beforeUnmount() {
  //   window.removeEventListener("resize", this.handleResize);
  // },

  methods: {
    async Askfor() {
      this.apiText = await Req.requestDataFrom();
    },

    async accesibleContent() {
      this.apiText = await Req.askFree();
    },
    // handleResize() {
    //   this.resize = !this.resize;
    // },
  },
  components: {
    D3Chart,
    //p5jsCanva,
    AnimalWidget,
  },
};
</script>

<style>
.canva {
  position: relative;
}

#app {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1; /* Make sure the #app div is on top of the .canva div */
}
</style>
