<template>
  <div ref="sketchContainer"></div>
</template>

<script>
import p5 from 'p5'

export default {
    data() {
    return {
      canvasWidth: 0,
      canvasHeight: 0
    };
  },
  mounted() {
    this.canvasWidth = window.innerWidth;
    this.canvasHeight = window.innerHeight;
    this.createP5Sketch()
  },

  methods: {
    createP5Sketch() {
      const container = this.$refs.sketchContainer
      new p5(sketch, container)
    }
  }
}

const sketch = function(p) {
  p.setup = function() {
    p.createCanvas(1920,1080);
  }

  p.draw = function() {
    p.background(220);
    p.ellipse(200, 100, 100, 100);
  }
}
</script>




  
  