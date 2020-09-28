<template>
  <div>
    <div v-for="item in everything" :key="item.id">
      <div v-if="item.__typename === 'Post'">
        <div>{{ item.title }}</div>
        <div>{{ item.relativeUrl }}</div>
      </div>
      <div v-else-if="item.__typename === 'Comment'">
        {{ item.textContent }}
      </div>
    </div>
  </div>
</template>

<script>
import feedGql from '@/gql/feed.graphql'
import userCommentsGql from '@/gql/userComments.graphql'

export default {
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient
    let feed = []
    let userComments = []
    if (!params.tab || params.tab === 'posts') {
      feed = (await client.query({
        query: feedGql,
        variables: {
          username: params.id.substring(1)
        }
      })).data.feed
    }
    if (!params.tab || params.tab === 'comments') {
      userComments = (await client.query({
        query: userCommentsGql,
        variables: {
          username: params.id.substring(1)
        }
      })).data.userComments
    }
    return { feed, userComments }
  },
  data () {
    return {
      feed: [],
      userComments: []
    }
  },
  computed: {
    everything () {
      return this.feed.concat(this.userComments).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    }
  }
}
</script>
