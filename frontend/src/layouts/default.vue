<template>
  <div id="app">
    <!--<AppBar />-->

    <div class="flex flex-row">
      <NavDrawer />
      <LoginDialog />
      <ImageDialog />

      <div class="page">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default'
}
</script>

<style scoped>
@media(min-width: 640px) {
  .page {
    margin-left: 17.5rem
  }
}

.page {
  @apply flex flex-grow;
}
</style>
