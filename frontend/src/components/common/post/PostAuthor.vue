<template>
  <div>
    <div class="flex flex-row items-center">
      <nuxt-link
        :to="`@${post.author.username}`"
        class="inline-flex flex-row items-center"
        @click.native.stop.prevent="$router.push(`@${post.author.username}`)"
      >
        <img
          v-if="post.author.avatarImageUrl"
          class="object-cover w-4 h-4 mr-2 rounded-full"
          :src="post.author.avatarImageUrl"
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
          class="object-cover w-4 h-4 mr-2 rounded-full"
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
