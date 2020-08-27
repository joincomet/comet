<template>
  <v-container>
    <v-row>
      <v-col>
        <v-tabs :grow="!$device.isDesktop" background-color="transparent">
          <v-tab
            nuxt
            to="/settings/account"
            style="
              letter-spacing: normal;
              text-transform: none;
              font-size: 1rem;
            "
            class="text--secondary"
          >
            <v-icon size="20" class="mr-2">{{
              $vuetify.icons.values.mdiCogOutline
            }}</v-icon>
            Account Settings
          </v-tab>
          <v-tab
            nuxt
            to="/settings/blockedusers"
            style="
              letter-spacing: normal;
              text-transform: none;
              font-size: 1rem;
            "
            class="text--secondary"
          >
            <v-icon size="20" class="mr-2">{{
              $vuetify.icons.values.mdiAccountCancelOutline
            }}</v-icon>
            Blocked Users ({{ blockedUsers.length }})
          </v-tab>
          <v-tab
            nuxt
            to="/settings/mutedplanets"
            style="
              letter-spacing: normal;
              text-transform: none;
              font-size: 1rem;
            "
            class="text--secondary"
          >
            <v-icon size="20" class="mr-2">{{
              $vuetify.icons.values.mdiEarthOff
            }}</v-icon>
            Muted Planets ({{ mutedPlanets.length }})
          </v-tab>
          <v-tab
            nuxt
            to="/settings/hiddenposts"
            style="
              letter-spacing: normal;
              text-transform: none;
              font-size: 1rem;
            "
            class="text--secondary"
          >
            <v-icon size="20" class="mr-2">{{
              $vuetify.icons.values.mdiPost
            }}</v-icon>
            Hidden Posts ({{ hiddenPosts.length }})
          </v-tab>
        </v-tabs>
        <nuxt-child />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import mutedPlanetsGql from '@/gql/mutedPlanets'
import blockedUsersGql from '@/gql/blockedUsers'
import hiddenPostsGql from '@/gql/hiddenPosts'

export default {
  middleware: 'authenticated',
  data() {
    return {
      blockedUsers: [],
      mutedPlanets: [],
      hiddenPosts: []
    }
  },
  apollo: {
    blockedUsers: {
      query: blockedUsersGql,
      fetchPolicy: 'cache-and-network'
    },
    mutedPlanets: {
      query: mutedPlanetsGql,
      fetchPolicy: 'cache-and-network'
    },
    hiddenPosts: {
      query: hiddenPostsGql,
      fetchPolicy: 'cache-and-network'
    }
  },
  head: {
    title: 'Settings'
  }
}
</script>

<style scoped></style>
