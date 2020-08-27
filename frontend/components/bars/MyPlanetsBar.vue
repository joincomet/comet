<template>
  <SortingBar>
    <v-btn
      v-if="$store.state.currentUser"
      depressed
      rounded
      color="primary"
      height="34"
      class="px-3"
      style="margin-bottom: 2px;"
    >
      <v-icon class="mr-2" size="20">{{
        $vuetify.icons.values.mdiEarth
      }}</v-icon>
      My Planets ({{ joinedPlanets.length }})</v-btn
    >
    <SignUpButton v-else />

    <ExplorePlanetsButton v-if="$device.isDesktop" />
  </SortingBar>
</template>

<script>
import SortingBar from '@/components/bars/SortingBar'
import joinedPlanetsGql from '@/gql/joinedPlanets'
import SignUpButton from '@/components/bars/SignUpButton'
import ExplorePlanetsButton from '@/components/bars/ExplorePlanetsButton'

export default {
  name: 'MyPlanetsBar',
  components: { ExplorePlanetsButton, SignUpButton, SortingBar },
  data() {
    return {
      joinedPlanets: []
    }
  },
  apollo: {
    joinedPlanets: {
      query: joinedPlanetsGql
    }
  }
}
</script>

<style scoped></style>
