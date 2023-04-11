<template>
  <div>
    <!-- Add an SVG element as the container for the D3.js chart -->
    <svg ref="chartContainer"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3Chart",
  mounted() {
    // Call the method to create the D3.js chart when the component is mounted
    this.createChart();
  },
  methods: {
    createChart() {
      const chartContainer = d3.select(this.$refs.chartContainer);

      // Set the attributes for the circle element
            this.containerWidth = this.$refs.chartContainer.clientWidth;
      this.containerHeight = this.$refs.chartContainer.clientHeight;

      // Use the width and height values to set the width and height attributes on the SVG element
      d3.select(this.$refs.chartContainer)
        .attr("width", this.containerWidth*10)
        .attr("height", this.containerHeight*10);
      chartContainer
        .append("circle")
        .attr("cx", 50)
        .attr("cy", 50)
        .attr("r", 25)
        .attr("fill", "steelblue")
        .transition() // Add a transition to animate the circle
        .duration(2000) // Set the duration of the transition to 2 seconds
        .attr("cx", 1920) // Set the new x-coordinate of the circle
        .attr("cy", 1080) // Set the new y-coordinate of the circle
        .on("end", () => {
          // ""transition 0 0 ""
        });
    },
  },
};
</script>

<style scoped>
/* Add any custom styles for the D3.js chart here */
</style>
