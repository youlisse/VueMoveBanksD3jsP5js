<template>
  <div>
    <v-select
      class="my-select"
      v-model="value"
      :items="accessibleData"
      chips
      label="selection"
      item-title="name"
      item-value="id"
      multiple
      clearable
    ></v-select>

    <button class="random-selection-button" @click="generateRandomSelection">
      Generate random selection
    </button>
    <div>
      <button class="clear-button" @click="clearSelection">
        Clear selection
      </button>
    </div>

    <div class="slider-container">
      <label for="slider1">Speed</label>
      <input
        type="range"
        id="slider1"
        name="slider1"
        min="0"
        max="1000"
        v-model="slider1Value"
        class="slider"
        @change="handleParameterChange"
      />
      <span class="slider-value"></span>
    </div>

    <div class="slider-container">
      <label for="slider2">StrokeWeight</label>
      <input
        type="range"
        id="slider2"
        name="slider2"
        min="0"
        max="80"
        v-model="slider2Value"
        class="slider"
        @change="handleParameterChange"
      />
      <span class="slider-value"></span>
    </div>
    <div class="slider-container">
      <label for="slider3">Chaos</label>
      <input
        type="range"
        id="slider3"
        name="slider3"
        min="0"
        max="1000"
        v-model="slider3Value"
        class="slider"
        @change="handleParameterChange"
      />
      <span class="slider-value"></span>
    </div>

    <div class="color-picker-container">
      <label for="color-picker">Background</label>
      <input
        type="color"
        id="color-picker"
        name="color-picker"
        v-model="colorValue"
        @change="handleParameterChange"
      />
      <span class="color-value"></span>
    </div>
    <div class="color-picker-container">
      <label for="color-picker">Stroke </label>
      <input
        type="color"
        id="color-picker2"
        name="color-picker2"
        v-model="colorValue2"
        @change="handleParameterChange"
      />
      <span class="color-value"></span>
    </div>
    <div>
      <button
        class="swap-button"
        @click="swapSpiral"
        @change="handleParameterChange"
      >
        Swap
      </button>
    </div>
    <div>
      <div>
        <button class="req-button" @click="createVector">
          request Data{{ movement }}
        </button>
      </div>

      <div>
        <img
          v-if="isLoading"
          :src="loading"
          alt="Loading..."
          class="loading-animation"
        />
      </div>
    </div>
    <div class="text">
      <h1 class="h1">Geo Beast</h1>

      <h2 class="h2">
        this tool captures the mystic essence of animals<br />
        movements, conjuring captivating art from their graceful dances
        <br />
        <br />
        Geo Beast is an App that takes data from Animals GPS location<br />
        converts movements into an average_translation_Vector2<br />
        and uses this data to create generative art
        <br />
        <br />
        Step 1 Selection of Studies
        <br />
        Step 2 request data
        <br />
        Step 3 tweak it
        <br />
        refesh lagless
      </h2>
      <p class="p">
        made by Youlisse<br />
        Special thanks to MoveBank API and jfirebaugh (jfire.io/animations)
      </p>
    </div>
  </div>
</template>
<script>
import { VSelect } from "vuetify";
import { askFree } from "./../services/api.js";
import { requestDataFrom } from "./../services/api.js";
import { calculateMovement } from "./../services/api.js";
import { calculateAverageVectors } from "./../services/api.js";
import loading from "./../assets/loading.gif";

