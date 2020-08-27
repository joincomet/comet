<template>
  <v-list class="py-0">
    <template v-if="$store.state.currentUser">
      <v-list-item
        :to="`/u/${$store.state.currentUser.username}`"
        nuxt
        @click="$emit('selected')"
      >
        <v-list-item-avatar>
          <v-icon v-if="!$store.state.currentUser.profilePicUrl">{{
            $vuetify.icons.values.mdiAccountOutline
          }}</v-icon>
          <img
            v-else
            loading="lazy"
            alt="Profile picture"
            :src="$store.state.currentUser.profilePicUrl"
            style="object-fit: cover;"
          />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{
            $store.state.currentUser.username
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item nuxt to="/settings/account" @click="$emit('selected')">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiCogOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-else>
      <v-list-item nuxt to="/signup">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiAccountOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Sign Up</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item nuxt to="/login">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiLogin }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Log In</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list-item @click="toggleDark">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiWeatherNight }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Dark Mode</v-list-item-title>
      </v-list-item-content>
      <v-list-item-action>
        <v-switch v-model="$vuetify.theme.dark" readonly />
      </v-list-item-action>
    </v-list-item>

    <v-list-item v-if="$store.state.currentUser" @click="logout">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiLogout }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Log out</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import currentUserGql from '../../../gql/currentUser.graphql'

export default {
  name: 'ProfileMenuContent',
  methods: {
    toggleDark() {
      this.$emit('selected')
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark
      localStorage.setItem('dark', this.$vuetify.theme.dark.toString())
    },
    async logout() {
      this.$emit('selected')
      this.$store.dispatch('displaySnackbar', { message: 'Logged out' })
      await this.$apollo.provider.defaultClient.cache.writeQuery({
        query: currentUserGql,
        data: { currentUser: null }
      })
      await this.$apolloHelpers.onLogout()
      this.$store.commit('setCurrentUser', null)
      await this.$router.push('/')
    }
  }
}
</script>

<style scoped></style>
