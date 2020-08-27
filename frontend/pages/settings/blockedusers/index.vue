<template>
  <v-row>
    <v-col :cols="$device.isDesktop ? 6 : 12">
      <v-text-field
        v-model="blockingUsername"
        solo
        flat
        label="Block a user"
        :append-icon="$vuetify.icons.values.mdiAccountCancelOutline"
        @keydown.enter="blockUser"
        @click:append="blockUser"
      />
      <v-list v-show="blockedUsers.length > 0">
        <v-list-item v-for="user in blockedUsers" :key="user.id">
          <v-list-item-content>
            <v-list-item-title>{{ user.username }}</v-list-item-title>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn text @click="unblock(user)">Unblock</v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import blockedUsersGql from '@/gql/blockedUsers.graphql'

export default {
  middleware: 'authenticated',
  data() {
    return {
      blockedUsers: [],
      blockingUsername: ''
    }
  },
  apollo: {
    blockedUsers: {
      query: blockedUsersGql,
      fetchPolicy: 'cache-and-network'
    }
  },
  methods: {
    async blockUser() {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation($blockedUsername: String!) {
              blockUser(blockedUsername: $blockedUsername)
            }
          `,
          variables: {
            blockedUsername: this.blockingUsername
          },
          refetchQueries: [{ query: blockedUsersGql }]
        })
        this.blockingUsername = ''
      } catch (e) {
        this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
    },
    unblock(user) {
      this.$apollo.mutate({
        mutation: gql`
          mutation($blockedId: ID!) {
            unblockUser(blockedId: $blockedId)
          }
        `,
        variables: {
          blockedId: user.id
        },
        refetchQueries: [{ query: blockedUsersGql }]
      })
    }
  }
}
</script>

<style scoped></style>
