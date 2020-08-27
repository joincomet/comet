<template>
  <div>
    <template v-if="!$store.state.currentUser">
      <div style="display: flex; flex-direction: row;" class="px-4 pt-2 pb-3">
        <v-btn
          nuxt
          to="/signup"
          depressed
          rounded
          height="34"
          color="secondary"
          class="white--text flex-grow-1"
          >Sign Up</v-btn
        >
      </div>
      <div style="display: flex; flex-direction: row;" class="px-4 pb-2">
        <v-btn
          nuxt
          to="/login"
          outlined
          rounded
          height="34"
          color="secondary"
          class="flex-grow-1"
          >Log In</v-btn
        >
      </div>
    </template>
    <div
      style="font-size: 0.86rem; display: flex;"
      class="text--secondary px-4 pt-2 pb-2"
    >
      <span class="mr-auto">Feeds</span>
    </div>
    <v-list class="py-0">
      <v-list-item v-if="$store.state.currentUser" dense to="/home">
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiEarth }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem;"
            >My Planets</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item dense to="/universe">
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiInfinity }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem;"
            >Universe</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div
      style="font-size: 0.86rem; display: flex;"
      class="text--secondary px-4 pt-2 pb-2"
    >
      <span class="mr-auto">Explore</span>
    </div>
    <v-list class="py-0">
      <v-list-item dense to="/planets/explore">
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiEarth }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem;"
            >Discover Planets</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item dense to="/galaxies/explore">
        <v-list-item-avatar size="24">
          <v-icon size="20">{{ $vuetify.icons.values.mdiTelescope }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title style="font-size: 1rem;"
            >Explore Galaxies</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <div
      v-if="
        $store.state.currentUser &&
        $store.state.currentUser.moderatedPlanets.length > 0
      "
    >
      <div style="font-size: 0.86rem;" class="px-4 pt-4 pb-2 green--text">
        Moderated
      </div>

      <v-list class="py-0">
        <PlanetListItem
          v-for="planet in $store.state.currentUser.moderatedPlanets"
          :key="planet.name"
          :planet="planet"
        />
      </v-list>
    </div>

    <div v-if="$store.state.recentPlanets.length > 0">
      <div style="font-size: 0.86rem;" class="text--secondary px-4 pt-4 pb-2">
        Recent
      </div>

      <v-list class="py-0">
        <PlanetListItem
          v-for="planet in $store.state.recentPlanets"
          :key="planet.name"
          :planet="planet"
        />
      </v-list>
    </div>

    <div v-if="joinedPlanets.length > 0">
      <div style="font-size: 0.86rem;" class="text--secondary px-4 pt-4 pb-2">
        My Planets
      </div>

      <!--<v-text-field
        solo
        flat
        dense
        label="Filter"
        hide-details
        class="mx-2 mb-2"
        style="height: 34px"
      />-->

      <v-list class="py-0">
        <PlanetListItem
          v-for="planet in joinedPlanets"
          :key="planet.name"
          :planet="planet"
        />
      </v-list>
    </div>

    <div v-if="$device.isDesktop" style="height: 96px;" />
  </div>
</template>

<script>
import joinedPlanetsGql from '@/gql/joinedPlanets'
import PlanetListItem from '@/components/planet/PlanetListItem'

export default {
  name: 'NavDrawerContents',
  components: { PlanetListItem },
  async fetch() {
    this.joinedPlanets = (
      await this.$apollo.query({
        query: joinedPlanetsGql
      })
    ).data.joinedPlanets
  },
  data() {
    return {
      joinedPlanets: [],
      galaxies: [],
      recentPlanetNames: []
    }
  },
  watch: {
    '$route.path'() {
      this.updateRecentPlanets()
    }
  },
  mounted() {
    this.updateRecentPlanets()
  },
  methods: {
    updateRecentPlanets() {
      const item = localStorage.getItem('recentPlanets')
      if (!item) return
      this.recentPlanetNames = JSON.parse(item)
      this.$store.dispatch('updateRecentPlanets', this.recentPlanetNames)
    }
  },
  apollo: {
    joinedPlanets: {
      query: joinedPlanetsGql
    }
  }
}
</script>

<style scoped>
.linkactive {
  color: var(--v-primary-base) !important;
}

.linkactive:before {
  opacity: 0 !important;
}

.planetactive:before {
  opacity: 0.06 !important;
}

>>> .v-input__control {
  min-height: 34px !important;
  height: 34px !important;
}

>>> .v-label {
  font-size: 1rem;
}
</style>
