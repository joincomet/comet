<template>
  <div id="app">
    <AppBar />

    <div class="flex flex-row">
      <NavDrawer />

      <div class="flex flex-grow mt-12">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
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
