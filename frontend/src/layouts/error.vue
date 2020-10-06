<template>
  <div class="container mx-auto p-5">
    <div class="px-24 py-6">
      <nuxt-link to="/">
        <img src="~/assets/logo.svg" class="h-8 mx-auto mb-5">
      </nuxt-link>

      <div v-if="error.statusCode === 404" class="text-xl">
        {{ pageNotFound }}
      </div>
      <pre v-else class="text-xl">
        {{ JSON.stringify(error, null, 4) }}
      </pre>
      <nuxt-link to="/" class="underline text-accent">
        Home page
      </nuxt-link>
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
