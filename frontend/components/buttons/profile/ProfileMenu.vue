<template>
  <v-bottom-sheet v-if="!$device.isDesktop" v-model="menu">
    <template v-slot:activator="{ on }">
      <v-btn
        style="font-weight: 400;"
        aria-label="Account"
        :text="$device.isDesktop"
        :icon="!$device.isDesktop"
        rounded
        :height="$device.isDesktop ? 34 : ''"
        v-on="on"
      >
        <v-avatar
          v-if="
            $store.state.currentUser && $store.state.currentUser.profilePicUrl
          "
          size="36"
        >
          <img
            loading="lazy"
            alt="Profile picture"
            :src="$store.state.currentUser.profilePicUrl"
          />
        </v-avatar>

        <v-icon v-else>{{ $vuetify.icons.values.mdiAccountOutline }}</v-icon>

        <span v-if="$device.isDesktop" class="ml-2">
          {{
            $store.state.currentUser
              ? $store.state.currentUser.username
              : 'Logged Out'
          }}
        </span>
      </v-btn>
    </template>

    <ProfileMenuContent @selected="menu = false" />
  </v-bottom-sheet>

  <v-menu
    v-else
    v-model="menu"
    bottom
    offset-y
    transition="slide-y-transition"
    style="z-index: 600;"
  >
    <template v-slot:activator="{ on }">
      <v-btn
        style="font-weight: 400;"
        aria-label="Account"
        text
        rounded
        height="34"
        v-on="on"
      >
        <v-avatar
          v-if="
            $store.state.currentUser && $store.state.currentUser.profilePicUrl
          "
          size="24"
          class="mr-2"
        >
          <img
            alt="Profile picture"
            :src="$store.state.currentUser.profilePicUrl"
            loading="lazy"
            style="object-fit: cover;"
          />
        </v-avatar>

        <v-icon v-else class="mr-2">{{
          $vuetify.icons.values.mdiAccountOutline
        }}</v-icon>

        {{
          $store.state.currentUser
            ? $store.state.currentUser.username
            : 'Logged Out'
        }}
      </v-btn>
    </template>

    <ProfileMenuContent />
  </v-menu>
</template>

<script>
import ProfileMenuContent from './ProfileMenuContent'

export default {
  name: 'ProfileMenu',
  components: { ProfileMenuContent },
  data() {
    return {
      menu: false
    }
  }
}
</script>

<style scoped></style>
