<template>
  <v-list>
    <v-list-item v-if="canShare" @click="share">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiShareOutline }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Share</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="copyLink">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiContentCopy }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Copy Link</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <template
      v-if="
        $store.state.currentUser && post.author && !post.author.isCurrentUser
      "
    >
      <v-list-item @click="toggleHide">
        <v-list-item-icon>
          <v-icon>{{
            post.isHidden
              ? $vuetify.icons.values.mdiEye
              : $vuetify.icons.values.mdiEyeOff
          }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            post.isHidden ? 'Unhide' : 'Hide'
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item :disabled="reported" @click="reportPost">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiAlertOctagonOutline }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{
            reported ? 'Reported' : 'Report'
          }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <v-list-item
      v-if="
        post.type === 'TEXT' &&
        $store.state.currentUser &&
        post.author &&
        post.author.isCurrentUser
      "
      @click="editPost"
    >
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiPencil }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      v-if="
        $store.state.currentUser && post.author && post.author.isCurrentUser
      "
      @click="deletePost"
    >
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiTrashCan }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          >Delete{{
            $store.state.currentUser.admin && !post.author.isCurrentUser
              ? ' (Admin)'
              : ''
          }}</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-list-item v-if="isMod || isAdmin" @click="togglePin">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiPin }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title style="font-weight: 500;"
          >{{ post.sticky ? 'Unpin' : 'Pin' }} Post (Mod)</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <template v-if="isMod && !post.author.isCurrentUser">
      <v-list-item @click="removePost">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Remove Post (Mod)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="banUserFromPlanet">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Ban {{ post.author.username }} from p/{{
              post.planet.name
            }}
            (Mod)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </template>

    <template v-if="isAdmin && !post.author.isCurrentUser">
      <v-list-item @click="removePost">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Remove Post (Admin)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="globalBan">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Ban from Comet (Admin)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="globalBanAndPurge">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Ban from Comet & purge posts (Admin)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
import gql from 'graphql-tag'
import hiddenPostsGql from '@/gql/hiddenPosts.graphql'
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import hidePostGql from '../../gql/hidePost.graphql'
import unhidePostGql from '../../gql/unhidePost.graphql'
import reportPostGql from '../../gql/reportPost.graphql'
import deletePostGql from '../../gql/deletePost.graphql'
import { urlName } from '~/util/urlName'

if (process.client) {
  Vue.use(VueClipboard)
}

