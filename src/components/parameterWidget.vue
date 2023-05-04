<template>
  <div>
    <v-select
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

    <button class="clear-button" @click="clearSelection">
      Clear selection
    </button>

    <div class="slider-container">
      <label for="slider1">Slider 1:</label>
      <input
        type="range"
        id="slider1"
        name="slider1"
        min="0"
        max="10"
        v-model="slider1Value"
        class="slider"
      />
      <span class="slider-value">{{ slider1Value }}</span>
    </div>

    <div class="slider-container">
      <label for="slider2">Slider 2:</label>
      <input
        type="range"
        id="slider2"
        name="slider2"
        min="0"
        max="100"
        v-model="slider2Value"
        class="slider"
      />
      <span class="slider-value">{{ slider2Value }}</span>
    </div>

    <div class="color-picker-container">
      <label for="color-picker">Color:</label>
      <input
        type="color"
        id="color-picker"
        name="color-picker"
        v-model="colorValue"
      />
      <span class="color-value">{{ colorValue }}</span>
    </div>
  </div>
</template>
<script>
import { VSelect } from "vuetify";
import { askFree } from "./../services/api.js";

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
      slider2Value: 50,
      colorValue: "#000000",
    };
  },

  methods: {
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
  },
  async mounted() {
    await this.Askfor();
    const selectedItems = localStorage.getItem("selectedItems");
    this.value = JSON.parse(selectedItems); // Set value from local storag
  },
  unmounted() {
    localStorage.setItem("selectedItems", JSON.stringify(this.value));
  },
};
</script>


<style>
.clear-button {
  font-size: 12px;
}

.slider-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.slider-container label {
  margin-right: 10px;
}

.slider-value {
  margin-left: 10px;
  font-size: 12px;
}

.color-picker-container {
  margin-top: 10px;
  display: flex;
  align-items: center;
}

.color-picker-container label {
  margin-right: 10px;
}

.color-value {
  margin-left: 10px;
  font-size: 12px;
}
.random-selection-button {
  margin-top: 10px;
  font-size: 12px;
}
</style>
