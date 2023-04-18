<template>
  <div>
    <!-- Add an SVG element as the container for the D3.js chart -->
    <svg class="chart-container" ref="chartContainer"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3Chart",
  mounted() {
    // Call the method to create the D3.js chart when the component is mounted
    this.createChart();
    window.addEventListener("resize", this.createChart);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.createChart);
  },
  methods: {
    createChart() {
      const chartContainer = d3.select(this.$refs.chartContainer);

      // Use the width and height values to set the width and height attributes on the SVG element
      const width = window.innerWidth;
      const height = window.innerHeight;
      chartContainer.attr("width", width).attr("height", height);

      // Define the circle element
      const circle = chartContainer
        .append("circle")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("r", 25)
        .attr("fill", "steelblue");

      // Define the animation function
      function animate() {
        circle
          .transition()
          .duration(2000)
          .attr("cx", width - 50)
          .attr("cy", height - 50)
          .transition()
          .duration(2000)
          .attr("cx", 50)
          .attr("cy", 50)
          .on("end", animate); // Call the animate function again when the animation ends
      }

      animate(); // Call the animate function to start the animation
    },
  },
};
</script>

<style scoped>
.chart-container {
  position: relative;
  margin:-1%;
}
</style>
