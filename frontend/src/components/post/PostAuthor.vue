<template>
  <div>
    <div class="flex flex-row items-center">
      <nuxt-link
        :to="`@${post.author.username}`"
        class="inline-flex flex-row items-center"
        @click.native.stop.prevent="$router.push(`@${post.author.username}`)"
      >
        <img
          v-if="post.author.profilePicUrl"
          class="h-4 w-4 mr-2 object-cover rounded-full"
          :src="post.author.profilePicUrl"
          :alt="post.author.username"
        >
        <span>{{ post.author.username }}</span>
      </nuxt-link>
      <span>&nbsp;in&nbsp;&nbsp;</span>
      <nuxt-link
        :to="`+${post.planet.name}`"
        class="inline-flex flex-row items-center"
        @click.native.stop.prevent="$router.push(`+${post.planet.name}`)"
      >
        <img
          v-if="post.planet.avatarImageUrl"
          class="h-4 w-4 mr-2 object-cover rounded-full"
          :src="post.planet.avatarImageUrl"
          :alt="post.planet.name"
        >
        <span>+{{ post.planet.name }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostAuthor',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
