<template>
  <div :class="`image${random}`" class="bg-cover bg-center" />
</template>

<script>
export default {
  name: 'RandomSpaceImage',
  data () {
    return {
      random: Math.floor(Math.random() * 10) + 1
    }
  }
}
</script>

<style scoped>
.image1 {
  background-image: url('~assets/spaceimages/01.jpg');
}
.image2 {
  background-image: url('~assets/spaceimages/02.jpg');
}
.image3 {
  background-image: url('~assets/spaceimages/03.jpg');
}
.image4 {
  background-image: url('~assets/spaceimages/04.jpg');
}
.image5 {
  background-image: url('~assets/spaceimages/05.jpg');
}
.image6 {
  background-image: url('~assets/spaceimages/06.jpg');
}
.image7 {
  background-image: url('~assets/spaceimages/07.jpg');
}
.image8 {
  background-image: url('~assets/spaceimages/08.jpg');
}
.image9 {
  background-image: url('~assets/spaceimages/09.jpg');
}
.image10 {
  background-image: url('~assets/spaceimages/10.jpg');
}
</style>
