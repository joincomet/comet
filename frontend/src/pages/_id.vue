<template>
  <UserPage v-if="id.startsWith('@')" :user="user">
    {{ id }}
  </UserPage>
  <PlanetPage v-else-if="id.startsWith('+')" :planet="planet">
    {{ id }}
  </PlanetPage>
</template>

<script>
import userGql from '@/gql/user.graphql'
import planetGql from '@/gql/planet.graphql'

export default {
  components: {
    PlanetPage: () => import('@/components/pages/planet/PlanetPage'),
    UserPage: () => import('@/components/pages/user/UserPage')
  },
  middleware ({ redirect, params }) {
    const { id } = params
    if (id.length === 1 || (!id.startsWith('@') && !id.startsWith('+'))) { return redirect('/') }
  },
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient
    let user = null
    let planet = null
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
    }

    return {
      user,
      planet
    }
  },
  data () {
    return {
      user: null,
      planet: null
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>

</style>
