<template>
  <v-menu
    v-if="$store.state.currentUser"
    v-model="notifsMenu"
    offset-y
    bottom
    transition="slide-y-transition"
    :close-on-content-click="false"
    max-height="80%"
    style="z-index: 600;"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-badge
          v-if="notifications.length > 0"
          overlap
          :content="notifications.length"
        >
          <v-icon>{{ $vuetify.icons.values.mdiBellOutline }}</v-icon>
        </v-badge>
        <v-icon v-else>{{ $vuetify.icons.values.mdiBellOutline }}</v-icon>
      </v-btn>
    </template>

    <v-card width="600" style="z-index: 602;">
      <v-toolbar
        dense
        :style="`
          position: sticky; top: 0; z-index: 100; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: ${
            $vuetify.theme.dark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(0, 0, 0, 0.12)'
          }`"
        flat
        :color="$vuetify.theme.dark ? '#35363A' : '#F1F3F4'"
      >
        <v-toolbar-title
          >{{ notifications.length }} Unread Notifications</v-toolbar-title
        >
        <v-spacer />
        <v-toolbar-items>
          <v-btn text @click="markAllAsRead">Dismiss all</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <div v-if="notifications.length > 0" class="pb-0 pt-3 px-3">
        <Notification
          v-for="notif in notifications"
          :key="notif.id"
          :unread-only="unreadOnly"
          :notif="notif"
          @closed="notifsMenu = false"
        />
      </div>

      <v-row
        v-else
        no-gutters
        justify="center"
        align="center"
        class="pb-3 pt-3 px-3"
      >
        <span class="text-h6">No new notifications</span>
      </v-row>
    </v-card>
  </v-menu>
</template>

<script>
import notificationsGql from '@/gql/notifications'
import Notification from '@/components/notifications/Notification'
import markAllNotificationsReadGql from '@/gql/markAllNotificationsRead'

export default {
  name: 'NotificationsMenu',
  components: { Notification },
  data() {
    return {
      notifications: [],
      unreadOnly: true,
      notifsMenu: false
    }
  },
  watch: {
    '$route.path'() {
      this.notifsMenu = false
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
        ]
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
      }
    }
  }
}
</script>

<style scoped>
.v-menu__content::-webkit-scrollbar {
  width: 0 !important;
}

.v-menu__content {
  overflow: -moz-scrollbars-none !important;
  -ms-overflow-style: none !important;
  z-index: 602 !important;
}
</style>