export default {
  name: 'PostOptionsContent',
  props: {
    post: {
      type: Object,
      required: true
    },
    reported: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    canShare() {
      if (!process.client) return false
      return !!navigator.share
    },
    urlName() {
      return urlName(this.post.title)
    },
    isMod() {
      return (
        this.$store.state.currentUser &&
        !!this.$store.state.currentUser.moderatedPlanets.find(
          (p) => p.name === this.post.planet.name
        )
      )
    },
    isAdmin() {
      return (
        this.$store.state.currentUser && this.$store.state.currentUser.admin
      )
    }
  },
  methods: {
    share() {
      this.$emit('selected')
      navigator.share({
        title: `"${this.post.title}" on Comet`,
        url: `https://www.getcomet.net/p/${this.post.planet.name}/comments/${this.post.id}/${this.urlName}`
      })
    },
    copyLink() {
      this.$emit('selected')
      if (process.client) {
        this.$copyText(
          `https://www.getcomet.net/p/${this.post.planet.name}/comments/${this.post.id}/${this.urlName}`
        )
      }
      this.$store.dispatch('displaySnackbar', {
        message: 'Copied link to clipboard',
        success: true
      })
    },
    async toggleHide() {
      if (this.post.isHidden) await this.unhidePost()
      else await this.hidePost()
    },
    async hidePost() {
      this.$store.dispatch('displaySnackbar', {
        message: `Hid "${this.post.title.substring(0, 50)}${
          this.post.title.length > 50 ? '...' : ''
        }"`
      })
      this.$emit('selected')
      this.post.isHidden = true
      await this.$apollo.mutate({
        mutation: hidePostGql,
        variables: {
          postId: this.post.id
        }
      })
    },
    async unhidePost() {
      this.$store.dispatch('displaySnackbar', {
        message: `Unhid "${this.post.title.substring(0, 50)}${
          this.post.title.length > 50 ? '...' : ''
        }"`
      })
      this.$emit('selected')
      this.post.isHidden = false
      await this.$apollo.mutate({
        mutation: unhidePostGql,
        variables: {
          postId: this.post.id
        },
        refetchQueries:
          this.$route.name === 'settings-hiddenposts'
            ? [{ query: hiddenPostsGql }]
            : []
      })
    },
    async togglePin() {
      if (this.post.sticky) await this.unpinPost()
      else await this.pinPost()
    },
    async pinPost() {
      this.$store.dispatch('displaySnackbar', {
        message: `Pinned "${this.post.title.substring(0, 50)}${
          this.post.title.length > 50 ? '...' : ''
        }"`
      })
      this.$emit('selected')
      this.post.sticky = true
      await this.$apollo.mutate({
        mutation: gql`
          mutation($postId: ID!, $planetName: ID!) {
            pinPost(postId: $postId, planetName: $planetName)
          }
        `,
        variables: {
          postId: this.post.id,
          planetName: this.post.planet.name
        }
      })
    },
    async unpinPost() {
      this.$store.dispatch('displaySnackbar', {
        message: `Unpinned "${this.post.title.substring(0, 50)}${
          this.post.title.length > 50 ? '...' : ''
        }"`
      })
      this.$emit('selected')
      this.post.sticky = false
      await this.$apollo.mutate({
        mutation: gql`
          mutation($postId: ID!, $planetName: ID!) {
            unpinPost(postId: $postId, planetName: $planetName)
          }
        `,
        variables: {
          postId: this.post.id,
          planetName: this.post.planet.name
        }
      })
    },
    async reportPost() {
      this.$emit('selected')
      const confirmed = window.confirm(
        "Report this post for violating Comet's content policy?"
      )
      if (!confirmed) return
      this.$emit('reported')
      await this.$apollo.mutate({
        mutation: reportPostGql,
        variables: {
          postId: this.post.id
        }
      })
    },
    editPost() {
      this.$emit('selected')
      this.$emit('edit')
    },
    async deletePost() {
      this.$emit('selected')
      const confirmed = window.confirm(
        'Are you sure you want to delete this post?'
      )
      if (!confirmed) return
      this.$emit('deleted')
      await this.$apollo.mutate({
        mutation: deletePostGql,
        variables: {
          postId: this.post.id
        }
      })
      this.post.author = null
      if (this.post.type === 'TEXT')
        this.post.textContent = '<post>[deleted]</post>'
    },
    async removePost() {
      const reason = window.prompt('Reason for removal?')
      if (!reason) return
      await this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!, $postId: ID!, $removedReason: String!) {
            removePost(
              planetName: $planetName
              postId: $postId
              removedReason: $removedReason
            )
          }
        `,
        variables: {
          planetName: this.post.planet.name,
          postId: this.post.id,
          removedReason: reason
        }
      })
      this.$store.dispatch('displaySnackbar', {
        message: 'Post removed, will vanish upon refresh.'
      })
    },
    async banUserFromPlanet() {
      const reason = window.prompt('Reason for ban?')
      if (!reason) return
      await this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!, $bannedUserId: ID!) {
            banUserFromPlanet(
              planetName: $planetName
              bannedUserId: $bannedUserId
            )
          }
        `,
        variables: {
          planetName: this.post.planet.name,
          bannedUserId: this.post.author.id
        }
      })
      this.$store.dispatch('displaySnackbar', {
        message: `Banned ${this.post.author.username} from p/${this.post.planet.name}!`
      })
    },
    async globalBan() {
      const reason = window.prompt('Reason for ban?')
      if (!reason) return
      const confirm = window.confirm(
        'Are you sure you want to ban ' +
          this.post.author.username +
          ' from Comet?'
      )
      if (!confirm) return
      await this.$apollo.mutate({
        mutation: gql`
          mutation($banReason: String!, $bannedId: ID!) {
            banUser(banReason: $banReason, bannedId: $bannedId)
          }
        `,
        variables: {
          banReason: reason,
          bannedId: this.post.author.id
        }
      })
      this.$store.dispatch('displaySnackbar', {
        message: `Banned ${this.post.author.username} from Comet!`
      })
    },
    async globalBanAndPurge() {
      const reason = window.prompt('Reason for ban & purge?')
      if (!reason) return
      const confirm1 = window.confirm(
        'Are you sure you want to ban ' +
          this.post.author.username +
          ' from Comet and purge all their posts?'
      )
      if (!confirm1) return
      const confirm2 = window.confirm(
        'About to ban & purge ' +
          this.post.author.username +
          '. Please confirm again.'
      )
      if (!confirm2) return
      await this.$apollo.mutate({
        mutation: gql`
          mutation($banReason: String!, $bannedId: ID!) {
            banAndPurgeUser(banReason: $banReason, bannedId: $bannedId)
          }
        `,
        variables: {
          banReason: reason,
          bannedId: this.post.author.id
        }
      })
      this.$store.dispatch('displaySnackbar', {
        message: `Banned ${this.post.author.username} from Comet and purged their posts!`
      })
    }
  }
}
</script>

<style scoped></style>
