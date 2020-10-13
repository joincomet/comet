<template>
  <LazyUserPage v-if="id.startsWith('@')" :user="user" />
  <LazyPlanetPage v-else-if="id.startsWith('+')" :planet="planet" />
  <LazyGalaxyPage v-else-if="id.startsWith('#')" :galaxy="galaxy" />
</template>

<script>
import userGql from '@/gql/user.graphql'
import planetGql from '~/gql/planet.graphql'
// import tagGql from '@/gql/tag.graphql'

export default {
  middleware({ redirect, params }) {
    const { id } = params
    if (id.length === 1 || !['+', '@', '#'].includes(id[0])) { return redirect('/') }
  },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient
    let user = null
    let planet = null
    // const tag = null
    const { id } = params
    if (id.startsWith('@')) {
      user = (await client.query({
        query: userGql,
        variables: {
          username: id.substring(1)
        }
      })).data.user
    } else if (id.startsWith('+')) {
      planet = (await client.query({
        query: planetGql,
        variables: {
          planetName: id.substring(1)
        }
      })).data.planet
    } /* else if (id.startsWith('#')) {
      planet = (await client.query({
        query: tagGql,
        variables: {
          name: id.substring(1)
        }
      })).data.tag
    } */

    return {
      user,
      planet
      // tag
    }
  },
  data() {
    return {
      user: null,
      planet: null,
      galaxy: null
    }
  },
  computed: {
    id() {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
