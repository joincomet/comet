<template>
  <nuxt-content
    class="prose prose-sm sm:prose lg:prose-lg xl:prose-2xl"
    :document="document"
  />
</template>

<script>
export default {
  async asyncData ({ $content, params }) {
    const document = await $content(params.page).fetch()

    return { document }
  },
  data () {
    return {
      document: null
    }
  }
}
</script>

<style scoped>

</style>
