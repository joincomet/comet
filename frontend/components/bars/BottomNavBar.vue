<template>
  <v-app-bar
    app
    bottom
    class="bottomappbar"
    :height="$device.isIos ? 80 : 56"
    :color="$vuetify.theme.dark ? '#35363A' : '#F1F3F4'"
  >
    <v-bottom-navigation
      grow
      :style="$device.isIos ? 'margin-bottom: 24px' : ''"
      class="elevation-0"
    >
      <v-btn
        aria-label="Home"
        class="navbtn"
        @click.stop.prevent="clickHomeButton"
      >
        <span class="primary--text">Posts</span>
        <v-icon color="primary">{{ $vuetify.icons.values.mdiHome }}</v-icon>
      </v-btn>

      <v-btn aria-label="Search" class="navbtn" @click="showSearchPrompt">
        <span class="text--secondary">Search</span>
        <v-icon class="text--secondary">{{
          $vuetify.icons.values.mdiMagnify
        }}</v-icon>
      </v-btn>

      <v-bottom-sheet v-model="middleBtnBottomSheet">
        <template v-slot:activator="{ on }">
          <v-btn class="navbtn" v-on="on">
            <span class="text--secondary">Create</span>
            <v-icon class="text--secondary">{{
              $vuetify.icons.values.mdiPlusBoxOutline
            }}</v-icon>
          </v-btn>
        </template>

        <v-card style="padding-bottom: 24px; padding-top: 12px;">
          <v-row justify="center" class="px-6">
            <v-col align="center" cols="6">
              <nuxt-link
                :to="$store.state.currentUser ? '/planets/create' : '/'"
              >
                <v-avatar
                  :style="{
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': $vuetify.theme.dark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)'
                  }"
                >
                  <v-icon size="24">{{
                    $vuetify.icons.values.mdiEarthPlus
                  }}</v-icon>
                </v-avatar>
              </nuxt-link>
              <div class="pt-2">Create Planet</div>
            </v-col>
            <v-col align="center" cols="6">
              <nuxt-link
                :to="
                  $store.state.currentUser
                    ? `/submit/text${
                        $route.params.planetname
                          ? `?planet=${$route.params.planetname}`
                          : ''
                      }`
                    : '/signup'
                "
              >
                <v-avatar
                  :style="{
                    'border-width': '1px',
                    'border-style': 'solid',
                    'border-color': $vuetify.theme.dark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)'
                  }"
                >
                  <v-icon size="24">{{
                    $vuetify.icons.values.mdiPencilOutline
                  }}</v-icon>
                </v-avatar>
              </nuxt-link>
              <div class="pt-2">Create Post</div>
            </v-col>
          </v-row>
        </v-card>
      </v-bottom-sheet>

      <v-bottom-sheet v-model="planetsBottomSheet" scrollable>
        <template v-slot:activator="{ on }">
          <v-btn aria-label="Planets" class="navbtn" v-on="on">
            <span class="text--secondary">Planets</span>
            <v-icon class="text--secondary">{{
              $vuetify.icons.values.mdiEarth
            }}</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-card-text class="px-0 pt-2" style="padding-bottom: 24px;">
            <NavDrawerContents @selected="planetsBottomSheet = false" />
          </v-card-text>
        </v-card>
      </v-bottom-sheet>

      <v-bottom-sheet v-model="notifsBottomSheet" scrollable>
        <template v-slot:activator="{ on }">
          <v-btn aria-label="Notifications" class="navbtn" v-on="on">
            <span class="text--secondary">Notifications</span>
            <v-badge
              v-if="notifications.length > 0"
              overlap
              :content="notifications.length"
            >
              <v-icon class="text--secondary">{{
                $vuetify.icons.values.mdiBellOutline
              }}</v-icon>
            </v-badge>
            <v-icon v-else class="text--secondary">{{
              $vuetify.icons.values.mdiBellOutline
            }}</v-icon>
          </v-btn>
        </template>

        <v-card>
          <v-toolbar
            dense
            :style="`position: sticky; top: 0; z-index: 100; border-bottom-width: 1px; border-bottom-style: solid; border-bottom-color: ${
              $vuetify.theme.dark
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.12)'
            }`"
            flat
            :color="$vuetify.theme.dark ? '#35363A' : '#F1F3F4'"
          >
            <v-toolbar-title>{{ notifications.length }} Unread</v-toolbar-title>
            <v-spacer />
            <v-toolbar-items>
              <v-btn text @click="markAllAsRead">Dismiss all</v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <v-card-text v-if="notifications.length > 0" class="px-3 pt-3 pb-6">
            <Notification
              v-for="notif in notifications"
              :key="notif.id"
              :notif="notif"
              unread-only
              @click="notifsBottomSheet = false"
            />
          </v-card-text>

          <v-card-text v-else class="px-3 pt-3 pb-6">
            <div style="text-align: center; font-size: 1.143rem;">
              No new notifications
            </div>
          </v-card-text>
        </v-card>
      </v-bottom-sheet>
    </v-bottom-navigation>
  </v-app-bar>
</template>

<script>
import NavDrawerContents from '@/components/bars/NavDrawerContents'
import Notification from '@/components/notifications/Notification'
import markAllNotificationsReadGql from '@/gql/markAllNotificationsRead'
import notificationsGql from '../../gql/notifications.graphql'

export default {
  name: 'BottomNavBar',
  components: { Notification, NavDrawerContents },
  data() {
    return {
      notifications: [],
      newPostBottomSheet: false,
      planetsBottomSheet: false,
      isPWA: false,
      middleBtnBottomSheet: false,
      notifsBottomSheet: false
    }
  },
  watch: {
    '$route.path'() {
      this.newPostBottomSheet = false
      this.planetsBottomSheet = false
      this.middleBtnBottomSheet = false
      this.notifsBottomSheet = false
    }
  },
  beforeMount() {
    this.isPWA =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone ||
      document.referrer.includes('android-app://')
  },
  apollo: {
    notifications: {
      query: notificationsGql,
      variables() {
        return {
          unreadOnly: true
        }
      },
      skip() {
        return !this.$store.state.currentUser
      }
    }
  },
  methods: {
    async markAllAsRead() {
      await this.$apollo.mutate({
        mutation: markAllNotificationsReadGql,
        refetchQueries: [
          {
            query: notificationsGql,
            variables: { unreadOnly: true }
          }
        ]
      })
    },
    showSearchPrompt() {
      const search = window.prompt('Search')
      if (!search) return
      this.$router.push(`/search?q=${encodeURIComponent(search)}`)
    },
    clickHomeButton() {
      if (this.$route.name === 'home-sort-time') {
        window.scrollTo(0, 0)
      } else {
        this.$router.push({ path: '/' })
      }
    },
    toggleDark() {
      this.$emit('selected')
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark', this.$vuetify.theme.dark.toString())
    }
  }
}
</script>

<style scoped>
.bottomappbar >>> .v-toolbar__content {
  padding: 0;
  margin: 0;
}

.v-app-bar >>> .v-app-bar--fixed {
  top: initial !important;
  bottom: 0 !important;
}

.v-app-bar.v-app-bar--fixed {
  top: initial !important;
  bottom: 0 !important;
}

.v-app-bar--fixed {
  top: initial !important;
  bottom: 0 !important;
}

.v-app-bar {
  top: initial !important;
  bottom: 0 !important;
}

.navbtn {
  font-weight: 400;
  min-width: 0 !important;
  letter-spacing: normal;
}
</style>
