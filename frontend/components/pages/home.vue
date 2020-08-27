<template>
  <v-container class="pt-0">
    <v-row justify="center">
      <v-col :class="$device.isDesktop ? '' : 'px-0'">
        <MyPlanetsBar />

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
          <PopularPlanetsCard />
          <InfoLinks class="mt-3" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import postDialogMixin from '@/mixins/postDialogMixin'
import PostsScroller from '@/components/post/PostsScroller'
import PopularPlanetsCard from '@/components/planet/PopularPlanetsCard'
import { postHead } from '@/util/postHead'
import InfoLinks from '@/components/InfoLinks'
import MyPlanetsBar from '@/components/bars/MyPlanetsBar'
import feedGql from '@/gql/feed'
import { feedVars } from '@/util/feedVars'

export default {
  middleware({ store, redirect }) {
    // If the user is not authenticated
    if (!store.state.currentUser) {
      return redirect('/universe')
    }
  },
  name: 'Index',
  components: {
    MyPlanetsBar,
    InfoLinks,
    PopularPlanetsCard,
    PostsScroller
  },
  mixins: [postDialogMixin],
  async fetch() {
    this.feed = (
      await this.$apollo.query({
        query: feedGql,
        variables: feedVars(this.$route),
        fetchPolicy: 'network-only'
      })
    ).data.feed
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  scrollToTop: false,
  head() {
    if (this.selectedPost && this.dialog) return postHead(this.selectedPost)
    else
      return {
        title: 'My Planets'
      }
  }
}
</script>

<style scoped></style>
