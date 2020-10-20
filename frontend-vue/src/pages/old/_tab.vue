<template>
  <div>
    <div v-for="item in everything" :key="item.id">
      <div v-if="item.__typename === 'Post'">
        <div>{{ item.title }}</div>
        <div>{{ item.relativeURL }}</div>
      </div>
      <div v-else-if="item.__typename === 'Comment'">
        {{ item.textContent }}
      </div>
    </div>
  </div>
</template>

<script>
import commentsGql from '@/gql/comments.graphql'
import postsGql from '~/gql/posts.graphql'

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient
    let feed = []
    let comments = []
    if (!params.tab || params.tab === 'posts') {
      feed = (await client.query({
        query: postsGql,
        variables: {
          username: params.id.substring(1)
        }
      })).data.posts
    }
    if (!params.tab || params.tab === 'comments') {
      comments = (await client.query({
        query: commentsGql,
        variables: {
          username: params.id.substring(1)
        }
      })).data.comments
    }
    return { feed, comments }
  },
  data() {
    return {
      feed: [],
      comments: []
    }
  },
  computed: {
    everything() {
      return this.feed.concat(this.comments).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  }
}
</script>
