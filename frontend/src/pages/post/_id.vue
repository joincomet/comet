<template>
  <div>{{ post }}</div>
</template>

<script>
import postGql from '@/gql/post.graphql'
import postCommentsGql from '~/gql/comments.graphql'

export default {
  async asyncData({ app, params }) {
    const post = (
      await app.apolloProvider.defaultClient.query({
        query: postGql,
        variables: {
          postId: params.id
        }
      })
    ).data.post

    const postComments = (
      await app.apolloProvider.defaultClient.query({
        query: postCommentsGql,
        variables: {
          postId: params.id
        }
      })
    ).data.postComments
    return { post, postComments }
  },
  data() {
    return {
      post: null,
      postComments: []
    }
  }
}
</script>

<style scoped></style>
