<template>
  <v-row align="center" no-gutters>
    <span v-if="!post.author" class="text--secondary">[deleted]</span>
    <UsernameMenu
      v-else
      :user-data="post.author"
      :op="isPostView"
      @toggleblock="$emit('toggleblock')"
    />

    <span
      :title="editedTimeSince"
      class="text--secondary"
      style="margin-left: 6px; font-size: 0.86rem"
    >{{ timeSince }}</span>

    <div v-if="$device.isDesktop" class="ml-2">
      <PlanetNameMenu :planet-data="post.planet" />
    </div>

    <v-spacer />

    <PostActions :post="post" />

    <PostOptions :post="post" />
  </v-row>
</template>

<script>
import PostOptions from '@/components/old/post/PostOptions'
import PostActions from '@/components/old/post/PostActions'
import UsernameMenu from '@/components/old/user/UsernameMenu'
import PlanetNameMenu from '@/components/old/planet/PlanetNameMenu'

export default {
  name: 'PostBottomBar',
  components: {
    PlanetNameMenu,
    UsernameMenu,
    PostActions,
    PostOptions
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    isPostView: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped></style>
