<template>
  <div class="w-32 h-32 bg-indigo-500">
    {{ tag || $route.params.name }}
  </div>
</template>

<script>
import tagGql from '@/gql/tag.graphql'

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient

    const tag = (
      await client.query({
        query: tagGql,
        variables: { name: params.name },
        fetchPolicy: 'network-only'
      })
    ).data.tag

    return { tag }
  },
  data() {
    return {
      tag: null
    }
  }
}
</script>

<style scoped>

</style>
