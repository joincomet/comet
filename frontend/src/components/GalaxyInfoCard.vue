<template>
  <v-card v-if="galaxy" flat :outlined="!$vuetify.theme.dark" :tile="tile">
    <img
      v-if="galaxy.bannerImageUrl"
      alt="Galaxy banner"
      loading="lazy"
      :src="galaxy.bannerImageUrl"
      style="
        background-color: var(--v-primary-base);
        height: 82px;
        width: 100%;
        object-fit: cover;
      "
    >

    <div
      v-else
      :style="`background-color: var(--v-primary-base); height: 82px; width: 100%; object-fit: cover;`"
    />

    <v-card-title class="pb-0" style="word-break: break-word">
      Popular Planets in {{ galaxy.fullName }}
      <v-icon class="ml-2">
        {{ $vuetify.icons.values.mdiTrendingUp }}
      </v-icon>
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
        nuxt
        :to="{ query: { view: 'planets' } }"
        depressed
        class="flex-grow-1"
        :style="$vuetify.theme.dark ? '' : 'background-color: #DEE1E6'"
      >
        {{ galaxy.planetCount }} Planet{{ galaxy.planetCount === 1 ? '' : 's' }}
        in this Galaxy
      </v-btn>
    </v-card-actions>
    <v-card-actions class="pt-0">
      <v-btn
        depressed
        class="flex-grow-1"
        nuxt
        :to="`/planets/create?galaxy=${galaxy.name}`"
        :style="$vuetify.theme.dark ? '' : 'background-color: #DEE1E6'"
      >
        Create a Planet
        <v-icon size="20" class="ml-2">
          {{ $vuetify.icons.values.mdiEarthPlus }}
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PlanetListItem from '@/components/planet/PlanetListItem'
import popularPlanetsGql from '@/gql/popularPlanets'

export default {
  name: 'GalaxyInfoCard',
  components: { PlanetListItem },
  props: {
    galaxy: {
      type: Object,
      required: true
    },
    tile: {
      type: Boolean,
      default: false
    }
  },
  async fetch () {
    const popularPlanetsQuery = await this.$apollo.query({
      query: popularPlanetsGql,
      variables: { galaxyName: this.$route.params.galaxyname },
      fetchPolicy: 'network-only'
    })
    this.popularPlanets = popularPlanetsQuery.data.popularPlanets
  },
  data () {
    return {
      popularPlanets: []
    }
  }
}
</script>

<style scoped></style>
