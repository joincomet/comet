<template>
  <div class="container py-6 mx-auto">
    {{ allCommunities }}
  </div>
</template>

<script>
import allCommunitiesGql from '@/gql/communities.graphql'

export default {
  async asyncData ({ app }) {
    const client = app.apolloProvider.defaultClient
    let allCommunities = []
    allCommunities = (await client.query({
      query: allCommunitiesGql
    })).data.allCommunities

    return { allCommunities }
  },
  data () {
    return {
      allCommunities: []
    }
  }
}
</script>
