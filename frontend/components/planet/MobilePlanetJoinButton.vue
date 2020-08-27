<template>
  <v-btn
    :outlined="planet.joined"
    depressed
    color="primary"
    class="flex-grow-1"
    rounded
    @click="toggleJoin"
  >
    {{ planet.joined ? 'Joined' : 'Join Planet' }}
  </v-btn>
</template>

<script>
import joinPlanetGql from '@/gql/joinPlanet'
import joinedPlanetsGql from '@/gql/joinedPlanets'
import leavePlanetGql from '@/gql/leavePlanet'

export default {
  name: 'MobilePlanetJoinButton',
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
