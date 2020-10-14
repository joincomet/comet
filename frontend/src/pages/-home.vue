<template>
  <div class="container py-5 px-5 2xl:px-64">
    <div class="grid grid-cols-7 gap-5">
      <div class="col-span-5 relative">
        <div class="z-10 fixed pr-5 -translate-x-1/2 left-1/2" style="bottom: 4rem">
          <div class="px-8 py-2 font-medium flex flex-row items-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white text-sm shadow-lg cursor-pointer duration-150 ease-in-out transition hover:scale-105 transform -translate-x-1/2">
            <div class="mx-auto inline-flex flex-row items-center">
              <svg class="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Create a post</span>
            </div>
          </div>
        </div>

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
              class="transition duration-150 ease-in-out relative align-middle h-full w-4 ml-4"
            >
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>

          <SortMenu />
        </div>

        <div class="mt-5">
          <div class="text-xs text-tertiary mb-3 px-3">
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'cards'}" @click="$layoutMode.preference = 'cards'">Cards</span> &middot;
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'small-cards'}" @click="$layoutMode.preference = 'small-cards'">Small Cards</span> &middot;
            <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'traditional'}" @click="$layoutMode.preference = 'traditional'">Traditional</span>
          </div>
          <Post v-for="post in posts" :key="post.id" :post="post" />
        </div>
      </div>
      <div class="col-span-2">
        <TrendingPlanets :planets="trendingPlanets" />
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
import postsGql from '~/gql/posts.graphql'
import planetsGql from '~/gql/planets.graphql'
import tailwindConfig from '~tailwind.config'

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
  @apply rounded-md w-full shadow px-6 py-2.5 inline-flex flex-row items-center mt-5 cursor-pointer transform transition duration-150 ease-in-out hover:scale-105;
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
