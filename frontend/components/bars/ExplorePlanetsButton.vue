<template>
  <v-btn
    outlined
    rounded
    height="34"
    class="px-3 ml-2"
    style="border-style: solid; border-width: 1px; margin-bottom: 2px;"
    :style="{
      'border-color': $vuetify.theme.dark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)'
    }"
    nuxt
    to="/planets/explore"
  >
    <v-icon class="mr-2" size="20">{{
      $vuetify.icons.values.mdiTelescope
    }}</v-icon>
    Discover Planets</v-btn
  >
</template>

<script>
export default {
  name: 'ExplorePlanetsButton'
}
</script>

<style scoped></style>
