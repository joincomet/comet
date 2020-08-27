<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col :class="$device.isDesktop ? '' : 'pa-0'">
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
        <!--<v-col v-if="$device.isDesktop" cols="3">
          <div class="sticky">

          </div>
        </v-col>-->
      </v-row>
    </v-container>
  </div>
</template>

<script>
import postDialogMixin from '@/mixins/postDialogMixin'
import PostsScroller from '@/components/post/PostsScroller'
import { postHead } from '@/util/postHead'
import feedGql from '@/gql/feed'
import { feedVars } from '@/util/feedVars'

export default {
  name: 'Search',
  components: {
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
        title: `"${this.$route.query.q}"`
      }
  }
}
</script>

<style scoped></style>
