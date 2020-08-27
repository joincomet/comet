<template>
  <div>
    <PostDialog
      v-model="dialog"
      :post="post"
      standalone
      :comments="postComments"
    />
  </div>
</template>

<script>
import PostDialog from '@/components/pages/PostDialog'
import postGql from '@/gql/post'
import postCommentsGql from '@/gql/postComments'
import { postHead } from '@/util/postHead'

export default {
  name: 'PostStandalone',
  components: { PostDialog },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient
    const post = (
      await client.query({
        query: postGql,
        variables: { postId: params.id },
        fetchPolicy: 'network-only'
      })
    ).data.post
    const postComments = (
      await client.query({
        query: postCommentsGql,
        variables: { postId: params.id },
        fetchPolicy: 'network-only'
      })
    ).data.post
    return { post, postComments }
  },
  data() {
    return {
      dialog: true,
      post: null,
      postComments: []
    }
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.$router.push({
          name: 'p-planetname-sort-time',
          params: { planetname: this.$route.params.planetname }
        })
      }
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  head() {
    return postHead(this.post)
  }
}
</script>

<style scoped></style>
