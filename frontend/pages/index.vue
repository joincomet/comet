<template>
  <div style="height: 100%; display: flex; flex-direction: row;">
    <div
      v-if="$device.isDesktop"
      id="changeText"
      :style="`position: absolute; bottom: 0; left: 0; width: 30%; border-top-right-radius: 10px; background-color: ${
        $vuetify.theme.dark
          ? 'rgba(32, 33, 36, 0.8)'
          : 'rgba(241, 243, 244, 0.8)'
      }`"
      :class="hideText ? 'hide' : ''"
      class="pa-4"
    >
      <a
        :href="images[currentDescription].link"
        target="_blank"
        rel="nofollow noopener noreferrer"
        class="text--primary hoverable"
        >{{ images[currentDescription].name }}</a
      >
      <div
        id="description"
        class="text--secondary"
        style="white-space: pre-line;"
      >
        {{ images[currentDescription].description }}
      </div>
    </div>

    <div
      v-if="$device.isDesktop"
      :style="`width: 60%; height: 100vh; background-size: cover; background-position: center; transition: background-image 3s ease-in-out; background-image: url(${images[currentImage].imageUrl})`"
    >
      <div
        :style="`position: absolute; width: 25%; height: 100%; bottom: 0; right: 40%; background-color: transparent; background-image: ${
          $vuetify.theme.dark
            ? 'linear-gradient(270deg,#202124,rgba(32,33,36,0))'
            : 'linear-gradient(270deg,#F1F3F4,rgba(241,243,244,0))'
        }`"
      />
    </div>

    <v-row
      no-gutters
      align="center"
      justify="center"
      :style="$device.isDesktop ? 'width: 40%' : 'width: 100%'"
      style="height: 100vh;"
    >
      <v-btn
        depressed
        rounded
        text
        style="position: absolute; top: 16px; right: 16px;"
        class="text--secondary"
        nuxt
        to="/home"
        >Continue without logging in</v-btn
      >

      <v-col
        md="11"
        sm="12"
        lg="11"
        xl="6"
        :class="$device.isDesktop ? '' : 'px-6'"
      >
        <div style="display: flex; flex-direction: column;">
          <img
            src="/CometLogoSvg.svg"
            style="margin-bottom: 16px; width: 164px;"
          />

          <div style="font-size: 2rem; font-weight: 500; margin-bottom: 24px;">
            See what's in
            <v-menu open-on-hover top offset-y nudge-left="200">
              <template v-slot:activator="{ on }">
                <span v-on="on">orbit.</span>
              </template>

              <v-card
                width="400"
                style="background-color: rgba(53, 54, 58, 0.9);"
              >
                <v-card-title style="font-size: 2rem;">or·bit</v-card-title>
                <v-card-subtitle style="font-size: 1rem;">
                  <span><em>noun.</em></span>
                  <ol>
                    <li>
                      the curved path of a celestial object or spacecraft around
                      a star, planet, or moon, especially a periodic elliptical
                      revolution.
                    </li>
                    <li>a sphere of activity, interest, or application.</li>
                  </ol>
                </v-card-subtitle>
              </v-card>
            </v-menu>
          </div>

          <nuxt-child />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import spaceImages from 'assets/spaceimages.json'

const i = Math.floor(Math.random() * spaceImages.length)
// preload next image
if (process.client) {
  new Image().src =
    spaceImages[i + 1 >= spaceImages.length ? 0 : i + 1].imageUrl
}

export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (store.state.currentUser) {
      return redirect('/home')
    }
  },
  layout: 'login',
  data() {
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
  mounted() {
    setInterval(() => {
      this.hideText = true
      setTimeout(() => {
        this.hideText = false
        this.currentDescription++
        if (this.currentDescription >= this.images.length)
          this.currentDescription = 0
      }, 1500)
      if (this.currentImage + 1 >= this.images.length) {
        this.currentImage = 0
      } else {
        this.currentImage++
      }
      // preload next image
      new Image().src = this.images[
        this.currentImage + 1 >= this.images.length ? 0 : this.currentImage + 1
      ].imageUrl
    }, 15000)
  },
  head: {
    title: 'Sign Up'
  }
}
</script>

<style scoped>
#changeText {
  opacity: 1;
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
</style>
