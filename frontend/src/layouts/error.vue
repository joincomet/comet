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

          <div v-if="error.statusCode === 404" class="text-xl">
            {{ pageNotFound }}
          </div>
          <div v-else class="text-xl">
            {{ otherError }}
          </div>
          <nuxt-link to="/" class="underline text-accent">
            Home page
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
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
</style>
