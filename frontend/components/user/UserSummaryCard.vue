<template>
  <v-card
    :flat="$vuetify.theme.dark"
    :outlined="!$vuetify.theme.dark && !showViewProfileBtn"
    :width="isHover ? 400 : undefined"
    :style="{
      'border-width': '1px',
      'border-bottom-right-radius': showViewProfileBtn ? '0' : '10px',
      'border-bottom-left-radius': showViewProfileBtn ? '0' : '10px'
    }"
    :tile="tile"
  >
    <v-list-item class="py-4">
      <v-list-item-avatar
        class="my-0"
        tile
        size="64"
        style="align-self: start;"
      >
        <div
          :style="`height: 16px; width: 16px; border-radius: 50%; position: absolute; bottom: 0; right: 0; z-index: 2; background-color: ${
            lastOnlineString === 'Online' && !user.appearOffline
              ? '#66BB6A'
              : '#9E9E9E'
          }`"
        />
        <img
          v-if="user.profilePicUrl"
          loading="lazy"
          style="border-radius: 50%; object-fit: cover;"
          alt="Profile picture"
          :src="user.profilePicUrl"
        />
        <v-icon v-else>{{ $vuetify.icons.values.mdiAccountOutline }}</v-icon>
      </v-list-item-avatar>

      <v-list-item-content class="py-0">
        <v-list-item-title style="font-size: 1.43rem;" class="my-0">
          <v-row no-gutters>
            <nuxt-link :to="`/u/${user.username}`" class="text--primary">{{
              user.username
            }}</nuxt-link>
            <v-chip
              v-if="user.tag"
              dark
              small
              label
              :color="user.tagColor"
              class="ml-2"
              style="border-radius: 12px !important;"
              >{{ user.tag }}</v-chip
            >

            <v-spacer />

            <template
              v-if="
                showButtons && $store.state.currentUser && !user.isCurrentUser
              "
            >
              <v-tooltip bottom transition="fade-transition">
                <template v-slot:activator="{ on }">
                  <v-btn
                    class="mr-2"
                    :color="user.isBlocking ? 'primary' : ''"
                    small
                    icon
                    :disabled="user.isFollowing"
                    v-on="on"
                    @click="toggleBlock"
                  >
                    <v-icon>{{
                      $vuetify.icons.values.mdiAccountCancelOutline
                    }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ user.isBlocking ? 'Unblock' : 'Block' }}</span>
              </v-tooltip>

              <!--FOLLOW - Disabled for now-->
              <!--<v-tooltip bottom transition="fade-transition">
                <template v-slot:activator="{ on }">
                  <v-btn
                    :color="user.isFollowing ? 'primary' : ''"
                    small
                    icon
                    :disabled="user.isBlocking"
                    v-on="on"
                    @click="toggleFollow"
                  >
                    <v-icon>{{
                      user.isFollowing
                        ? $vuetify.icons.values.mdiAccountCheckOutline
                        : $vuetify.icons.values.mdiAccountPlusOutline
                    }}</v-icon>
                  </v-btn>
                </template>
                <span>{{ user.isFollowing ? 'Unfollow' : 'Follow' }}</span>
              </v-tooltip>-->
            </template>
          </v-row>
        </v-list-item-title>
        <v-list-item-subtitle
          v-if="user.bio"
          class="mt-1 mb-0"
          style="white-space: normal; font-size: 1rem;"
          >{{ user.bio }}</v-list-item-subtitle
        >

        <v-row align="center" justify="start" no-gutters class="pt-2">
          <v-chip
            small
            outlined
            :title="`${user.endorsementCount} Rocket${
              user.endorsementCount === 1 ? '' : 's'
            }`"
          >
            <v-icon small left>{{ $vuetify.icons.values.mdiRocket }}</v-icon>
            {{ user.endorsementCount }}
          </v-chip>

          <v-chip
            small
            outlined
            class="ml-2"
            :title="`${user.commentCount} Comment${
              user.commentCount === 1 ? '' : 's'
            }`"
          >
            <v-icon small left>{{
              $vuetify.icons.values.mdiCommentOutline
            }}</v-icon>
            {{ user.commentCount }}
          </v-chip>

          <v-chip
            small
            outlined
            class="ml-2"
            :title="`${user.postCount} Post${user.postCount === 1 ? '' : 's'}`"
          >
            <v-icon small left>{{ $vuetify.icons.values.mdiPost }}</v-icon>
            {{ user.postCount }}
          </v-chip>
        </v-row>
      </v-list-item-content>
    </v-list-item>

    <div v-if="showViewProfileBtn && $route.params.username !== user.username">
      <v-list-item nuxt :to="`/u/${user.username}`">
        <v-list-item-icon
          ><v-icon>{{
            $vuetify.icons.values.mdiOpenInNew
          }}</v-icon></v-list-item-icon
        >
        <v-list-item-content>
          <v-list-item-title>View profile</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
import { formatDistanceToNowStrict } from 'date-fns'
import blockUserGql from '../../gql/blockUser.graphql'
import unblockUserGql from '../../gql/unblockUser.graphql'
import followUserGql from '../../gql/followUser.graphql'
import unfollowUserGql from '../../gql/unfollowUser.graphql'

export default {
  name: 'UserSummaryCard',
  props: {
    user: {
      type: Object,
      default: null
    },
    isHover: {
      type: Boolean,
      default: false
    },
    showButtons: {
      type: Boolean,
      default: true
    },
    showViewProfileBtn: {
      type: Boolean,
      default: false
    },
    tile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    lastOnlineString() {
      if (!this.user) return ''
      if (this.user.username === 'Comet') return 'Online'
      const lastLogin = new Date(this.user.lastLogin)
      const now = new Date()
      if (now - lastLogin < 15 * 60 * 1000) {
        return 'Online'
      } else {
        return 'Last online ' + formatDistanceToNowStrict(lastLogin) + ' ago'
      }
    }
  },
  methods: {
    toggleBlock() {
      this.$emit('toggleblock')
      if (this.user.isBlocking) this.unblockUser()
      else this.blockUser()
    },
    blockUser() {
      this.$store.dispatch('displaySnackbar', {
        message: `Blocked ${this.user.username}`
      })
      this.user.isBlocking = true
      this.$forceUpdate()
      this.$apollo.mutate({
        mutation: blockUserGql,
        variables: {
          blockedUsername: this.user.username
        }
      })
    },
    unblockUser() {
      this.$store.dispatch('displaySnackbar', {
        message: `Unblocked ${this.user.username}`
      })
      this.user.isBlocking = false
      this.$forceUpdate()
      this.$apollo.mutate({
        mutation: unblockUserGql,
        variables: {
          blockedId: this.user.id
        }
      })
    },
    toggleFollow() {
      if (this.user.isFollowing) this.unfollowUser()
      else this.followUser()
    },
    followUser() {
      this.user.isFollowing = true
      this.$forceUpdate()
      this.$apollo.mutate({
        mutation: followUserGql,
        variables: {
          followedId: this.user.id
        }
      })
    },
    unfollowUser() {
      this.user.isFollowing = false
      this.$forceUpdate()
      this.$apollo.mutate({
        mutation: unfollowUserGql,
        variables: {
          followedId: this.user.id
        }
      })
    }
  }
}
</script>

<style scoped></style>
