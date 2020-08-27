<template>
  <SortingBar>
    <v-chip
      pill
      outlined
      :style="`border-style: solid; border-width: 1px; margin-bottom: 2px; height: 34px; border-color: ${
        $vuetify.theme.dark
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)'
      }`"
      class="px-3"
      nuxt
      to="/planets/explore"
    >
      <v-avatar color="primary" left>
        <img
          v-if="planet.avatarImageUrl"
          loading="lazy"
          :src="planet.avatarImageUrl"
        />
        <v-icon v-else>{{ $vuetify.icons.values.mdiEarth }}</v-icon>
      </v-avatar>
      {{ planet.customName || planet.name }}</v-chip
    >

    <template v-if="$device.isDesktop">
      <v-btn
        text
        rounded
        height="34"
        class="px-3 ml-2"
        style="border-style: solid; border-width: 1px; margin-bottom: 2px;"
        :style="{
          'border-color': $vuetify.theme.dark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.12)'
        }"
      >
        <v-icon size="20" class="mr-2">{{
          $vuetify.icons.values.mdiAccountMultiple
        }}</v-icon>
        {{ planet.userCount }} User{{
          planet.userCount === 1 ? '' : 's'
        }}</v-btn
      >
      <v-btn
        rounded
        text
        height="34"
        class="px-3 ml-2"
        style="border-style: solid; border-width: 1px; margin-bottom: 2px;"
        :style="{
          'border-color': $vuetify.theme.dark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.12)'
        }"
        nuxt
        :to="`/g/${planet.galaxy.name}`"
      >
        <v-icon class="mr-2" size="20">{{
          $vuetify.icons.values[planet.galaxy.icon]
        }}</v-icon>
        {{ planet.galaxy.fullName }}</v-btn
      >
    </template>
  </SortingBar>
</template>

<script>
import SortingBar from '@/components/bars/SortingBar'
export default {
  name: 'PlanetBar',
  components: { SortingBar },
  props: {
    planet: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
