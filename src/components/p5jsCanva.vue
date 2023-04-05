<template>
  <div ref="sketchContainer"></div>
</template>

<script>
import p5 from 'p5'

export default {
  props: {
    resize: Boolean,
  },

  data() {
    return {
      containerWidth: 0,
      containerHeight: 0,
      p5Sketch: null,
    };
  },

  mounted() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.handleWindowResize);
  },

  methods: {
    handleWindowResize() {
      this.containerWidth = this.$refs.sketchContainer.clientWidth;
      this.containerHeight = this.$refs.sketchContainer.clientHeight;

      if (this.p5Sketch) {
        this.p5Sketch.resizeCanvas(this.containerWidth, this.containerHeight);
      } else {
        this.createP5Sketch();
      }
    },

    createP5Sketch() {
      const container = this.$refs.sketchContainer
      this.p5Sketch = new p5(sketch, container)
    },
  },

  watch: {
    resize() {
            this.containerWidth = this.$refs.sketchContainer.clientWidth;
      this.containerHeight = this.$refs.sketchContainer.clientHeight;
        this.p5Sketch.resizeCanvas(this.containerWidth, this.containerHeight);
    }
  },
};

const sketch = function(p) {
  p.setup = function() {
    p.createCanvas(p.windowWidth, p.windowHeight);
  };

  p.draw = function() {
    p.background(220);
    p.ellipse(200, 100, 100, 100);
  };
};
</script>
