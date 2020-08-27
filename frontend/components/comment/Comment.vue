<template>
  <div>
    <div
      :style="{
        'padding-left': comment.level ? 10 * comment.level + 'px' : '0',
        'background-color': $vuetify.theme.dark
          ? expanded && !$device.isDesktop
            ? '#35363A'
            : '#202124'
          : expanded && !$device.isDesktop
          ? '#DEE1E6'
          : '#F8F9FA',
        'border-radius': $device.isDesktop ? '10px' : '0'
      }"
    >
      <div
        :style="{
          'border-left-color': borderColor,
          'border-left-width': '2px',
          'border-left-style': comment.level
            ? comment.level > 0
              ? 'solid'
              : 'none'
            : 'none',
          'background-color': 'transparent'
        }"
        @click="expanded = !expanded"
      >
        <v-card-text
          class="text--primary pt-3 pb-0 px-3"
          style="font-size: 1rem;"
        >
          <div v-if="showPostTitle" class="mb-1">
            <nuxt-link
              event=""
              :to="`/p/${post.planet.name}/comments/${post.id}/${postUrlName}`"
              class="font-weight-medium text--secondary"
              style="font-size: 0.86rem;"
              >{{ post.title }}</nuxt-link
            >
          </div>

          <TextContent
            v-show="!editing || !$device.isDesktop"
            :text-content="comment.textContent"
          />

          <client-only v-if="editing && $device.isDesktop">
            <Editor
              v-model="editHTML"
              show-submit-btn
              show-cancel-btn
              :loading="editBtnLoading"
              @cancelled="editing = false"
              @submitted="editComment(comment)"
            />
          </client-only>
        </v-card-text>

        <v-card-actions class="px-3 pb-3 pt-2">
          <UsernameMenu
            v-if="comment.author"
            :user-data="comment.author"
            :op="post && post.author && post.author.id === comment.author.id"
          />
          <span v-else-if="!comment.author" class="text--secondary"
            >[{{
              comment.textContent.includes('removed') ? 'removed' : 'deleted'
            }}]</span
          >

          <span
            :title="editedTimeSince"
            class="text--secondary ml-2"
            style="font-size: 0.86rem;"
            >{{ timeSince }}{{ editedTimeSince ? '*' : '' }}</span
          >

          <span
            v-if="!$device.isDesktop"
            class="ml-3"
            :class="isEndorsed ? 'primary--text' : 'text--secondary'"
            :style="{
              ...cssVars,
              'font-size': '0.86rem',
              'font-weight': '500',
              display: 'inline-flex',
              'align-items': 'center'
            }"
            @click.stop.prevent="toggleEndorsement"
          >
            <span>
              {{ endorsementCount }}
            </span>
            <AnimatedRocket
              :key="comment.id"
              :item="{ id: comment.id, isEndorsed }"
              :size="16"
              :style="cssVars"
              class="ml-1"
            />
          </span>

          <span
            v-if="isNew"
            class="ml-3 primary--text"
            style="font-size: 0.86rem;"
            >New</span
          >

          <template v-if="$device.isDesktop">
            <v-spacer />

            <CommentOptions
              v-if="
                comment.author &&
                $store.state.currentUser &&
                (comment.author.isCurrentUser ||
                  !!$store.state.currentUser.moderatedPlanets.find(
                    (p) => p.name === post.planet.name
                  ) ||
                  $store.state.currentUser.admin)
              "
              :comment="comment"
              :post="post"
              @startedit="startEdit(comment)"
              @deletecomment="deleteComment"
              @removecomment="removeComment"
            />

            <v-btn
              v-if="!hideReply"
              small
              text
              rounded
              class="text--secondary"
              @click="startReply(comment)"
            >
              <v-icon class="mr-2" size="20">{{
                $vuetify.icons.values.mdiReply
              }}</v-icon>
              Reply
            </v-btn>

            <v-btn
              :ripple="false"
              class="px-2"
              small
              rounded
              text
              :class="isEndorsed ? '' : 'text--secondary'"
              :title="`${endorsementCount} Rocket${
                endorsementCount === 1 ? '' : 's'
              }`"
              :style="cssVars"
              @click.stop.prevent="toggleEndorsement"
            >
              <AnimatedRocket
                :key="comment.id"
                class="mr-2"
                :item="{ id: comment.id, isEndorsed }"
              />
              <span :style="isEndorsed ? 'color: var(--theme-color)' : ''">{{
                endorsementCount
              }}</span>
            </v-btn>
          </template>
        </v-card-actions>
      </div>
      <client-only v-if="$device.isDesktop && replying">
        <div class="pa-3">
          <Editor
            v-model="replyHTML"
            show-cancel-btn
            :loading="replyBtnLoading"
            @cancelled="replying = false"
            @submitted="submitReply(comment)"
          />
        </div>
      </client-only>
    </div>

    <div v-show="expanded" v-if="!$device.isDesktop" style="display: flex;">
      <CommentOptions
        v-if="
          comment.author &&
          $store.state.currentUser &&
          (comment.author.isCurrentUser ||
            !!$store.state.currentUser.moderatedPlanets.find(
              (p) => p.name === post.planet.name
            ) ||
            $store.state.currentUser.admin)
        "
        :comment="comment"
        :post="post"
        @startedit="startEdit(comment)"
        @deletecomment="deleteComment"
        @removecomment="removeComment"
      />

      <v-btn text tile class="flex-grow-1" @click="startReply(comment)">
        <v-icon class="mr-2">{{ $vuetify.icons.values.mdiReply }}</v-icon>
        Reply
      </v-btn>

      <v-btn
        text
        tile
        class="flex-grow-1"
        :class="isEndorsed ? 'primary--text' : ''"
        @click="toggleEndorsement"
      >
        <v-icon class="mr-2">{{ $vuetify.icons.values.mdiRocket }}</v-icon>
        {{ endorsementCount }} Rocket{{ endorsementCount === 1 ? '' : 's' }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import { formatDistanceToNowStrict } from 'date-fns'
import gql from 'graphql-tag'
import { isEditorEmpty } from '@/util/isEditorEmpty'
import { timeSince } from '@/util/timeSince'
import { urlName } from '@/util/urlName'
import AnimatedRocket from '@/components/AnimatedRocket'
import commentMixin from '@/mixins/commentMixin'
import CommentOptions from '@/components/comment/options/CommentOptions'
import TextContent from '../TextContent'
import deleteCommentGql from '../../gql/deleteComment.graphql'
import toggleCommentEndorsementGql from '../../gql/toggleCommentEndorsement.graphql'
import UsernameMenu from '../user/UsernameMenu'

export default {
  name: 'Comment',
  components: {
    CommentOptions,
    AnimatedRocket,
    TextContent,
    Editor: () => import('@/components/editor/Editor'),
    UsernameMenu
  },
  mixins: [commentMixin],
  props: {
    showPostTitle: {
      type: Boolean,
      default: false
    },
    comment: {
      type: Object,
      required: true
    },
    hideReply: {
      type: Boolean,
      default: false
    },
    post: {
      type: Object,
      default: null
    },
    postView: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      childrenCollapsed: false,
      deleted: false,
      removed: false,
      expanded: false,
      isEndorsed: this.comment.isEndorsed,
      endorsementCount: this.comment.endorsementCount
    }
  },
  computed: {
    timeSince() {
      return this.$device.isDesktop
        ? formatDistanceToNowStrict(new Date(this.comment.createdAt)) + ' ago'
        : timeSince(new Date(this.comment.createdAt))
    },
    postUrlName() {
      if (!this.post) return ''
      return urlName(this.post.title)
    },
    isEditEmpty() {
      return isEditorEmpty(this.editHTML)
    },
    editedTimeSince() {
      if (!this.comment.editedAt) return ''
      return (
        'Edited ' +
        formatDistanceToNowStrict(new Date(this.comment.editedAt)) +
        ' ago'
      )
    },
    isNew() {
      if (!this.postView) return false
      return (
        new Date(this.comment.createdAt) > new Date(this.postView.createdAt)
      )
    },
    expandedCommentId: {
      get() {
        return this.$store.state.expandedCommentId
      },
      set(val) {
        this.$store.commit('setExpandedCommentId', val)
      }
    },
    borderColor() {
      if (!this.comment.level) return '#F44336'
      const l = (this.comment.level - 1) % 5
      switch (l) {
        case 0:
          return '#F44336'
        case 1:
          return '#3F51B5'
        case 2:
          return '#EF5350'
        case 3:
          return '#4CAF50'
        case 4:
          return '#FF9800'
      }
      return '#F44336'
    },
    cssVars() {
      return {
        '--theme-color': this.$vuetify.theme.themes.dark.primary
      }
    }
  },
  watch: {
    expanded(expanded) {
      if (!expanded) return
      this.expandedCommentId = this.comment.id
    },
    expandedCommentId(id) {
      if (id !== this.comment.id) this.expanded = false
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.replying) {
      const query = Object.assign({}, this.$route.query)
      delete query.replying
      this.$router.push({ path: this.$route.path, query })
    }
  },
  methods: {
    async deleteComment() {
      const confirmed = window.confirm(
        'Are you sure you want to delete this comment?'
      )
      if (!confirmed) return
      this.comment.textContent = '<p>[deleted]</p>'
      this.comment.author = null
      this.deleted = true
      await this.$apollo.mutate({
        mutation: deleteCommentGql,
        variables: { commentId: this.comment.id }
      })
      this.$forceUpdate()
    },
    async removeComment() {
      const reason = window.prompt('Reason for removal?')
      if (!reason) return
      this.comment.textContent = `<p>[removed: ${reason}]</p>`
      this.comment.author = null
      this.removed = true
      await this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!, $commentId: ID!, $removedReason: String!) {
            removeComment(
              planetName: $planetName
              commentId: $commentId
              removedReason: $removedReason
            )
          }
        `,
        variables: {
          planetName: this.post.planet.name,
          commentId: this.comment.id,
          removedReason: reason
        }
      })
      this.$forceUpdate()
    },
    async toggleEndorsement() {
      this.expanded = false

      if (!this.$store.state.currentUser) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Must log in to rocket this comment'
        })
        return
      }

      if (this.isEndorsed) {
        this.isEndorsed = false
        this.endorsementCount--
      } else {
        this.isEndorsed = true
        this.endorsementCount++
      }
      await this.$apollo.mutate({
        mutation: toggleCommentEndorsementGql,
        variables: {
          commentId: this.comment.id
        }
      })
    }
  }
}
</script>

<style scoped></style>
