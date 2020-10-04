<template>
  <div style="background-image: url('https://i.redd.it/etffl601ltq51.jpg'); transition: background-image 1s ease-in-out">
    {{ user }}
  </div>
</template>

<script>
import userGql from '@/gql/user.graphql'

export default {
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient
    const user = (await client.query({
      query: userGql,
      variables: {
        username: params.name
      }
    })).data.user

    return {
      user
    }
  },
  data () {
    return {
      user: null
    }
  }
}
</script>

<style scoped>

</style>
