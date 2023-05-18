<template>
    
  <svg ref="chartContainer" class="chart-container"></svg>

</template>

<script>
import * as d3 from "d3";

export default {
  name: "D3Chart",
  props: {
  slider1Value: {
    type: Number,
    required: true
  },
  slider2Value: {
    type: Number,
    required: true
  },
  colorValue: {
    type: String,
    required: true
  },
  colorValue2: {
    type: String,
    required: true
  },
  swap: {
    type: Boolean,
    required: true
  }
},


  data() {
    return {
      refresh: false,
      timer: null,
      t: 0,
    };
  },
  mounted() {
   this.refresfChart();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.createChart);
    d3.select("svg").remove();
    clearInterval(this.timer);
  },

  watch: {
  slider1Value: {
    handler() {
      this.updateChart();
    },
  },
  slider2Value: {
    handler() {
      this.updateChart();
    },
  },
  colorValue: {
    handler() {
      this.updateChart();
    },
  },
  colorValue2: {
    handler() {
      this.updateChart();
    },
  },
    swap: {
    handler() {
      this.updateChart();
    },
  },
},

  
  methods: {

    refresfChart(){  
      this.createChart();
      window.addEventListener("resize", this.createChart);
      this.refresh = true;
      },


    
    spiral(width, height, svg) {
  const spiral = svg
    .append("path")
    .attr("fill", "none")
    .attr("stroke", this.colorValue2)
    .attr("stroke-opacity", 1)
    .attr("stroke-width", Math.exp(this.slider2Value * 0.1 + 2) * 0.00025 + 0.05);

  const range = d3.range(-40 * Math.PI, 40 * Math.PI, 0.02);

  let t = this.t;

  const animate = () => {
    let d = "M";

    for (let i = 0; i < range.length; i++) {
      const p = range[i];
      d += 0.15 * width * (Math.sin(4.01 * p + t / 20222) + Math.sin(3 * p + t / 2000));
      d += ",";
      d += 0.11 * height * (Math.sin(2.005 * p + t / 4000) + Math.sin(1.01 * p + t / 2000));
      if (i !== range.length - 1) d += "L";
    }

    d = d.slice(0, -1);
    spiral.attr("d", d);
    svg.attr(
      "transform",
      "translate(" + [width / 2, height / 2] + ")rotate(" + 360 * (t % 100000 / 100000) + ")"
    );

    t += 0.5 * this.slider1Value + 1;

    if (t ) {
      requestAnimationFrame(animate);
    } else {
      clearInterval(this.timer);
    }
  };

  animate();
},

spiral2(width, height, svg, a, b) {
  const spiral = svg
    .selectAll("path")
    .data(d3.range(0, 4 * Math.PI, Math.PI / 4))
    .enter()
    .append("path")
    .attr("fill", "none")
    .attr("stroke", this.colorValue2)
    .attr("stroke-opacity", 0.4)
    .attr("stroke-width", this.slider2Value * 0.15 * 0.4 + 0.1);

  const range = d3.range(0, 15.5 * Math.PI, 0.1);

  let t = this.t;

  const animate = () => {
    spiral.attr("d", (d) => {
      const thetaOffset = d * 10;
      const pathData = range.map((θ) => {
        const r = a * Math.exp(b * θ);
        const x = (r + (height / 3) * (Math.cos(t / 2000) - 1)) * Math.cos(θ - t / 1000 + thetaOffset);
        const y = (r + (height / 3) * (Math.sin(t / 2000) - 1)) * Math.sin(θ - t / 1000 + thetaOffset);
        return [x, y];
      });
      return "M" + pathData.join("L");
    });

    t += this.slider1Value / 40 + 1;
    this.t = t;

    if (t ) {
      requestAnimationFrame(animate);
    }
  };

  animate();
},

  updateChart() {
    // Access the parameter values and update the chart accordingly
    /* eslint-disable */

    const slider1Value = this.slider1Value;
    const slider2Value = this.slider2Value;
    const colorValue = this.colorValue;
    const colorValue2 = this.colorValue2;
    const swap =this.swap;
 
    /* eslint-enable */
    this.refresfChart();

    // Implement the chart update logic based on the parameter values
    // ...
  },


    createChart() {
    
      const chartContainer = d3.select(this.$refs.chartContainer);
      const width = window.innerWidth;
      const height = window.innerHeight;
      chartContainer.attr("width", width).attr("height", height + 0.1);

      // Remove any existing chart
      chartContainer.select("g").remove();
      chartContainer
        .append("rect")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", this.colorValue);

      const svg = chartContainer.append("g").attr("transform", "translate(" + [width / 2, height / 2] + ")");
      if(this.swap)
        this.spiral(width,height,svg);
      else
        this.spiral2(width,height,svg,1,0.1);
        
     
    }
  },


  
};
</script>

<style scoped>

.chart-container {
  position: relative;
  margin-bottom: -5%;
  

}


</style>
