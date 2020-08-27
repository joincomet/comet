<template>
  <v-chip
    close
    :close-icon="planet.joined ? '' : $vuetify.icons.values.mdiPlus"
    :color="planet.themeColor ? planet.themeColor : 'primary'"
    class="ml-2"
    @click="toggleJoin"
    @click:close="toggleJoin"
    >{{ planet.joined ? 'Joined' : 'Join' }}</v-chip
  >
</template>

<script>
import joinPlanetGql from '@/gql/joinPlanet'
import joinedPlanetsGql from '@/gql/joinedPlanets'
import leavePlanetGql from '@/gql/leavePlanet'

export default {
  name: 'PlanetJoinButton',
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  methods: {
    toggleJoin() {
      if (this.planet.joined) this.leavePlanet()
      else this.joinPlanet()
    },
    joinPlanet() {
      if (!this.$store.state.currentUser) {
        this.$router.push('/signup')
        return
      }
      this.planet.joined = true
      this.planet.userCount++
      this.$apollo.mutate({
        mutation: joinPlanetGql,
        variables: {
          planetName: this.planet.name
        },
        refetchQueries: [{ query: joinedPlanetsGql }]
      })
    },
    leavePlanet() {
      this.planet.joined = false
      this.planet.userCount--
      this.$apollo.mutate({
        mutation: leavePlanetGql,
        variables: {
          planetName: this.planet.name
        },
        refetchQueries: [{ query: joinedPlanetsGql }]
      })
    }
  }
}
</script>

<style scoped></style>
