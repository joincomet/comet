<template>
  <div class="container py-6 mx-auto">
    {{ allPlanets }}
  </div>
</template>

<script>
import allPlanetsGql from '@/gql/allPlanets.graphql'

export default {
  async asyncData ({ app }) {
    const client = app.apolloProvider.defaultClient
    let allPlanets = []
    allPlanets = (await client.query({
      query: allPlanetsGql
    })).data.allPlanets

    return { allPlanets }
  },
  data () {
    return {
      allPlanets: []
    }
  }
}
</script>
