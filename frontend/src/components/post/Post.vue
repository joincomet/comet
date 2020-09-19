<template>
  <div class="flex flex-col p-4 overflow-hidden bg-cover rounded-lg cursor-pointer" :style="post.type === 'IMAGE' && post.link ? `background-image: linear-gradient( rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75) ), url(${post.link})` : ''" @click="$router.push(post.relativeUrl)">
    <nuxt-link :to="post.relativeUrl" class="mb-12 text-white">
      {{ post.title }}
    </nuxt-link>

    <div class="flex flex-row items-center mt-auto">
      <img class="w-4 h-4 mr-3 rounded-full" :src="post.author.profilePicUrl">
      <span class="text-xs text-gray-300">{{ post.author.username }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    },
    alt: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moreOptions: false
    }
  },
  computed: {
    isMod () {
      return (
        this.$store.state.currentUser &&
        (this.$store.state.currentUser.admin ||
          !!this.$store.state.currentUser.moderatedPlanets.find(
            p => p.name === this.post.planet.name
          ))
      )
    }
  }
}
</script>

<style scoped></style>
