<template>
  <div id="app">
    <AppBar />

    <div class="flex flex-row">
      <NavDrawer />

      <div class="flex items-center flex-grow mt-16">
        <nuxt />
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
