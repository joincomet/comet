<template>
  <div>
    <VLazyImage class="h-32 w-full object-cover" :src="planet.profile.banner" />
  </div>
</template>

<script>
import VLazyImage from 'v-lazy-image'
import planetGql from '~/gql/planet.graphql'

export default {
  components: { VLazyImage },
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient

    const planet = (await client.query({
      query: planetGql,
      variables: {
        name: params.planet
      }
    })).data.planet

    return {
      planet
    }
  },
  data() {
    return {
      planet: null,
      banner: ''
    }
  },
  mounted() {
    setTimeout(() => {
      this.banner = this.planet.profile.banner
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
