<template>
  <div>
    <div class="canva" id="p5js-container">
      <D3Chart
        :slider1Value="parseInt(slider1Value)"
        :slider2Value="parseInt(slider2Value)"
        :colorValue="colorValue"
        :colorValue2="colorValue2"
        :swap="swap"
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
    </div>
  </div>
</template>







<script>
//import p5jsCanva from "./components/p5jsCanva.vue";
import AnimalWidget from "./components/parameterWidget.vue";
import D3Chart from "./components/D3Canva.vue"; // Import your D3Chart component
export default {
  name: "App",

  data() {
    return {
      resize: false,
      slider1Value: 5,
      slider2Value: 10,
      colorValue: "#000000",
      colorValue2: "#FFFFFF",
      swap: true,
    };
  },

  methods: {
    handleParameterChange(values) {
      this.slider1Value = values.slider1Value;
      this.slider2Value = values.slider2Value;
      this.colorValue = values.colorValue;
      this.colorValue2 = values.colorValue2;
      this.swap = values.swap;
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
</style>
