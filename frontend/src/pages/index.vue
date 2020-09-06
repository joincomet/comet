<template>
  <div class="h-full flex flex-row">
    <div
      id="changeText"
      class="absolute bottom-0 left-0 w-1/3 rounded-t-lg p-4 bg-gray-900"
      :class="hideText ? 'hide' : ''"
    >
      <a
        :href="images[currentDescription].link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        class="text--primary hover:underline"
      >{{ images[currentDescription].name }}</a>
      <div
        id="description"
        class="text--secondary"
        style="white-space: pre-line"
      >
        {{ images[currentDescription].description }}
      </div>
    </div>

    <div
      class="w-1/2 bg-cover bg-center"
      style="transition: background-image 3s ease-in-out"
      :class="`image${currentImage + 1}`"
    />

    <div class="h-screen w-1/2 flex flex-row justify-center align-middle p-6">
      <nuxt-link to="/home" class="absolute top-4 right-4">
        <button class="text-secondary">
          Continue without logging in
        </button>
      </nuxt-link>

      <v-col
        md="11"
        sm="12"
        lg="11"
        xl="6"
        :class="$device.isDesktop ? '' : 'px-6'"
      >
        <div style="display: flex; flex-direction: column">
          <img
            src="/frontend/src/static/CometLogoSvg.svg"
            style="margin-bottom: 16px; width: 164px"
          >

          <div style="font-size: 2rem; font-weight: 500; margin-bottom: 24px">
            See what's in orbit.
          </div>

          <nuxt-child />
        </div>
      </v-col>
    </div>
    <div
      :class="`image${
        currentImage + 2 > 10 ? currentImage - 8 : currentImage + 2
      }`"
      style="visibility: hidden"
    />
  </div>
</template>

<script>
import spaceImages from '@/assets/spaceimages.json'

const i = Math.floor(Math.random() * spaceImages.length)

export default {
  middleware ({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.currentUser) {
      return redirect('/home')
    }
  },
  layout: 'login',
  data () {
    return {
      step: 1,
      backgroundUrl: null,
      images: spaceImages,
      currentImage: i,
      currentDescription: i,
      hideText: false,
      signingUp: false
    }
  },
  mounted () {
    setInterval(() => {
      this.hideText = true
      setTimeout(() => {
        this.hideText = false
        this.currentDescription++
        if (this.currentDescription >= this.images.length) { this.currentDescription = 0 }
      }, 1500)
      if (this.currentImage + 1 >= this.images.length) {
        this.currentImage = 0
      } else {
        this.currentImage++
      }
    }, 15000)
  },
  head: {
    title: 'Sign Up'
  }
}
</script>

<style scoped>
#changeText {
  opacity: 0.75;
  transition: opacity 1.5s;
}

.hide {
  opacity: 0 !important;
}

#changeText:not(:hover) > #description {
  font-size: 0;
  margin: 0;
  opacity: 0;
  padding: 0;
  /* fade out, then shrink */
  transition: opacity 0.25s, font-size 0.5s 0.25s, margin 0.5s 0.25s,
    padding 0.5s 0.25s;
}

#changeText:hover > #description {
  transition: font-size 0.25s, margin 0.25s, padding 0.25s, opacity 0.5s 0.25s;
}

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
