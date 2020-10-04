<template>
  <div id="app">
    <!--<AppBar />-->

    <div class="flex flex-row">
      <NavDrawer />

      <div class="flex flex-grow" style="margin-left: 17.5rem">
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
