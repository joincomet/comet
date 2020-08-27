<template>
  <v-app-bar
    clipped-left
    app
    flat
    class="topappbar"
    dense
    :style="{
      'z-index': $device.isDesktop ? '300' : '40',
      'border-bottom': $vuetify.theme.dark
        ? '1px solid rgba(255, 255, 255, .12)'
        : '1px solid rgba(0, 0, 0, .12)'
    }"
  >
    <v-app-bar-nav-icon
      v-show="$device.isDesktop"
      class="text--secondary"
      @click="$store.commit('setNav', !$store.state.nav)"
    />
    <v-row class="ma-0" align="center" no-gutters>
      <CometLogo />

      <v-spacer />

      <template v-if="$device.isDesktop">
        <v-text-field
          v-model="searchText"
          hide-details
          flat
          class="mr-6"
          style="max-width: 25%; height: 34px;"
          solo
          label="Search"
          @keydown.enter="doSearch"
          @click:append="doSearch"
        >
          <template v-slot:append>
            <v-icon
              size="20"
              class="text--secondary"
              style="cursor: pointer;"
              @click="doSearch"
              >{{ $vuetify.icons.values.mdiMagnify }}</v-icon
            >
          </template>
        </v-text-field>

        <div class="mr-1">
          <NewPostButton />
        </div>

        <div class="mr-1">
          <NotificationsMenu style="z-index: 600;" />
        </div>
      </template>

      <ProfileMenu />

      <template v-if="$device.isDesktop">
        <client-only>
          <v-menu
            offset-y
            transition="slide-y-transition"
            style="z-index: 600;"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                class="ml-1"
                icon
                :color="$vuetify.theme.dark ? '' : '#7289da'"
                aria-label="Discord"
                v-on="on"
              >
                <v-icon>{{ $vuetify.icons.values.mdiDiscord }}</v-icon>
              </v-btn>
            </template>

            <iframe
              title="Discord widget"
              :src="`https://discordapp.com/widget?id=653652395959648314${
                $vuetify.theme.dark ? '&theme=dark' : '&theme=light'
              }`"
              class="frame"
              height="500"
              allowtransparency="true"
              frameborder="0"
            />
          </v-menu>
        </client-only>

        <v-btn class="ml-1" icon title="Toggle Dark Mode" @click="toggleDark">
          <v-icon :color="$vuetify.theme.dark ? 'primary' : ''">{{
            $vuetify.icons.values.mdiWeatherNight
          }}</v-icon>
        </v-btn>

        <FeedbackDialog />
      </template>
    </v-row>
  </v-app-bar>
</template>

<script>
import NotificationsMenu from '@/components/notifications/NotificationsMenu'
import FeedbackDialog from '@/components/FeedbackDialog'
import ProfileMenu from '../buttons/profile/ProfileMenu'
import NewPostButton from '../buttons/new_post/NewPostButton'
import CometLogo from '../buttons/CometLogo'

export default {
  name: 'AppBar',
  components: {
    FeedbackDialog,
    NotificationsMenu,
    CometLogo,
    NewPostButton,
    ProfileMenu
  },
  data() {
    return {
      notifications: [],
      searchText:
        this.$route.name.startsWith('search') && this.$route.query.q
          ? this.$route.query.q
          : ''
    }
  },
  methods: {
    toggleDark() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark', this.$vuetify.theme.dark.toString())
    },
    scrollToTop() {
      window.scrollTo(0, 0)
    },
    doSearch() {
      if (!this.searchText) return
      const query = {}
      if (this.searchText) query.q = this.searchText
      this.$router.push({ path: '/search', query })
    },
    openPlanetPrompt() {
      if (this.$device.isDesktop) {
        this.$store.commit('setNav', !this.$store.state.nav)
        return
      }
      const planet = window.prompt('Go to Planet')
      if (!planet) return
      this.$router.push(`/p/${planet}`)
    }
  }
}
</script>

<style scoped>
>>> .v-input__control {
  min-height: 34px !important;
  height: 34px !important;
}

>>> .v-label {
  font-size: 1rem;
}
</style>
