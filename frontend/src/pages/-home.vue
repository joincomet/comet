<template>
  <div class="container py-5 sm:px-5 2xl:px-64">
    <div class="grid grid-cols-7 gap-5">
      <div class="col-span-7 sm:col-span-5 relative">
        <CreatePostButton />

        <ActionCards />

        <div class="flex flex-grow items-center px-3 sm:px-0">
          <div class="inline-flex flex-grow relative h-10 mr-5">
            <button type="submit" class="focus:outline-none absolute left-0 top-0 mt-3 mr-4 ml-4">
              <iconify-icon
                icon="search"
                :class="searchFocused ? 'text-indigo-600' : 'text-tertiary'"
                class="transition duration-150 ease-in-out"
                width="18"
                height="18"
              />
            </button>
            <input
              ref="searchInput"
              type="text"
              placeholder="Search posts, @users and +planets"
              class="pl-12 pr-6 focus:border-indigo-600 origin-left transition duration-150 ease-in-out h-10 border-2 border-gray-200 rounded-full text-sm text-tertiary w-full focus:outline-none"
              @focusin="searchFocused = true"
              @focusout="searchFocused = false"
            >
          </div>

          <SortMenu />
        </div>

        <div class="mt-5">
          <div class="text-xs text-tertiary mb-3 px-3">
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'cards'}" @click="$layoutMode.preference = 'cards'">Cards</span> &middot;
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'small-cards'}" @click="$layoutMode.preference = 'small-cards'">Small Cards</span> &middot;
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'traditional'}" @click="$layoutMode.preference = 'traditional'">Traditional</span>
          </div>
          <Post v-for="post in posts" :key="post.id" :post="post" class="sm:mb-5 mb-2" />
        </div>
      </div>
      <div class="hidden sm:block col-span-2">
        <TrendingPlanets :planets="trendingPlanets" />
        <div class="socialbutton patreon">
          <iconify-icon icon="patreon" class="w-5 h-5" />
          <span class="font-medium text-sm ml-4">Support CometX on Patreon</span>
        </div>

        <div class="socialbutton discord">
          <iconify-icon icon="discord" class="w-5 h-5" />
          <span class="font-medium text-sm ml-4">Join the CometX Discord</span>
        </div>

        <div class="rounded-2xl bg-white p-4 border border-gray-200 mt-5 text-xs font-medium text-secondary grid grid-cols-2 gap-4 sticky" style="top: 1.25rem">
          <div class="col-span-1 flex flex-col border-r border-gray-200 space-y-1">
            <nuxt-link to="/about/content" class="hover:underline cursor-pointer">
              Content Policy
            </nuxt-link>

            <nuxt-link to="/about/privacy" class="hover:underline cursor-pointer">
              Privacy Policy
            </nuxt-link>

            <nuxt-link to="/about/terms" class="hover:underline cursor-pointer">
              Terms of Service
            </nuxt-link>
          </div>

          <div class="col-span-1 flex flex-col space-y-1">
            <a href="https://discord.gg/NPCMGSm" target="_blank" rel="noreferrer noopener nofollow" class="hover:underline cursor-pointer">
              Discord
            </a>

            <a href="https://github.com/comet-app/cometx" target="_blank" rel="noreferrer noopener nofollow" class="hover:underline cursor-pointer">
              GitHub
            </a>

            <a href="https://patreon.com/getcomet" target="_blank" rel="noreferrer noopener nofollow" class="hover:underline cursor-pointer">
              Patreon
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import IconifyIcon from '@iconify/vue'
import patreon from '@iconify/icons-simple-icons/patreon'
import discord from '@iconify/icons-simple-icons/discord'
import search from '@iconify/icons-heroicons-solid/search'
import tailwindConfig from '~tailwind.config'
import planetsGql from '~/gql/planets.graphql'
import postsGql from '~/gql/posts.graphql'

IconifyIcon.addIcon('patreon', patreon)
IconifyIcon.addIcon('discord', discord)
IconifyIcon.addIcon('search', search)

export default {
  async asyncData({ app, params }) {
    const client = app.apolloProvider.defaultClient

    const posts = (
      await client.query({
        query: postsGql,
        variables: {
          sort: params.sort ? params.sort.toUpperCase() : 'HOT',
          time: params.time ? params.time.toUpperCase() : 'ALL',
          filter: 'ALL'
        },
        fetchPolicy: 'network-only'
      })
    ).data.posts

    const trendingPlanets = (
      await client.query({
        query: planetsGql,
        variables: {
          sort: 'TRENDING',
          pageSize: 5
        }
      })
    ).data.planets

    return { posts, trendingPlanets }
  },
  data() {
    return {
      posts: [],
      trendingPlanets: [],
      tag: null,
      searchFocused: false,
      tailwindConfig
    }
  }
}
</script>

<style scoped lang="scss">
.socialbutton {
  @apply text-white rounded-md w-full shadow px-6 py-2.5 inline-flex flex-row items-center mt-5 cursor-pointer transform transition duration-150 ease-in-out hover:scale-105;
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
