<template>
  <div>
    <v-app-bar
      flat
      dense
      style="
        position: sticky;
        top: 48px;
        z-index: 20;
        border-bottom-width: 1px;
        border-bottom-style: solid;
      "
      :style="{
        'border-bottom-color': $vuetify.theme.dark
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)'
      }"
    >
      <v-container>
        <v-row no-gutters align="center" justify="center">
          <span>
            <v-icon class="mr-2">{{
              $vuetify.icons.values.mdiTelescope
            }}</v-icon>
            Explore Galaxies
          </span>
        </v-row>
      </v-container>
    </v-app-bar>
    <v-container>
      <v-row>
        <v-col
          v-for="(galaxy, index) in galaxies"
          :key="galaxy.name"
          :cols="$device.isDesktop ? 4 : 12"
          :class="$device.isDesktop && index % 3 === 1 ? 'px-6' : ''"
        >
          <GalaxyCard
            :galaxy="galaxy"
            @refetch="$apollo.queries.galaxies.refetch()"
          />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import galaxiesGql from '@/gql/galaxies.graphql'
import GalaxyCard from '@/components/GalaxyCard'

export default {
  components: { GalaxyCard },
  async asyncData({ app }) {
    const galaxies = (
      await app.apolloProvider.defaultClient.query({
        query: galaxiesGql
      })
    ).data.galaxies
    return { galaxies }
  },
  data() {
    return {
      galaxies: []
    }
  }
}
</script>

<style scoped></style>
