<template>
  <div id="app">
    <AppBar />

    <div class="flex flex-row">
      <NavDrawer />

      <div class="mt-16">
        <nuxt />
      </div>
    </div>

    <!--<div id="galaxySlider">
      <div class="inset-x-0 flex items-center h-12 top-16 z-100">
        <div class="relative w-full max-w-screen-xl px-6 mx-auto">
          <div class="flex items-center text-sm uppercase">
            <div class="pr-4">
              <Icon size="16" class="text-gray-700" name="chevron-left" />
            </div>
            <div class="pr-6 text">My Planets</div>
            <div class="pr-6 text-gray-700 text">Universe</div>
            <div class="pl-4 ml-auto">
              <Icon size="16" class="text-gray-700" name="chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </div>-->
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
