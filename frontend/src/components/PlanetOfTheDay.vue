<template>
  <div
    class="grid grid-flow-row grid-rows-2 grid-cols-1 sm:grid-rows-1 sm:grid-cols-2"
  >
    <div
      class="h-64 w-full flex bg-cover bg-center cursor-pointer"
      :style="`background-image: linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${planet.bannerImageUrl});`"
      @click="$router.push(`/p/${planet.name}`)"
    >
      <div class="m-auto items-center flex flex-col">
        <div class="mb-4 text-xs text-gray-400 uppercase tracking-widest">
          Planet of the Day
        </div>
        <img
          v-if="planet.avatarImageUrl"
          class="h-24 w-24 mb-2 object-cover rounded-full"
          :src="planet.avatarImageUrl"
          :alt="planet.name"
        >
        <div
          v-else
          class="h-24 w-24 mb-2"
          :style="`background-color: ${planet.themeColor}`"
        />
        <nuxt-link
          :to="`/p/${planet.name}`"
          class="text-2xl font-medium mb-1 text-white"
        >
          {{ planet.name }}
        </nuxt-link>
        <div class="text-base text-gray-400">
          {{ planet.userCount }} User{{
            planet.userCount === 1 ? '' : 's'
          }}
          &middot; {{ planet.postCount }} Post{{
            planet.postCount === 1 ? '' : 's'
          }}
        </div>
      </div>
    </div>

    <div
      class="h-64 w-full relative bg-cover bg-center bg-indigo-700 dark:bg-gray-800 cursor-pointer"
      :style="
        post.link && post.type === 'IMAGE'
          ? `background-image: url(${post.link});`
          : 'background-image: url()'
      "
      style="transition: background-image 0.5s ease-in-out"
      @click="$router.push(post.relativeUrl)"
    >
      <div
        v-if="post.link && post.type === 'IMAGE'"
        class="absolute w-full h-full top-0 rounded-r-lg"
        :style="'background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75));'"
      />
      <div
        class="absolute bottom-0 flex flex-row"
        style="transform: translateX(-50%); left: 50%"
      >
        <div
          v-for="(_, index) in posts"
          :key="index"
          class="p-3 cursor-pointer"
          @click.stop.prevent="setSlider(index)"
        >
          <div
            :class="
              page === index
                ? 'rounded-full h-2 w-2 bg-white border'
                : 'rounded-full h-2 w-2 bg-gray-600'
            "
          />
        </div>
      </div>
      <div>
        <transition-group name="fade">
          <div v-for="p in posts.filter((po) => po.id === post.id)" :key="p.id">
            <div
              v-show="p.id === post.id"
              class="items-start flex flex-col p-12"
            >
              <nuxt-link
                :to="p.relativeUrl"
                class="text-lg font-medium text-white"
              >
                {{ p.title }}
              </nuxt-link>
              <div class="text-gray-400 text-sm mt-2">
                {{ p.timeSince }}
              </div>
              <div class="flex flex-row items-center mt-4 text-white">
                <nuxt-link
                  :to="`/u/${p.author.username}`"
                  class="inline-flex flex-row items-center"
                >
                  <img
                    class="h-5 w-5 object-cover rounded-full mr-2"
                    :src="p.author.profilePicUrl"
                    :alt="p.author.username"
                  >
                  <span class="text-white">{{ p.author.username }}</span>
                </nuxt-link>

                <nuxt-link
                  :to="p.relativeUrl"
                  class="ml-6 inline-flex flex-row items-center"
                >
                  <Icon class="mr-2" name="comment" />
                  <span>{{ p.commentCount }}</span>
                </nuxt-link>

                <div class="ml-6 inline-flex flex-row items-center">
                  <Icon class="mr-2" name="rocket" />
                  <span>{{ p.endorsementCount }}</span>
                </div>
              </div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'PlanetOfTheDay',
  components: { Icon },
  props: {
    planet: {
      type: Object,
      required: true
    },
    posts: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      page: 0,
      intervalId: null
    }
  },
  computed: {
    post () {
      return this.posts[this.page]
    }
  },
  mounted () {
    this.startInterval()
  },
  methods: {
    setSlider (index) {
      this.page = index
      this.startInterval()
    },
    startInterval () {
      if (this.intervalId) { clearInterval(this.intervalId) }
      this.intervalId = setInterval(() => {
        this.page++
        if (this.page >= this.posts.length) { this.page = 0 }
      }, 7500)
    }
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active {
  transition-delay: 0.5s;
}
</style>
