<template>
  <div id="app">
    <!--<AppBar />-->

    <div class="flex flex-row">
      <NavDrawer />
      <LoginDialog />

      <div class="flex flex-grow" style="margin-left: 17.5rem">
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

</style>
