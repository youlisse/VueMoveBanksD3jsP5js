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
    </div>
  </div>
</template>
<script>
import { VSelect } from "vuetify";
import { askFree } from "./../services/api.js";
import { requestDataFrom } from "./../services/api.js";
import { calculateMovement } from "./../services/api.js";
import { calculateAverageVectors } from "./../services/api.js";

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
      colorValue: "#292929",
      colorValue2: "#42ffdc",
      swap: true,
      movement: 0,
    };
  },

  methods: {
    async createVector() {
      const data = await requestDataFrom();
      const movement = calculateMovement(data);
      const avgMouvement = calculateAverageVectors(movement);
      this.movement = avgMouvement;
    },
    swapSpiral() {
      this.swap = !this.swap;
      this.handleParameterChange();
      // eslint-disable-next-line no-undef
    },
    handleParameterChange() {
      const selectedIds = this.value;

      // Do something with the selected item IDs
      console.log(selectedIds);
      // Emit the event with the updated values
      this.$emit("parameter-change", {
        slider1Value: this.slider1Value,
        slider2Value: this.slider2Value,
        colorValue: this.colorValue,
        colorValue2: this.colorValue2,
        swap: this.swap,
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
      const randomItems = this.accessibleData
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

      this.value = randomItems.map((item) => item.id);
      localStorage.setItem("selectedItems", JSON.stringify(this.value));
    },

    saveStorageValue() {
      localStorage.setItem("selectedItems", JSON.stringify(this.value));
      localStorage.setItem("slider1", this.slider1Value);
      localStorage.setItem("slider2", this.slider2Value);
      localStorage.setItem("color1", this.colorValue);
      localStorage.setItem("color2", this.colorValue2);
      localStorage.setItem("swaped", this.swap);
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
    this.colorValue = localStorage.getItem("color1");
    this.colorValue2 = localStorage.getItem("color2");
    var isTrueSet = localStorage.getItem("swaped") === "true";

    this.swap = isTrueSet;
    this.handleParameterChange();

    await this.Askfor();
    const selectedItems = localStorage.getItem("selectedItems");
    this.value = JSON.parse(selectedItems); // Set value from local storag
    this.handleParameterChange();
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener("unload", this.handleUnload);
    this.saveToLocalStorage();
  },
};
</script>


<style>
.swap-button {
  color: v-bind(colorValue2);
  margin-left: 2%;
}
.clear-button {
  color: v-bind(colorValue2);
  margin-left: 2%;
}
.save-button {
  color: v-bind(colorValue2);
  margin-left: 2%;
}
.random-selection-button {
  color: v-bind(colorValue2);
  margin-left: 2%;
}

.slider-container {
  -webkit-appearance: none;
  display: flex;
  align-items: center;
  margin-left: 2%;
  outline: none;
  width: 100%;
  height: 25px;
}
.slider-container label {
  margin-right: 10px;
  color: v-bind(colorValue2);
}

.color-picker-container {
  display: flex;
  align-items: center;
  margin-left: 2%;
}

.color-picker-container label {
  margin-right: 10px;
  color: v-bind(colorValue2);
}

.my-select {
  color: v-bind(colorValue2);
}
body {
  overflow: hidden; /* Hide scrollbars */
}
</style>
