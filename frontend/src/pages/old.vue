<template>
  <LazyUserPage v-if="id.startsWith('@')" :user="user" />
  <LazyCommunityPage v-else-if="id.startsWith('+')" :community="community" />
  <LazyGalaxyPage v-else-if="id.startsWith('#')" :galaxy="galaxy" />
</template>

<script>
import userGql from '@/gql/user.graphql'
import communityGql from '@/gql/community.graphql'
// import tagGql from '@/gql/tag.graphql'

export default {
  middleware ({ redirect, params }) {
    const { id } = params
    if (id.length === 1 || !['+', '@', '#'].includes(id[0])) { return redirect('/') }
  },
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient
    let user = null
    let community = null
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
      community = (await client.query({
        query: communityGql,
        variables: {
          communityName: id.substring(1)
        }
      })).data.community
    } /* else if (id.startsWith('#')) {
      community = (await client.query({
        query: tagGql,
        variables: {
          name: id.substring(1)
        }
      })).data.tag
    } */

    return {
      user,
      community
      // tag
    }
  },
  data () {
    return {
      user: null,
      community: null,
      galaxy: null
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
