<template>
  <v-menu
    v-if="$device.isDesktop"
    v-model="menu"
    offset-y
    open-on-hover
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <PlanetName :planet="planetData" />
      </span>
    </template>

    <PlanetInfoCard v-if="planet" is-hover :planet="planet" hide-description />
    <v-card v-else width="400">
      <div class="pa-4">
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </div>
    </v-card>
  </v-menu>

  <v-bottom-sheet v-else v-model="menu">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <PlanetName :planet="planetData" />
      </span>
    </template>

    <PlanetInfoCard
      v-if="planet"
      style="padding-bottom: 24px;"
      show-view-planet-btn
      :planet="planet"
      hide-description
    />
    <v-card v-else>
      <div class="pa-4">
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import planetGql from '@/gql/planet.graphql'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import PlanetName from '@/components/planet/PlanetName'

export default {
  name: 'PlanetNameMenu',
  components: { PlanetName, PlanetInfoCard },
  props: {
    planetData: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      planet: null,
      menu: false
    }
  },
  apollo: {
    planet: {
      query: planetGql,
      variables() {
        return {
          planetName: this.planetData.name
        }
      },
      skip() {
        return !this.menu
      }
    }
  }
}
</script>

<style scoped></style>
