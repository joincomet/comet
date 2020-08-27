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
      style="margin-left: 6px; font-size: 0.86rem;"
      >{{ timeSince }}</span
    >

    <div v-if="$device.isDesktop" class="ml-2">
      <PlanetNameMenu :planet-data="post.planet" />
    </div>

    <v-spacer />

    <PostActions :post="post" />

    <PostOptions :post="post" />
  </v-row>
</template>

<script>
import { formatDistanceToNowStrict } from 'date-fns'
import PostOptions from '@/components/post/PostOptions'
import PostActions from '@/components/post/PostActions'
import UsernameMenu from '@/components/user/UsernameMenu'
import { timeSince } from '@/util/timeSince'
import PlanetNameMenu from '@/components/planet/PlanetNameMenu'

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
  },
  computed: {
    timeSince() {
      return (
        (this.$device.isDesktop
          ? formatDistanceToNowStrict(new Date(this.post.createdAt)) + ' ago'
          : timeSince(new Date(this.post.createdAt))) +
        (this.post.editedAt ? '*' : '')
      )
    },
    editedTimeSince() {
      if (!this.post.editedAt) return ''
      return (
        'Edited ' +
        formatDistanceToNowStrict(new Date(this.post.editedAt)) +
        ' ago'
      )
    }
  }
}
</script>

<style scoped></style>
