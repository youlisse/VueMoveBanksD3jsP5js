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
        max="100"
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
      slider2Value: 10,
      colorValue: "#292929",
      colorValue2: "#42ffdc",
    };
  },

  methods: {
    handleParameterChange() {
      // Emit the event with the updated values
      this.$emit("parameter-change", {
        slider1Value: this.slider1Value,
        slider2Value: this.slider2Value,
        colorValue: this.colorValue,
        colorValue2: this.colorValue2,
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
    window.addEventListener("beforeunload", this.handleBeforeUnload);
    window.addEventListener("unload", this.handleUnload);
    this.colorValue = "#292929";
    this.colorValue2 = "#42ffdc";
    await this.Askfor();
    const selectedItems = localStorage.getItem("selectedItems");
    this.value = JSON.parse(selectedItems); // Set value from local storag
  },
  beforeUnmount() {
    window.removeEventListener("beforeunload", this.handleBeforeUnload);
    window.removeEventListener("unload", this.handleUnload);
    this.saveToLocalStorage();
  },
};
</script>


<style>
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
  display: flex;
  align-items: center;
  color: v-bind(colorValue2);
  margin-left: 2%;
}

.slider-container label {
  margin-right: 10px;
}

.slider-value {
  margin-left: 10px;
  font-size: 12px;
}

.color-picker-container {
  display: flex;
  align-items: center;
  color: v-bind(colorValue2);
  margin-left: 2%;
}

.color-picker-container label {
  margin-right: 10px;
}

.color-value {
  margin-left: 10px;
  font-size: 12px;
}

.my-select {
  color: v-bind(colorValue2);
}
</style>
