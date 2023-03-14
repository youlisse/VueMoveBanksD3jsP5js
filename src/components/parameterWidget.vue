<template>
  <div class="animal-widget">
    <h2>Animal Widget</h2>
    <div>
      <label for="animal">Animal:</label>
      <select id="animal" v-model="animal" multiple>
        <option value="cat">Cat</option>
        <option value="dog">Dog</option>
        <option value="bird">Bird</option>
      </select>
    </div>
    <div>
      <label for="opacity">Opacity:</label>
      <input type="range" id="opacity" v-model="opacity" min="0" max="1" step="0.1">
    </div>
    <div>
      <label for="size">Size:</label>
      <input type="range" id="size" v-model="size" min="0" max="100" step="1">
    </div>
    <div>
      <label for="color">Color:</label>
      <input type="color" id="color" v-model="color">
    </div>
    <div>
      <p>Selected Animals: {{ animal }}</p>
      <p>Opacity: {{ opacity }}</p>
      <p>Size: {{ size }}px</p>
      <p>Color: {{ color }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AnimalWidgetComponent',
  data() {
    return {
      animal: [],
      opacity: 0,
      size: 0,
      color: '#000000'
    }
  }
}
</script>