<template>
  <div class="container mx-auto py-5 sm:px-5 2xl:px-80">
    <div class="grid grid-cols-7 gap-5">
      <div class="col-span-7 relative">
        <CreatePostButton />

        <ActionCards />

        <SearchBar ref="searchBar" />

        <div class="mt-5 rounded-lg shadow bg-white border border-gray-100 p-8 cursor-pointer transform transition duration-150 hover:scale-101">
          <div class="flex flex-row items-start">
            <img class="bg-gray-200 rounded-full h-8 w-8">
            <div class="flex flex-col items-start ml-4">
              <div class="text-xs text-tertiary font-medium">
                Dan Beneventano
              </div>
              <div class="text-base text-tertiary mt-0.5">
                Create a post
              </div>
            </div>
          </div>
        </div>

        <div class="text-xs text-tertiary mt-5 px-4">
          <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'cards'}" @click="$layoutMode.preference = 'cards'">Cards</span> &middot;
          <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'small-cards'}" @click="$layoutMode.preference = 'small-cards'">Small Cards</span> &middot;
          <span class="hover:underline cursor-pointer" :class="{'font-semibold': $layoutMode.preference === 'traditional'}" @click="$layoutMode.preference = 'traditional'">Traditional</span>
        </div>

        <div class="mt-5">
          <Post v-for="post in posts" :key="post.id" :post="post" class="sm:mb-5 mb-2" />
        </div>
      </div>
      <!--      <div class="hidden sm:block col-span-2">
        <div class="sticky" style="top: 1.25rem">
          <TrendingPlanets :planets="trendingPlanets" />
          <div class="socialbutton patreon">
            <iconify-icon icon="patreon" class="w-5 h-5" />
            <span class="font-medium text-sm ml-4">Support CometX on Patreon</span>
          </div>

          <div class="socialbutton discord">
            <iconify-icon icon="discord" class="w-5 h-5" />
            <span class="font-medium text-sm ml-4">Join the CometX Discord</span>
          </div>

          <div class="rounded-2xl bg-white p-4 border border-gray-200 mt-5 text-xs font-medium text-secondary grid grid-cols-2 gap-4">
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
