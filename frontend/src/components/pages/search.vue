<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col :class="$device.isDesktop ? '' : 'pa-0'">
          <PostsScroller
            v-model="dialog"
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
  async asyncData ({ app, route }) {
    const feed = (
      await app.apolloProvider.defaultClient.query({
        query: feedGql,
        variables: feedVars(route),
        fetchPolicy: 'network-only'
      })
    ).data.feed

    return { feed }
  },
  head () {
    if (this.selectedPost && this.dialog) { return postHead(this.selectedPost) } else {
      return {
        title: `"${this.$route.query.q}"`
      }
    }
  }
}
</script>

<style scoped></style>
