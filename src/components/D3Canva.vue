<template>
  <svg ref="chartContainer" class="chart-container"></svg>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3Chart",
  data() {
    return {
      refresh: false,
      timer: null,
      t: 0
    };
  },
  mounted() {
    this.createChart();
    window.addEventListener("resize", this.createChart);
    this.refresh = true;
    },
  beforeUnmount() {
    window.removeEventListener("resize", this.createChart);
    d3.select("svg").remove();
    clearInterval(this.timer);

  },
  methods: {
    createChart() {
      const chartContainer = d3.select(this.$refs.chartContainer);
      const width = window.innerWidth;
      const height = window.innerHeight;
      chartContainer.attr("width", width).attr("height", height);

      // Remove any existing chart
      chartContainer.select("g").remove();

      const svg = chartContainer.append("g").attr("transform", "translate(" + [width / 2, height / 2] + ")");

      const spiral = svg.append("path")
        .attr("fill", "none")
        .attr("stroke", "#111")
        .attr("stroke-opacity", 1)
        .attr("stroke-width", 0.1);

      const range = d3.range(-40 * Math.PI, 40 * Math.PI, 0.02);
      

       if (this.timer) {
        clearInterval(this.timer);
      }
 

      this.timer = setInterval(() => {
        let d = "M";

        for (let i = 0; i < range.length; i++) {
          const p = range[i];
          d += 0.18 * width * (Math.sin(4.01 * p + this.t / 20222) + Math.sin(3 * p + this.t / 2000));
          d += ",";
          d += 0.128 * height * (Math.sin(2.005 * p + this.t / 4000) + Math.sin(1.01 * p + this.t / 2000));
          if (i !== range.length - 1) d += "L";
        }

        d = d.slice(0, -1);
        spiral.attr("d", d);
        svg.attr("transform", "translate(" + [width / 2, height / 2] + ")rotate(" + 360 * (this.t % 100000 / 100000) + ")");

        this.t += 20;
      }, 20);
    }
  }
};

</script>

<style scoped>
.chart-container {
  position: relative;
  margin: -1%;
}
</style>
