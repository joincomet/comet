<template>
  <div>
    <div class="flex flex-row items-center">
      <nuxt-link
        :to="`@${post.author.username}`"
        class="inline-flex flex-row items-center"
        @click.native.stop.prevent="$router.push(`@${post.author.username}`)"
      >
        <img
          v-if="post.author.profile.avatar"
          class="object-cover w-4 h-4 mr-2 rounded-full"
          :src="post.author.profile.avatar"
          :alt="post.author.username"
        >
        <span>{{ post.author.username }}</span>
      </nuxt-link>
      <span>&nbsp;in&nbsp;&nbsp;</span>
      <nuxt-link
        :to="`+${post.community.name}`"
        class="inline-flex flex-row items-center"
        @click.native.stop.prevent="$router.push(`+${post.community.name}`)"
      >
        <img
          v-if="post.community.profile.avatar"
          class="object-cover w-4 h-4 mr-2 rounded-full"
          :src="post.community.profile.avatar"
          :alt="post.community.name"
        >
        <span>+{{ post.community.name }}</span>
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
