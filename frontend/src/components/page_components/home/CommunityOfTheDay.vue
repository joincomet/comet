<template>
  <div
    class="grid grid-flow-row grid-cols-1 grid-rows-2 sm:grid-rows-1 sm:grid-cols-2"
  >
    <div
      class="flex w-full h-48 bg-center bg-cover rounded-l-lg cursor-pointer"
      :style="`background-image: linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${community.profile.banner});`"
      @click="$router.push(`/+${community.name}`)"
    >
      <div class="flex flex-col items-center m-auto">
        <div class="mb-4 text-xs tracking-widest text-gray-400 uppercase">
          Community of the Day
        </div>
        <img
          v-if="community.profile.avatar"
          class="object-cover w-20 h-20 mb-2 rounded-full"
          :src="community.profile.avatar"
          :alt="community.name"
        >
        <div
          v-else
          class="w-24 h-24 mb-2"
          :style="`background-color: ${community.profile.color}`"
        />
        <nuxt-link
          :to="`/+${community.name}`"
          class="mb-1 text-xl font-medium text-white"
        >
          {{ community.name }}
        </nuxt-link>
        <div class="text-sm text-gray-400">
          {{ community.userCount }} User{{
            community.userCount === 1 ? '' : 's'
          }}
          &middot; {{ community.postCount }} Post{{
            community.postCount === 1 ? '' : 's'
          }}
        </div>
      </div>
    </div>

    <div
      class="relative w-full h-48 bg-indigo-700 bg-center bg-cover rounded-r-lg cursor-pointer dark:bg-gray-800"
      :style="
        post.link && post.type === 'IMAGE'
          ? `background-image: url(${post.link});`
          : 'background-image: url()'
      "
      style="transition: background-image 0.5s ease-in-out; z-index: 0"
      @click="$router.push(post.relativeUrl)"
    >
      <div
        v-if="post.link && post.type === 'IMAGE'"
        class="absolute top-0 w-full h-full rounded-r-lg"
        :style="'background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75));'"
        style="z-index: -1"
      />
      <div
        class="absolute bottom-0 flex flex-row"
        style="transform: translateX(-50%); left: 50%; z-index: 1"
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
      <div style="z-index: 2">
        <transition-group name="fade">
          <div v-for="p in posts.filter((po) => po.id === post.id)" :key="p.id">
            <div
              v-show="p.id === post.id"
              class="flex flex-col items-start p-12"
            >
              <nuxt-link
                :to="p.relativeUrl"
                class="text-lg font-medium text-white line-clamp-2"
              >
                {{ p.title }}
              </nuxt-link>
              <div class="mt-2 text-sm text-gray-400">
                {{ p.timeSince }}
              </div>
              <div class="flex flex-row items-center mt-4 text-white">
                <nuxt-link
                  :to="`/u/${p.author.username}`"
                  class="inline-flex flex-row items-center"
                >
                  <img
                    class="object-cover w-5 h-5 mr-2 rounded-full"
                    :src="p.author.profile.avatar"
                    :alt="p.author.username"
                  >
                  <span class="text-white">{{ p.author.username }}</span>
                </nuxt-link>

                <nuxt-link
                  :to="p.relativeUrl"
                  class="inline-flex flex-row items-center ml-6"
                >
                  <Icon class="mr-2" name="comment" />
                  <span>{{ p.commentCount }}</span>
                </nuxt-link>

                <div class="inline-flex flex-row items-center ml-6">
                  <Icon class="mr-2" name="rocket" />
                  <span>{{ p.upvoteCount }}</span>
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
export default {
  name: 'CommunityOfTheDay',
  props: {
    community: {
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