export default {
  name: "ParameterWidget",
  components: {
    VSelect,
  },

  data() {
    return {
      accessibleData: [],
      selectedItems: [],
      value: [],
      slider1Value: 5,
      slider2Value: 30,
      slider3Value: 30,
      colorValue: "#292929",
      colorValue2: "#42ffdc",
      swap: true,
      movement: 0,
      loading,
      isLoading: false,
    };
  },

  methods: {
    async createVector() {
      console.log("let's");
      this.isLoading = true;

      const mouvementarray = [];
      for (let i = 0; i < this.value.length; i++) {
        const data = await requestDataFrom(this.value[i]);
        const mouvement = calculateMovement(data);

        const avgMouvement = calculateAverageVectors(mouvement);
        if (
          !isNaN(avgMouvement.x) ||
          !isNaN(avgMouvement.y) ||
          isFinite(avgMouvement.x) ||
          isFinite(avgMouvement.y)
        )
          mouvementarray.push(avgMouvement);
      }
      const res = calculateAverageVectors(mouvementarray);
      if (!isNaN(res.x) || !isNaN(res.y) || isFinite(res.x) || isFinite(res.y))
        this.movement = res;
      this.handleParameterChange();
      this.isLoading = false;
      console.log("GO");
    },
    swapSpiral() {
      this.swap = !this.swap;
      this.handleParameterChange();
      // eslint-disable-next-line no-undef
    },
    handleParameterChange() {
      // const selectedIds = this.value;
      //console.log(selectedIds);
      //this.saveStorageValue();

      // Do something with the selected item IDs
      // Emit the event with the updated values
      this.$emit("parameter-change", {
        slider1Value: this.slider1Value,
        slider2Value: this.slider2Value,
        slider3Value: this.slider3Value,
        colorValue: this.colorValue,
        colorValue2: this.colorValue2,
        swap: this.swap,
        movement: this.movement,
      });
    },
    clearSelection() {
      this.value = [];
      localStorage.removeItem("selectedItems"); // Remove from local storage
    },
    async Askfor() {
      const entries = await askFree();
      this.accessibleData = entries;
      const selectedItems = localStorage.getItem("selectedItems");
      if (selectedItems) {
        this.value = JSON.parse(selectedItems); // Set value from local storage
      }
    },
    generateRandomSelection() {
      // Choose three random items from the accessibleData array
      var randomNumber = Math.floor(Math.random() * 3) + 1; // Generates a random integer between 1 and 3

      const randomItems = this.accessibleData
        .sort(() => Math.random() - 0.5)
        .slice(0, randomNumber);

      this.value = randomItems.map((item) => item.id);
      localStorage.setItem("selectedItems", JSON.stringify(this.value));
    },

    saveStorageValue() {
      localStorage.setItem("selectedItems", JSON.stringify(this.value));

      localStorage.setItem("slider1", this.slider1Value);
      localStorage.setItem("slider2", this.slider2Value);
      localStorage.setItem("slider3", this.slider3Value);
      localStorage.setItem("color1", this.colorValue);
      localStorage.setItem("color2", this.colorValue2);
      localStorage.setItem("swaped", this.swap);
      localStorage.setItem("movement", this.movement);
    },
    handleBeforeUnload(event) {
      this.saveStorageValue();
      event.preventDefault();
    },

    handleUnload() {
      this.saveStorageValue();
    },
  },

  async mounted() {
    this.colorValue = "#000000";
    this.colorValue2 = "#FFFFFF";
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("unload", this.handleUnload);
    this.slider1Value = localStorage.getItem("slider1");
    this.slider2Value = localStorage.getItem("slider2");
    this.slider3Value = localStorage.getItem("slider3");
    this.colorValue = localStorage.getItem("color1");
    this.colorValue2 = localStorage.getItem("color2");
    this.movement = localStorage.getItem("movement");

    var isTrueSet = localStorage.getItem("swaped") === "true";

    this.swap = isTrueSet;
    this.handleParameterChange();

    await this.Askfor();
    const selectedItems = localStorage.getItem("selectedItems");
    this.value = JSON.parse(selectedItems); // Set value from local storag
    this.handleParameterChange();
    // console.log(selectedItems);
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener("unload", this.handleUnload);
    this.saveStorageValue();
  },
};
</script>

<style>
.text {
  font-family: "Trebuchet MS", sans-serif;
  color: v-bind(colorValue2);
  text-align: right;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 10px;
  font-size: 5px;
  margin-right: 10px;
  line-height: 1.2;
}

.req-button,
.swap-button,
.clear-button,
.random-selection-button {
  border: none;
  border-radius: 5px;
  padding: 0.3%;

  font-family: "Trebuchet MS", sans-serif;
  color: v-bind(colorValue2);
  margin-left: 1%;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  cursor: pointer;
}

.req-button:hover,
.swap-button:hover,
.clear-button:hover,
.random-selection-button:hover {
  background-color: v-bind(colorValue2);
  color: v-bind(colorValue);
}
.req-button {
  text-decoration: underline;
  position: absolute;
  bottom: 0;
}

.slider-container {
  font-family: "Trebuchet MS", sans-serif;
  color: v-bind(colorValue2);
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  margin-left: 1%;
  padding: 0.3%;
}

.slider-container label {
  margin-right: 10px;
  color: v-bind(colorValue2);
}

.slider-container input[type="range"] {
  -webkit-appearance: none;
  width: 10vw;
  height: 0.02vw;
  background-color: v-bind(colorValue2);
  outline: none;
  margin-top: 0.1vw;
  margin-bottom: 0.1vw;
}

.slider-container input[type="range"]::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 0.7vw;
  height: 0.7vw;
  background-color: v-bind(colorValue);
  border: 0.15vw solid v-bind(colorValue2);
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.slider-container input[type="range"]::-webkit-slider-thumb:hover {
  background-color: v-bind(colorValue2);
}

.slider-container .slider-value {
  margin-left: 1rem;
  font-weight: bold;
  color: #333;
}

.color-picker-container label {
  font-family: "Trebuchet MS", sans-serif;
  color: v-bind(colorValue2);
  margin-left: 1%;
  padding: 0.3%;
  margin-top: 15%;
}

.my-select {
  color: v-bind(colorValue2);
}

.loading-animation {
  margin-top: 10px;
  margin-left: 10px;
  width: 40px;
  filter: brightness(0.5);
  filter: grayscale(100%);
  opacity: 0.3;
  position: absolute;
}

.h1 {
  font-size: 2vw;
}
.h2 {
  font-size: 1vw;
}
.p {
  font-size: 0.5vw;
}
.text {
  padding: 0.5%;
}

.req-button,
.swap-button,
.clear-button,
.random-selection-button {
  font-size: 1.1vw;
}

.color-picker-container label {
  font-size: 1.1vw;
}

.slider-container label {
  font-size: 1.1vw;
}

.loading-animation {
  margin-top: 10px;
  margin-left: 10px;
  width: 40px;
  filter: brightness(0.5);
  filter: grayscale(100%);
  opacity: 0.3;
  position: absolute;
}
</style>