<template>
  <div>
    <PlanetPageGalaxyBar />
    <v-container>
      <GalaxyCard
        v-if="galaxy"
        v-show="$route.query.galaxy"
        :galaxy="galaxy"
        class="mt-3"
      />
      <v-row>
        <v-col
          v-for="(planet, index) in allPlanets"
          v-show="
            $route.query.galaxy
              ? planet.galaxy.name === $route.query.galaxy
              : true
          "
          :key="planet.name"
          :class="$device.isDesktop && index % 3 === 1 ? 'px-6' : ''"
          :cols="$device.isDesktop ? 4 : 12"
        >
          <PlanetInfoCard :planet="planet" show-visit-btn hide-description />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import allPlanetsGql from '@/gql/allPlanets.graphql'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import galaxyGql from '@/gql/galaxy.graphql'
import GalaxyCard from '@/components/GalaxyCard'
import PlanetPageGalaxyBar from '@/components/bars/PlanetPageGalaxyBar'

export default {
  components: { PlanetPageGalaxyBar, GalaxyCard, PlanetInfoCard },
  async asyncData({ app }) {
    const allPlanets = (
      await app.apolloProvider.defaultClient.query({
        query: allPlanetsGql,
        fetchPolicy: 'network-only'
      })
    ).data.allPlanets
    return { allPlanets }
  },
  data() {
    return {
      allPlanets: [],
      galaxy: null
    }
  },
  apollo: {
    galaxy: {
      query: galaxyGql,
      variables() {
        return {
          galaxyName: this.$route.query.galaxy
        }
      },
      skip() {
        return !this.$route.query.galaxy
      }
    }
  },
  head: {
    title: 'Discover Planets'
  }
}
</script>

<style scoped></style>
