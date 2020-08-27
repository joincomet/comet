<template>
  <SortingBar>
    <v-btn
      depressed
      rounded
      color="primary"
      height="34"
      class="px-3"
      style="margin-bottom: 2px;"
    >
      <v-icon class="mr-2" size="20">{{
        $vuetify.icons.values[galaxy.icon]
      }}</v-icon>
      {{ galaxy.fullName }}</v-btn
    >
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
      :to="{ query: { view: 'planets' } }"
      >{{ galaxy.planetCount }} Planet{{
        galaxy.planetCount === 1 ? '' : 's'
      }}</v-btn
    >
  </SortingBar>
</template>

<script>
import SortingBar from '@/components/bars/SortingBar'
export default {
  name: 'GalaxyBar',
  components: { SortingBar },
  props: {
    galaxy: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
