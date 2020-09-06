<template>
  <div class="container mx-auto py-3 sm:px-3">
    <div class="text-xl mb-3 px-3">
      Best Discussions
    </div>
    <div
      class="grid grid-flow-row gap-4 grid-rows-3 sm:grid-rows-1 grid-cols-1 sm:grid-cols-3"
    >
      <TestPost v-for="post in topThree" :key="post.id" :post="post" />
    </div>
    <PlanetOfTheDay class="mt-3" :planet="planetOfTheDay" :posts="topThree" />
    <div class="mt-3">
      <div class="text-xl mb-3 px-3">
        Your Feed
      </div>
    </div>
  </div>
</template>

<script>
import TestPost from '@/components/test/TestPost'
import feedGql from '@/gql/feed'
import planetGql from '@/gql/planet'
import { feedVars } from '@/util/feedVars'
import PlanetOfTheDay from '~/components/test/PlanetOfTheDay'

export default {
  components: { PlanetOfTheDay, TestPost },
  layout: 'test',
  async asyncData ({ app, route }) {
    const client = app.apolloProvider.defaultClient

    const feed = (
      await client.query({
        query: feedGql,
        variables: feedVars(route),
        fetchPolicy: 'network-only'
      })
    ).data.feed

    const planetOfTheDay = (
      await client.query({
        query: planetGql,
        variables: {
          planetName: 'HistoryInPictures'
        }
      })
    ).data.planet
    return { feed, planetOfTheDay }
  },
  data () {
    return {
      feed: [],
      planetOfTheDay: null
    }
  },
  computed: {
    topThree () {
      return this.feed.slice(0, 3)
    }
  }
}
</script>

<style scoped></style>
