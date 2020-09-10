<template>
  <div class="px-24 py-6">
    <PlanetOfTheDay :planet="planetOfTheDay" :posts="topDiscussions" />

    <div class="text-xl font-bold my-6">
      Ongoing Discussions
    </div>
    <div
      class="grid gap-4 grid-rows-4 sm:grid-rows-1 grid-cols-1 sm:grid-cols-4"
    >
      <Post v-for="post in topDiscussions" :key="post.id" :post="post" />
    </div>
    <div class="mt-6 grid grid-cols-3 grid-rows-1 gap-12 min-h-0 min-w-0">
      <div class="col-span-3 sm:col-span-2 overflow-hidden min-w-0">
        <div class="text-xl font-bold mb-6">
          Your Feed
        </div>
        <article v-for="post in feed" :key="post.id">
          <div class="pb-8" style="content-visibility: auto">
            <div class="flex flex-row cursor-pointer">
              <div class="flex flex-col items-center justify-start mr-4 pt-1 text-secondary text-xs">
                <Icon class="text-indigo-500" name="comment" />
                <span class="text-indigo-500">{{ post.commentCount }}</span>
                <Icon name="rocket" class="mt-4" />
                <span>{{ post.endorsementCount }}</span>
              </div>
              <div class="flex flex-col justify-start">
                <nuxt-link :to="post.relativeUrl" class="font-medium">
                  {{ post.title }}
                </nuxt-link>
                <div
                  v-if="post.textContent"
                  class="text-secondary text-sm line-clamp-2 mt-1"
                  v-html="post.textContent"
                />
                <PostAuthor class="text-sm text-secondary pt-3" :post="post" />
              </div>
              <div class="ml-auto pl-4">
                <div class="h-20 sm:h-24 w-20 sm:w-24">
                  <div v-if="post.type === 'IMAGE'" class="bg-cover flex flex-grow h-20 sm:h-24" :style="`background-image: url(${post.link})`" />
                  <div v-else class="flex flex-grow bg-gray-200 dark:bg-gray-800 h-20 sm:h-24">
                    <div class="m-auto text-gray-400 dark:text-gray-700">
                      <Icon v-if="post.type === 'TEXT'" size="48" name="text" />
                      <Icon v-else-if="post.type === 'LINK' || post.type === 'IMAGE'" size="48" name="text" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <div class="hidden sm:block sm:col-span-1">
        <div class="sticky top-0" style="top: 5.5rem">
          <div class="text-xl font-bold mb-6">
            Popular Planets
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '@/components/post/Post'
import feedGql from '@/gql/feed'
import planetGql from '@/gql/planet'
import { feedVars } from '@/util/feedVars'
import PlanetOfTheDay from '@/components/PlanetOfTheDay'
import Icon from '@/components/Icon'
import PostAuthor from '@/components/post/PostAuthor'

export default {
  components: { PostAuthor, Icon, PlanetOfTheDay, Post },
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
    topDiscussions () {
      return this.feed.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.line-clamp-2 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2; /* number of lines to show */
  -webkit-box-orient: vertical;

  /* These are technically the same, but use both */
  overflow-wrap: break-word;
  word-wrap: break-word;

  -ms-word-break: break-all;
  /* This is the dangerous one in WebKit, as it breaks things wherever */
  word-break: break-all;
  /* Instead use this non-standard one: */
  word-break: break-word;

  /* Adds a hyphen where the word breaks, if supported (No Blink) */
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;
}
</style>
