<template>
  <span>
    <nuxt-link
      class="mr-1"
      :to="`/p/${post.planet.name}/comments/${post.id}/${urlName}`"
      event=""
    >
      <v-btn
        class="px-2 text--secondary"
        small
        rounded
        text
        :title="`${post.commentCount} Comment${
          post.commentCount === 1 ? '' : 's'
        }`"
        @click.stop.prevent="openPost"
      >
        <v-icon size="20" class="mr-2">{{
          $vuetify.icons.values.mdiCommentOutline
        }}</v-icon>
        {{ post.commentCount }}
        <span v-if="newCommentCount > 0" class="primary--text">
          &nbsp;(+{{ newCommentCount }})</span
        >
      </v-btn>
    </nuxt-link>

    <v-btn
      :ripple="false"
      class="px-2 mr-1"
      small
      rounded
      text
      :class="post.isEndorsed ? '' : 'text--secondary'"
      :title="`${post.endorsementCount} Rocket${
        post.endorsementCount === 1 ? '' : 's'
      }`"
      :style="cssVars"
      @click.stop.prevent="toggleEndorsement"
    >
      <AnimatedRocket :key="post.id" class="mr-2" :item="post" />
      <span :style="post.isEndorsed ? 'color: var(--theme-color)' : ''">{{
        post.endorsementCount
      }}</span>
    </v-btn>
  </span>
</template>

<script>
import AnimatedRocket from '@/components/AnimatedRocket'
import togglePostEndorsementGql from '~/gql/togglePostEndorsement'
import { urlName } from '~/util/urlName'

export default {
  name: 'PostActions',
  components: { AnimatedRocket },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  computed: {
    cssVars() {
      return {
        '--theme-color': this.post.planet.themeColor
          ? this.post.planet.themeColor
          : this.$primaryColor
      }
    },
    newCommentCount() {
      if (!this.post.postView) return -1
      return this.post.commentCount - this.post.postView.lastCommentCount
    },
    urlName() {
      if (!this.post) return ''
      return urlName(this.post.title)
    }
  },
  methods: {
    openPost() {
      this.$router.push(
        `/p/${this.post.planet.name}/comments/${this.post.id}/${urlName(
          this.post.title
        )}`
      )
    },
    async toggleEndorsement() {
      if (!this.$store.state.currentUser) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Must log in to rocket this post'
        })
        return
      }

      if (this.post.isEndorsed) {
        this.post.isEndorsed = false
        this.post.endorsementCount--
      } else {
        this.post.isEndorsed = true
        this.post.endorsementCount++
      }
      await this.$apollo.mutate({
        mutation: togglePostEndorsementGql,
        variables: {
          postId: this.post.id
        }
      })
    }
  }
}
</script>

<style scoped></style>
