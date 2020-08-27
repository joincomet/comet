<template>
  <v-menu
    v-if="$device.isDesktop"
    v-model="menu"
    offset-y
    open-on-hover
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <Username :user="userData" :op="op" />
      </span>
    </template>

    <UserSummaryCard
      v-if="user"
      is-hover
      :user="user"
      @toggleblock="$emit('toggleblock')"
    />
    <v-card v-else width="400">
      <div class="pa-4">
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </div>
    </v-card>
  </v-menu>

  <v-bottom-sheet v-else v-model="menu">
    <template v-slot:activator="{ on }">
      <span v-on="on">
        <Username :user="userData" :op="op" />
      </span>
    </template>

    <UserSummaryCard
      v-if="user"
      show-view-profile-btn
      :user="user"
      style="padding-bottom: 24px;"
      @toggleblock="toggleBlock"
    />
    <v-card v-else>
      <div class="pa-4">
        <v-row align="center" justify="center">
          <v-progress-circular indeterminate />
        </v-row>
      </div>
    </v-card>
  </v-bottom-sheet>
</template>

<script>
import userGql from '../../gql/user.graphql'
import UserSummaryCard from './UserSummaryCard'
import Username from './Username'

export default {
  name: 'UsernameMenu',
  components: { Username, UserSummaryCard },
  props: {
    userData: {
      type: Object,
      required: true
    },
    op: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: null,
      menu: false
    }
  },
  methods: {
    toggleBlock() {
      this.menu = false
      this.$emit('toggleblock')
    }
  },
  apollo: {
    user: {
      query: userGql,
      variables() {
        return {
          username: this.userData.username
        }
      },
      skip() {
        return !this.menu
      }
    }
  }
}
</script>

<style scoped></style>
