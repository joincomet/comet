<template>
  <div>
    <GalaxyCard
      v-if="!$device.isDesktop && galaxy"
      hide-buttons
      :galaxy="galaxy"
      tile
    />
    <v-container>
      <GalaxyCard
        v-if="$device.isDesktop && galaxy"
        hide-buttons
        :galaxy="galaxy"
      />
      <v-fade-transition hide-on-leave>
        <v-row v-show="$route.query.view !== 'planets'" justify="center">
          <v-col :class="$device.isDesktop ? '' : 'px-0'">
            <GalaxyBar v-if="galaxy" :galaxy="galaxy" />

            <PostsScroller
              v-model="dialog"
              :loading="$fetchState.pending"
              :items="feed"
              :selected-post="selectedPost"
              @togglehidden="toggleHidden"
              @toggleblock="toggleBlock"
              @infinite="showMore"
            />
          </v-col>
          <v-col v-if="$device.isDesktop" cols="3" class="pl-0">
            <div class="sticky">
              <GalaxyInfoCard :galaxy="galaxy" />
              <InfoLinks class="mt-3" />
            </div>
          </v-col>
        </v-row>
      </v-fade-transition>

      <v-fade-transition hide-on-leave>
        <div v-show="$route.query.view === 'planets'">
          <v-btn text class="text--secondary mt-3" nuxt :to="{ query: {} }">
            <v-icon class="mr-2">{{
              $vuetify.icons.values.mdiChevronLeft
            }}</v-icon>
            Back to posts
          </v-btn>
          <v-row>
            <v-col
              v-for="planet in allPlanets"
              :key="planet.name"
              :cols="$device.isDesktop ? 4 : 12"
            >
              <PlanetInfoCard :planet="planet" />
            </v-col>
          </v-row>
        </div>
      </v-fade-transition>
    </v-container>
  </div>
</template>

<script>
import postDialogMixin from '@/mixins/postDialogMixin'
import PostsScroller from '@/components/post/PostsScroller'
import GalaxyInfoCard from '@/components/GalaxyInfoCard'
import galaxyGql from '@/gql/galaxy.graphql'
import { postHead } from '@/util/postHead'
import InfoLinks from '@/components/InfoLinks'
import GalaxyCard from '@/components/GalaxyCard'
import allPlanetsGql from '@/gql/allPlanets.graphql'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import GalaxyBar from '@/components/bars/GalaxyBar'
import feedGql from '@/gql/feed'
import { feedVars } from '@/util/feedVars'

export default {
  name: 'Galaxy',
  scrollToTop: false,
  components: {
    GalaxyBar,
    PlanetInfoCard,
    GalaxyCard,
    InfoLinks,
    GalaxyInfoCard,
    PostsScroller
  },
  mixins: [postDialogMixin],
  async fetch() {
    this.allPlanets = (
      await this.$apollo.query({
        query: allPlanetsGql,
        variables: { galaxyName: this.$route.params.galaxyname },
        fetchPolicy: 'network-only'
      })
    ).data.allPlanets
    this.feed = (
      await this.$apollo.query({
        query: feedGql,
        variables: feedVars(this.$route),
        fetchPolicy: 'network-only'
      })
    ).data.feed
  },
  async asyncData({ app, params }) {
    const galaxy = (
      await app.apolloProvider.defaultClient.query({
        query: galaxyGql,
        variables: { galaxyName: params.galaxyname },
        fetchPolicy: 'network-only'
      })
    ).data.galaxy
    return { galaxy }
  },
  data() {
    return {
      galaxy: null,
      allPlanets: []
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  head() {
    if (this.selectedPost && this.dialog) return postHead(this.selectedPost)
    else if (!this.galaxy) return { title: 'Galaxy' }
    else return { title: this.galaxy.fullName }
  }
}
</script>

<style scoped></style>
