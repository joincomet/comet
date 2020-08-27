<template>
  <div class="pb-3">
    <v-card
      outlined
      nuxt
      :to="`/p/${notif.post.planet.name}/comments/${notif.post.id}/${urlName}`"
      @click="$emit('closed')"
    >
      <div class="px-2 pt-2">
        <span
          v-if="notif.parentCommentId"
          class="text--secondary"
          style="font-size: 1rem;"
        >
          Reply to your comment on
        </span>
        <span v-else class="text--secondary" style="font-size: 1rem;">
          Reply to your post
        </span>
        <nuxt-link
          class="text--secondary"
          :to="`/p/${notif.post.planet.name}/comments/${notif.post.id}/${urlName}`"
          >&nbsp;"<span class="hoverable">{{ notif.post.title }}</span
          >"</nuxt-link
        >
        <TextContent :text-content="notif.comment.textContent" />
      </div>
      <v-card-actions class="pt-0">
        <UsernameMenu :user-data="notif.fromUser" />
        <v-spacer />
        <v-btn text small class="text--secondary" @click="markRead"
          >Dismiss</v-btn
        >
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import UsernameMenu from '@/components/user/UsernameMenu'
import { urlName } from '@/util/urlName'
import notificationsGql from '@/gql/notifications'
import TextContent from '@/components/TextContent'
import markNotificationReadGql from '../../gql/markNotificationRead.graphql'

export default {
  name: 'Notification',
  components: { TextContent, UsernameMenu },
  props: {
    notif: {
      type: Object,
      required: true
    },
    unreadOnly: {
      type: Boolean,
      required: true
    }
  },
  computed: {
    urlName() {
      return urlName(this.notif.post.title)
    }
  },
  methods: {
    async markRead() {
      await this.$apollo.mutate({
        mutation: markNotificationReadGql,
        variables: {
          id: this.notif.id
        },
        refetchQueries: [
          {
            query: notificationsGql,
            variables: { unreadOnly: this.unreadOnly }
          }
        ]
      })
    }
  }
}
</script>

<style scoped></style>
