<template >
  <div>
    <v-stage ref="stage" :config="stageSize">
      <v-layer :config="{
        x: imageConfig.x,
        y: imageConfig.y
      }">
        <v-image @mousemove="teste" :config="imageConfig" />
      </v-layer>
      <v-layer :config="{
        x: imageConfig2.x,
        y: imageConfig2.y
      }">
        <v-image @mousemove="teste" :config="imageConfig" />
      </v-layer>
      <v-layer :config="{
        x: imageConfig3.x,
        y: imageConfig3.y
      }">
        <v-image @mousemove="teste" :config="imageConfig" />
      </v-layer>
    </v-stage>
  </div>
</template>
<script>
const width = window.innerWidth;
const height = window.innerHeight;
export default {


  data() {
    return {
      stageSize: {
        width: width,
        height: height
      },
      isDragging: null,
      image: null,
      imageConfig:
      {
        width: 50,
        height: 75,
        image: this.image,
        draggable: true,
      },
      imageConfig2:
      {
        x: 50,
        y: 0,
        width: 50,
        height: 75,
        image: this.image,
        draggable: true,
      },
      imageConfig3:
      {
        x: 100,
        y: 0,
        width: 50,
        height: 75,
        image: this.image,
        draggable: true,
      },
    };
  },
  watch: {
    isDragging(val) {
      console.log(val)
    }
  },
  created() {
    const image = new window.Image();
    image.src = "https://img1.gratispng.com/20180314/pkq/kisspng-space-shuttle-free-content-spacecraft-clip-art-circulation-cliparts-5aa9e586ee7631.6942205015210837829768.jpg";
    image.onload = () => {
      this.image = image;
      this.imageConfig.image = image
    };

  },
  methods: {
    teste(e) {
      console.log(e)
      // console.log(this.imageConfig.x += 5)//Como movimentar O canvas
    },
    getImgUrl(pet) {
      var images = require.context('../assets/', false, /\.png$/)
      return images('./' + pet + ".png")
    },
  }
};

</script>
<style>
</style>