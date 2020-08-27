<template>
  <v-container>
    <v-row>
      <v-col>
        <div class="headline">
          Notifications
        </div>
        <v-row class="mx-0 my-2">
          <v-btn
            aria-label="Unread Only"
            :ripple="false"
            text
            small
            class="mr-1"
            :class="unreadOnly ? '' : 'text--secondary'"
            :outlined="unreadOnly"
            @click="unreadOnly = true"
            >Unread Only
            {{ unreadOnly ? `(${notifications.length})` : '' }}</v-btn
          >
          <v-btn
            aria-label="All Notifications"
            :ripple="false"
            text
            small
            class="mr-1"
            :class="!unreadOnly ? '' : 'text--secondary'"
            :outlined="!unreadOnly"
            @click="unreadOnly = false"
            >All {{ !unreadOnly ? `(${notifications.length})` : '' }}</v-btn
          >

          <v-divider vertical />

          <v-btn aria-label="Mark all as read" text small @click="markAllAsRead"
            >Mark all as read</v-btn
          >
        </v-row>
        <div v-if="notifications.length === 0" class="title">
          No {{ unreadOnly ? 'submit ' : '' }}notifications
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import notificationsGql from '../../gql/notifications.graphql'
import markAllNotificationsReadGql from '../../gql/markAllNotificationsRead.graphql'

export default {
  data() {
    return {
      notifications: [],
      unreadOnly: true
    }
  },
  methods: {
    async markAllAsRead() {
      await this.$apollo.mutate({
        mutation: markAllNotificationsReadGql,
        refetchQueries: [
          {
            query: notificationsGql,
            variables: { unreadOnly: this.unreadOnly }
          }
        ],
        awaitRefetchQueries: true
      })
    }
  },
  apollo: {
    notifications: {
      query: notificationsGql,
      variables() {
        return {
          unreadOnly: this.unreadOnly
        }
      },
      skip() {
        return !this.$store.state.currentUser
      },
      fetchPolicy: 'cache-and-network'
    }
  },
  head() {
    return {
      title: `${this.notifications.length} Notifications`
    }
  }
}
</script>

<style scoped></style>
