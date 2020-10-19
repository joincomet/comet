<template>
  <div class="container py-5 mx-auto sm:px-5 2xl:px-80">
    <div class="grid grid-cols-7 gap-5">
      <div class="relative col-span-7">
        <CreatePostButton />

        <ActionCards />

        <SearchBar ref="searchBar" />

        <div class="p-8 mt-5 transition duration-150 transform bg-white border border-gray-100 rounded-lg shadow cursor-pointer hover:scale-101">
          <div class="flex flex-row items-start">
            <img class="w-8 h-8 bg-gray-200 rounded-full">
            <div class="flex flex-col items-start ml-4">
              <div class="text-xs font-medium text-tertiary">
                Dan Beneventano
              </div>
              <div class="text-base text-tertiary mt-0.5">
                Create a post
              </div>
            </div>
          </div>
        </div>

        <div class="px-4 mt-5 text-xs text-tertiary">
          <span class="cursor-pointer hover:underline" :class="{'font-semibold': $layoutMode.preference === 'cards'}" @click="$layoutMode.preference = 'cards'">Cards</span> &middot;
          <span class="cursor-pointer hover:underline" :class="{'font-semibold': $layoutMode.preference === 'small-cards'}" @click="$layoutMode.preference = 'small-cards'">Small Cards</span> &middot;
          <span class="cursor-pointer hover:underline" :class="{'font-semibold': $layoutMode.preference === 'traditional'}" @click="$layoutMode.preference = 'traditional'">Traditional</span>
        </div>

        <div class="mt-5">
          <Post v-for="post in posts" :key="post.id" :post="post" class="mb-2 sm:mb-5" />
        </div>
      </div>
      <!--      <div class="hidden col-span-2 sm:block">
        <div class="sticky" style="top: 1.25rem">
          <TrendingPlanets :planets="trendingPlanets" />
          <div class="socialbutton patreon">
            <iconify-icon icon="patreon" class="w-5 h-5" />
            <span class="ml-4 text-sm font-medium">Support CometX on Patreon</span>
          </div>

          <div class="socialbutton discord">
            <iconify-icon icon="discord" class="w-5 h-5" />
            <span class="ml-4 text-sm font-medium">Join the CometX Discord</span>
          </div>

          <div class="grid grid-cols-2 gap-4 p-4 mt-5 text-xs font-medium bg-white border border-gray-200 rounded-2xl text-secondary">
            <div class="flex flex-col col-span-1 space-y-1 border-r border-gray-200">
              <nuxt-link to="/about/content" class="cursor-pointer hover:underline">
                Content Policy
              </nuxt-link>

              <nuxt-link to="/about/privacy" class="cursor-pointer hover:underline">
                Privacy Policy
              </nuxt-link>

              <nuxt-link to="/about/terms" class="cursor-pointer hover:underline">
                Terms of Service
              </nuxt-link>
            </div>

            <div class="flex flex-col col-span-1 space-y-1">
              <a href="https://discord.gg/NPCMGSm" target="_blank" rel="noreferrer noopener nofollow" class="cursor-pointer hover:underline">
                Discord
              </a>

              <a href="https://github.com/comet-app/cometx" target="_blank" rel="noreferrer noopener nofollow" class="cursor-pointer hover:underline">
                GitHub
              </a>

              <a href="https://patreon.com/getcomet" target="_blank" rel="noreferrer noopener nofollow" class="cursor-pointer hover:underline">
                Patreon
              </a>
            </div>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
import planetsGql from '~/gql/planets.graphql'
import postsGql from '~/gql/posts.graphql'

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
      observer: null
    }
  },
  computed: {
    topBar: {
      get() {
        return this.$store.state.topBar
      },
      set(val) {
        this.$store.commit('setTopBar', val)
      }
    }
  },
  mounted() {
    this.observer = new IntersectionObserver(
      (entries) => {
        const searchBar = entries[0]
        if (searchBar.isIntersecting) { this.topBar = false } else { this.topBar = true }
      }
    )
    this.observer.observe(this.$refs.searchBar.$el)
    this.$nextTick(() => { this.topBar = false })
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
