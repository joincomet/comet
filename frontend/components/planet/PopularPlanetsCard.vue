<template>
  <v-card flat :outlined="!$vuetify.theme.dark">
    <v-card-title class="pb-0">
      Popular Planets
      <v-icon class="ml-2">{{ $vuetify.icons.values.mdiTrendingUp }}</v-icon>
    </v-card-title>
    <v-list>
      <PlanetListItem
        v-for="planet in popularPlanets"
        :key="planet.name"
        :planet="planet"
      />
    </v-list>

    <v-card-actions>
      <v-btn
        depressed
        class="flex-grow-1"
        nuxt
        to="/planets/explore"
        :style="$vuetify.theme.dark ? '' : 'background-color: #DEE1E6'"
        >Discover Planets
        <v-icon size="20" class="ml-2">{{
          $vuetify.icons.values.mdiTelescope
        }}</v-icon></v-btn
      >
    </v-card-actions>

    <v-card-actions class="pt-0">
      <v-btn
        depressed
        class="flex-grow-1 white--text"
        nuxt
        to="/planets/create"
        color="primary"
        :style="$vuetify.theme.dark ? '' : 'background-color: #DEE1E6'"
      >
        Create a Planet
        <v-icon size="20" class="ml-2">{{
          $vuetify.icons.values.mdiEarthPlus
        }}</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PlanetListItem from '@/components/planet/PlanetListItem'
import popularPlanetsGql from '@/gql/popularPlanets'

export default {
  name: 'PopularPlanetsCard',
  components: { PlanetListItem },
  async fetch() {
    const popularPlanetsQuery = await this.$apollo.query({
      query: popularPlanetsGql
    })
    this.popularPlanets = popularPlanetsQuery.data.popularPlanets
  },
  data() {
    return {
      popularPlanets: []
    }
  }
}
</script>

<style scoped></style>
