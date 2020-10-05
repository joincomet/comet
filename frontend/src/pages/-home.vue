<template>
  <div class="container mx-auto p-5">
    <div class="fixed flex w-full z-10" style="bottom: 4rem">
      <div class="container grid grid-cols-12 gap-5">
        <div class="col-span-8 flex">
          <div class="mx-auto px-6 py-3 font-medium flex flex-row items-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white text-sm shadow-lg cursor-pointer duration-150 ease-in-out transition customtransform">
            <div class="mx-auto inline-flex flex-row items-center">
              <svg class="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Create a post</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-9">
        <ActionCards />

        <div class="flex flex-grow items-center">
          <div class="inline-flex flex-grow relative h-10 mr-5">
            <input
              ref="searchInput"
              type="text"
              placeholder="Search posts, @users and +planets"
              class="pl-12 pr-6 focus:border-indigo-600 origin-left transition duration-150 ease-in-out absolute h-10 border border-gray-200 rounded-full text-sm text-tertiary shadow w-full focus:outline-none"
              @focusin="searchFocused = true"
              @focusout="searchFocused = false"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="searchFocused ? 'text-indigo-600' : 'text-tertiary'"
              class="transition duration-150 ease-in-out relative align-middle h-full ml-4"
              style="width: 1.13rem"
            >
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>

          <SortMenu />
        </div>

        <div class="mt-5">
          <article v-for="post in feed" :key="post.id">
            <div class="p-4 mb-3 bg-white border rounded-xl myborder dark:bg-gray-800">
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
      </div>
      <div class="col-span-3">
        <PopularCommunities :popular-communities="popularCommunities" />
        <div class="socialbutton patreon">
          <svg class="w-5 h-5 mr-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
          </svg>
          <span class="font-medium text-sm text-white">Support CometX on Patreon</span>
        </div>

        <div class="socialbutton discord">
          <svg class="w-5 h-5 mr-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M20.222 0c1.406 0 2.54 1.137 2.607 2.475V24l-2.677-2.273-1.47-1.338-1.604-1.398.67 2.205H3.71c-1.402 0-2.54-1.065-2.54-2.476V2.48C1.17 1.142 2.31.003 3.715.003h16.5L20.222 0zm-6.118 5.683h-.03l-.202.2c2.073.6 3.076 1.537 3.076 1.537-1.336-.668-2.54-1.002-3.744-1.137-.87-.135-1.74-.064-2.475 0h-.2c-.47 0-1.47.2-2.81.735-.467.203-.735.336-.735.336s1.002-1.002 3.21-1.537l-.135-.135s-1.672-.064-3.477 1.27c0 0-1.805 3.144-1.805 7.02 0 0 1 1.74 3.743 1.806 0 0 .4-.533.805-1.002-1.54-.468-2.14-1.404-2.14-1.404s.134.066.335.2h.06c.03 0 .044.015.06.03v.006c.016.016.03.03.06.03.33.136.66.27.93.4.466.202 1.065.403 1.8.536.93.135 1.996.2 3.21 0 .6-.135 1.2-.267 1.8-.535.39-.2.87-.4 1.397-.737 0 0-.6.936-2.205 1.404.33.466.795 1 .795 1 2.744-.06 3.81-1.8 3.87-1.726 0-3.87-1.815-7.02-1.815-7.02-1.635-1.214-3.165-1.26-3.435-1.26l.056-.02zm.168 4.413c.703 0 1.27.6 1.27 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334.002-.74.573-1.338 1.27-1.338zm-4.543 0c.7 0 1.266.6 1.266 1.335 0 .74-.57 1.34-1.27 1.34-.7 0-1.27-.6-1.27-1.334 0-.74.57-1.338 1.27-1.338z" />
          </svg>
          <span class="font-medium text-sm text-white">Join the CometX Discord</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feedGql from '@/gql/feed.graphql'
import communityGql from '@/gql/community.graphql'
import popularCommunitiesGql from '@/gql/popularCommunities.graphql'
import { feedVars } from '@/util/feedVars'

export default {
  async asyncData ({ app, route }) {
    const client = app.apolloProvider.defaultClient

    const feed = (
      await client.query({
        query: feedGql,
        variables: { ...feedVars(route) },
        fetchPolicy: 'network-only'
      })
    ).data.feed

    const communityOfTheDay = (
      await client.query({
        query: communityGql,
        variables: {
          name: 'HistoryInPictures'
        }
      })
    ).data.community

    const popularCommunities = (
      await client.query({
        query: popularCommunitiesGql
      })
    ).data.popularCommunities

    return { feed, communityOfTheDay, popularCommunities }
  },
  data () {
    return {
      feed: [],
      communityOfTheDay: null,
      popularCommunities: [],
      tag: null,
      searchFocused: false
    }
  },
  computed: {
    topDiscussions () {
      return this.feed.slice(0, 4)
    }
  }
}
</script>

<style scoped lang="scss">
.thumbnail {
  @apply w-20 h-20 mr-6 sm:h-24 sm:w-24;
  min-width: 5rem;
}

@media (min-width: 640px) {
    .thumbnail {
      min-width: 6rem;
    }
}

.customtransform:hover {
  transform: scale(1.05);
}

.customtransform {
}

.socialbutton {
  @apply rounded-lg w-full shadow px-6 h-10 inline-flex flex-row items-center mt-5 cursor-pointer transform transition duration-150 ease-in-out hover:scale-105;
}

.discord {
  background-color: #7289DA;
}

.discord:hover {
  background-color: scale-color(#7289DA, $lightness: -10%)
}

.patreon {
  background-color: #F96854;
}

.patreon:hover {
  background-color: scale-color(#F96854, $lightness: -10%)
}
</style>
