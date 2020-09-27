<template>
  <div class="container py-3 mx-auto">
    <div class="mb-6">
      <div class="mb-6 font-bold text-md">
        Ongoing Discussions
      </div>
      <div
        class="grid grid-cols-1 grid-rows-4 gap-3 sm:grid-rows-1 sm:grid-cols-4"
      >
        <Post v-for="post in topDiscussions" :key="post.id" :post="post" />
      </div>
    </div>

    <PlanetOfTheDay :planet="planetOfTheDay" :posts="topDiscussions" />

    <div class="grid min-w-0 min-h-0 grid-cols-3 grid-rows-1 gap-12 mt-6">
      <div class="min-w-0 col-span-3 overflow-hidden sm:col-span-2">
        <div class="mb-6 font-bold text-md">
          Your Feed
        </div>
        <article v-for="post in feed" :key="post.id">
          <div class="p-4 mb-3 bg-white border rounded-lg myborder dark:bg-gray-800">
            <div class="flex flex-row cursor-pointer">
              <div class="thumbnail">
                <div v-if="post.type === 'IMAGE'" class="flex flex-grow h-20 bg-cover rounded-lg sm:h-24" :style="`background-image: url(${post.link})`" />
                <div v-else class="flex flex-grow h-20 bg-gray-200 dark:bg-gray-800 sm:h-24">
                  <div class="m-auto text-gray-400 dark:text-gray-700">
                    <Icon v-if="post.type === 'TEXT'" size="48" name="text" />
                    <Icon v-else-if="post.type === 'LINK' || post.type === 'IMAGE'" size="48" name="text" />
                  </div>
                </div>
              </div>

              <div class="flex flex-col justify-start">
                <nuxt-link :to="post.relativeUrl" class="font-medium">
                  {{ post.title }}
                </nuxt-link>
                <div
                  v-if="post.textContent"
                  class="mt-1 text-sm text-secondary line-clamp-2"
                  v-html="post.textContent"
                />
                <PostAuthor class="pt-3 text-sm text-secondary" :post="post" />
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="hidden sm:block sm:col-span-1">
        <div class="sticky top-0" style="top: 4.5rem">
          <div class="mb-6 font-bold text-md">
            Popular Planets
          </div>
          <div class="bg-white border rounded-lg myborder dark:bg-gray-800">
            <div v-for="planet in popularPlanets" :key="planet.id" class="flex flex-row items-center p-3 transition duration-150 ease-in-out transform cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
              <img class="object-cover w-10 h-10 rounded-full" :src="planet.avatarImageUrl">
              <div class="flex flex-row items-center flex-grow planet">
                <div class="flex flex-col ml-6">
                  <div class="text-sm">
                    +{{ planet.name }}
                  </div>
                  <div class="text-xs text-secondary">
                    {{ planet.postCount }} post{{ planet.postCount == 1 ? '' : 's' }} today
                  </div>
                </div>

                <div class="px-3 py-1 ml-auto text-sm text-white bg-indigo-500 rounded-full btn hovergrow-10">
                  Join
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feedGql from '@/gql/feed'
import planetGql from '@/gql/planet'
import popularPlanetsGql from '@/gql/popularPlanets.graphql'
import { feedVars } from '@/util/feedVars'

export default {
  async asyncData ({ app, route }) {
    const client = app.apolloProvider.defaultClient

    const feed = (
      await client.query({
        query: feedGql,
        variables: { ...feedVars(route), types: ['IMAGE'] },
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

    const popularPlanets = (
      await client.query({
        query: popularPlanetsGql
      })
    ).data.popularPlanets

    return { feed, planetOfTheDay, popularPlanets }
  },
  data () {
    return {
      feed: [],
      planetOfTheDay: null,
      popularPlanets: []
    }
  },
  computed: {
    topDiscussions () {
      return this.feed.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.planet:hover > .btn {
  opacity: 1;
}

.planet > .btn {
  opacity: 0;
}

.thumbnail {
  @apply w-20 h-20 mr-6 sm:h-24 sm:w-24;
  min-width: 5rem;
}

@media (min-width: 640px) {
    .thumbnail {
      min-width: 6rem;
    }
}
</style>
