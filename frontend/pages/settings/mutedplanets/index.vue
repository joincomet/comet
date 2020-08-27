<template>
  <v-row>
    <v-col :cols="$device.isDesktop ? 6 : 12">
      <v-text-field
        v-model="mutingPlanetName"
        solo
        flat
        label="Mute a planet"
        :append-icon="$vuetify.icons.values.mdiEarthOff"
        @keydown.enter="mutePlanet"
        @click:append="mutePlanet"
      />
      <v-list v-show="mutedPlanets.length > 0">
        <v-list-item v-for="planet in mutedPlanets" :key="planet.name">
          <v-list-item-content>
            <v-list-item-title>p/{{ planet.name }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn text @click="unmute(planet)">Unmute</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import mutedPlanetsGql from '@/gql/mutedPlanets.graphql'

export default {
  middleware: 'authenticated',
  data() {
    return {
      mutedPlanets: [],
      mutingPlanetName: ''
    }
  },
  apollo: {
    mutedPlanets: {
      query: mutedPlanetsGql,
      fetchPolicy: 'cache-and-network'
    }
  },
  methods: {
    async mutePlanet() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation($planetName: ID!) {
              mutePlanet(planetName: $planetName)
            }
          `,
          variables: {
            planetName: this.mutingPlanetName
          },
          refetchQueries: [{ query: mutedPlanetsGql }]
        })
        this.mutingPlanetName = ''
      } catch (e) {
        this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
    },
    unmute(planet) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!) {
            unmutePlanet(planetName: $planetName)
          }
        `,
        variables: {
          planetName: planet.name
        },
        refetchQueries: [{ query: mutedPlanetsGql }]
      })
    }
  }
}
</script>

<style scoped></style>
