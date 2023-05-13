<template>
  <div>
    <!-- <span class="color-value">{{ colorValue }}</span> -->
    <div class="canva" id="p5js-container">
      <D3Chart
        :slider1Value="parseInt(slider1Value)"
        :slider2Value="parseInt(slider2Value)"
        :colorValue="colorValue"
        :colorValue2="colorValue2"
      />
    </div>
    <div id="app">
      <div class="animalSelection">
        <AnimalWidget
          :color-value="colorValue"
          @parameter-change="handleParameterChange"
          @color-change="colorValue = $event"
        />
      </div>
      <button @click="Askfor">Click me!</button>

      <p>{{ apiText }}</p>
    </div>
    <!-- Inside the template section of App component -->

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
      slider1Value: 5,
      slider2Value: 10,
      colorValue: "#292929",
      colorValue2: "#42ffdc",
    };
  },

  methods: {
    handleParameterChange(values) {
      this.slider1Value = values.slider1Value;
      this.slider2Value = values.slider2Value;
      this.colorValue = values.colorValue;
      this.colorValue2 = values.colorValue2;
    },
    async Askfor() {
      this.apiText = await Req.requestDataFrom();
    },
  },
  components: {
    D3Chart,
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
  width: 100%; /* take up full width on smaller screens */
  height: 100%; /* take up full height on smaller screens */
}
@media only screen and (min-width: 768px) {
  /* adjust styles for larger screens */
  #app {
    width: 50%; /* take up 50% of screen width on larger screens */
    height: 50%; /* take up 50% of screen height on larger screens */
    top: 0%; /* vertically center the div */
    left: 0%; /* horizontally center the div */
  }
}
</style>
