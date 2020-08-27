<template>
  <div style="cursor: pointer;" @click="clickCometLogo">
    <v-img alt="Comet logo" src="/CometLogoSvg.svg" width="108" contain />
  </div>
</template>

<script>
export default {
  name: 'CometLogo',
  methods: {
    clickCometLogo() {
      if (this.$route.path === '/home') {
        window.scrollTo(0, 0)
      } else {
        this.$router.push({ path: '/home' })
      }
    }
  }
}
</script>

<style scoped></style>
