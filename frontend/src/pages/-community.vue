<template>
  <div>
    <VLazyImage class="h-32 w-full object-cover" :src="community.profile.banner" />
  </div>
</template>

<script>
import communityGql from '@/gql/community.graphql'
import VLazyImage from 'v-lazy-image'

export default {
  components: { VLazyImage },
  async asyncData ({ app, params }) {
    const client = app.apolloProvider.defaultClient

    const community = (await client.query({
      query: communityGql,
      variables: {
        name: params.name
      }
    })).data.community

    return {
      community
    }
  },
  data () {
    return {
      community: null,
      banner: ''
    }
  },
  mounted () {
    setTimeout(() => {
      this.banner = this.community.profile.banner
    }, 1000)
  }
}
</script>

<style scoped>
.v-lazy-image {
  opacity: 0;
  transition: opacity .6s;
}
.v-lazy-image-loaded {
  opacity: 1;
}
</style>
