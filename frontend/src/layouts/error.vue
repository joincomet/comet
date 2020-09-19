<template>
  <div id="app">
    <AppBar />

    <div class="flex flex-row">
      <NavDrawer />

      <div class="flex flex-col items-center flex-grow mt-16">
        <div class="px-24 py-6 text-center">
          <nuxt-link to="/">
            <Icon class="h-6 mb-3" name="comet-logo" />
          </nuxt-link>

          <h1 v-if="error.statusCode === 404">
            {{ pageNotFound }}
          </h1>
          <h1 v-else>
            {{ otherError }}
          </h1>
          <nuxt-link to="/" class="underline text-accent">
            Home page
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AppBar from '@/components/AppBar'
import NavDrawer from '@/components/NavDrawer'

export default {
  name: 'Default',
  components: { AppBar, NavDrawer },
  data () {
    return {
      loginDialog: false
    }
  },

  methods: {
    openLoginDialog () {
      this.loginDialog = true
    }
  }
}
</script>

<style scoped>

</style>

<template>
  <div id="app">
    <div class="flex justify-center flex-grow">
      <nuxt-link to="/">
        <Icon class="h-6 mb-3" name="comet-logo" />
      </nuxt-link>

      <h1 v-if="error.statusCode === 404">
        {{ pageNotFound }}
      </h1>
      <h1 v-else>
        {{ otherError }}
      </h1>
      <nuxt-link to="/" class="underline text-accent">
        Home page
      </nuxt-link>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  components: { Icon },
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
