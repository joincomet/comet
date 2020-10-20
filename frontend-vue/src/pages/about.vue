<template>
  <div class="container mx-auto">
    <div class="grid grid-rows-1 grid-cols-2">
      <div class="sticky">
        <nuxt-link to="/about/terms">
          Terms of Service
        </nuxt-link>
        <nuxt-link to="/about/privacy">
          Privacy Policy
        </nuxt-link>
        <nuxt-link to="/about/content">
          Content Policy
        </nuxt-link>
      </div>

      <div>
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>

</style>
