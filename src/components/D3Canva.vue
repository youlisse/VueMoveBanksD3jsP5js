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
  slider3Value: {
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
  },
  movement: {
    type: [String, Number],
    required: true
  }
},


  data() {
    return {
      refresh: false,
      timer: null,
      t: 0,
      x: 0,
      y: 0,
    };
  },
  mounted() {
   this.refreshChart();
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
  slider3Value: {
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
  movement: {
    handler() {
      this.updateChart();
    },
  },
},

  
methods: {
    // Refresh on parameter change and also resize window
    refreshChart(){  
      this.createChart();
      window.addEventListener("resize", this.createChart);
      this.refresh = true;
      },
    // Both spiral can be swap 
    spiral(width, height, svg) {
    const spiral = svg
      .append("path")
      .attr("fill", "none")
      .attr("stroke", this.colorValue2)
      .attr("stroke-opacity", 1)
      .attr("stroke-width", Math.exp(this.slider2Value * 0.1 + 2) * 0.00025 + 0.05);
    let xy = this.x*this.y;
    const range = d3.range(-50*Math.abs(this.y) * Math.PI,
                            50*Math.abs(this.y)* Math.PI,
                            Math.abs(0.15*Math.cos(xy*40)));

    let t = this.t;

    const animate = () => {
      let d = "M";

      for (let i = 0; i < range.length; i++) {
        const p = range[i];
        if(this.slider3Value<10){d += (Math.abs(this.y))*0.2 * width * (Math.sin(4.01 * p + t / 20222) +Math.abs(Math.cos(xy*10))* Math.sin(3 * p + t / 10000));
        d += ",";
        d += (Math.abs(this.x))*0.2 * height * (Math.sin(2.005 * p + t / 4000) +Math.abs(Math.sin(xy*40))/Math.cos(t*0.00001)* Math.sin(1.01 * p + t / 10000));}
        else{
        d += (Math.abs(this.y))*0.2 * width * (Math.sin(4.01 * p + t / 20222) +Math.abs(Math.cos(xy*10))* Math.sin(3 * p + t / 10000))
        + 0.15 * width * ( Math.abs(Math.cos(xy*40))* Math.sin( p + t / 200000))*this.slider3Value*0.001;
        d += ",";
        d += (Math.abs(this.x))*0.2 * height * (Math.sin(2.005 * p + t / 4000) +Math.abs(Math.sin(xy*40))/Math.cos(t*0.00001)* Math.sin(1.01 * p + t / 10000))
        + 0.21 * height * (Math.abs(Math.cos(xy*40))* Math.sin(10 * p + t / 200000))*this.slider3Value*0.001;
          }
        if (i !== range.length - 1) d += "L";
      }

      d = d.slice(0, -1);
      spiral.attr("d", d);
      svg.attr(
        "transform",
        "translate(" + [width / 2, height / 2] + ")rotate(" + 360 * ((t*Math.abs(Math.sin(this.x*this.y*40))) % 100000 / 100000) + ")"
      );

      t += 0.5 * this.slider1Value + 1;
      this.t = t;

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
      .data(d3.range(0, 1 * Math.PI, Math.PI / 4))
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", this.colorValue2)
      .attr("stroke-opacity", 1)
      .attr("stroke-width", this.slider2Value * 0.15 * 0.4 + 0.1);
    let xy =this.x*this.y;
    const range = d3.range(0,
                          (11+parseInt(Math.abs(this.y)*10)) * Math.PI,
                          Math.abs(0.15*Math.cos(xy*40)+0.15));


    let t = this.t;
    let alpha= 1/ 15000*this.x;
    const animate = () => {
      spiral.attr("d", (d) => {
        const thetaOffset = d * Math.abs(Math.cos(xy*100))+Math.cos(t*0.001)+1;
        const pathData = range.map((θ) => {
          const r = a * Math.exp(b * θ)*(t+20000)*0.0001;
          let sweep = θ*this.y;
          let slide =θ-(this.y*this.y*Math.cos(t*0.0001))*0.01; 
          let x = (r*this.x + (height / 3) * (Math.sin(t *alpha) - 1)) * Math.cos(sweep - (this.x)*t / 3000 + thetaOffset);
          let y = (r*this.y + (height / 3) * (Math.sin(t *alpha) - 1)) * Math.sin(sweep - (this.y)*t / 3000 +thetaOffset);
          if(this.slider3Value>10){
           let offsetChaos=this.slider3Value*0.001;
           let t2= t*0.005;
           x += (r + (height / 3) * (Math.sin(((t2)) / 2000) - 1)) * Math.cos(slide- t / 20000 * thetaOffset+thetaOffset)*offsetChaos;
           y += (r + (height / 3) * (Math.cos(((t2+2000)) / 2000) - 1)) * Math.sin(slide - t /20000 *thetaOffset+thetaOffset)*offsetChaos;}
           x*=0.6;
           y*=0.6;
          return [x, y];
        });
        return "M" + pathData.join("L");
      });
      
      t += this.slider1Value / 40 + 1;
      this.t = t;
      svg.attr(
        "transform",
        "translate(" + [width / 2, height / 2] + ")rotate(" + 360 * ((t*2*Math.abs(Math.sin(this.x*this.y*40))) % 100000 / 100000) + ")"
      );

      if (t ) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  },

  updateChart() {
    /* eslint-disable */

    const slider1Value = this.slider1Value;
    const slider2Value = this.slider2Value;
    const slider3Value = this.slider3Value;
    const colorValue = this.colorValue;
    const colorValue2 = this.colorValue2;
    const swap =this.swap;
     const { movement } = this;
    /* eslint-disable */
    const values =  movement.toString().substring(1, movement.length - 1).split(',');
    const x = Number(values[0]);
    const y = Number(values[1]);
    // Check because on mounted $movement is a string and in when i receive my request answer it's vec2 
    if (!isNaN(x) || !isNaN(y) || isFinite(x) || isFinite(y)) {
      this.x = x;
      this.y = y;
    }
    else {
      this.x = movement.x;
      this.y = movement.y;
      if (isNaN(this.x) || isNaN(this.y) || !isFinite(this.x) || !isFinite(this.y)) {
        this.x = 0.5;
        this.y = 0.4;
        console.log("ERROR : Data not receive");
      }
    }

    this.refreshChart();
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
