<template>
  <div>
    <div
      style="
        position: relative;
        height: 208px;
        background-size: cover;
        background-position: center;
        background-repeat: no-repeat;
      "
      :style="
        user.bannerImageUrl
          ? `background-image: url(${user.bannerImageUrl})`
          : 'background-image: url(/cometgrid76.png)'
      "
    >
      <div
        style="
          position: absolute;
          width: 100%;
          height: 100%;
          bottom: 0;
          left: 0;
          background-color: transparent;
        "
        :style="{
          'background-image': $vuetify.theme.dark
            ? 'linear-gradient(0deg,#202124,rgba(32,33,36,0.25))'
            : 'linear-gradient(0deg,#F1F3F4,rgba(241,243,244,0.25))'
        }"
      />
      <div style="position: absolute; bottom: 16px; width: 100%;">
        <v-container>
          <div style="display: flex; text-align: left;">
            <div
              style="
                border-radius: 50%;
                background-color: #202124;
                height: 100px;
                width: 100px;
              "
            >
              <v-avatar
                tile
                height="100"
                width="100"
                style="position: relative;"
                :class="user.isCurrentUser ? 'editprofileavatar' : ''"
                @click="openAvatarDialog"
              >
                <div
                  style="
                    height: 25px;
                    width: 25px;
                    border-radius: 50%;
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    z-index: 2;
                  "
                  :style="
                    lastOnlineString === 'Online' && !user.appearOffline
                      ? 'background-color: #66BB6A'
                      : 'background-color: #9E9E9E'
                  "
                />
                <v-icon
                  size="50"
                  style="position: absolute; z-index: 10;"
                  class="editprofileicon"
                  dark
                  >{{ $vuetify.icons.values.mdiPencil }}</v-icon
                >
                <img
                  v-if="user.profilePicUrl"
                  loading="lazy"
                  style="
                    border-radius: 50%;
                    background-color: #202124;
                    object-fit: cover;
                  "
                  :src="user.profilePicUrl"
                />
                <v-icon v-else>{{
                  $vuetify.icons.values.mdiAccountOutline
                }}</v-icon>
              </v-avatar>
            </div>

            <div class="pl-6">
              <div
                style="font-size: 2rem; font-weight: 500; line-height: 2rem;"
                class="pb-2"
              >
                <v-row no-gutters align="center">
                  {{ user.username }}
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
                </v-row>
              </div>
              <div>
                <span style="font-weight: 500;">{{
                  user.endorsementCount
                }}</span>
                Rocket{{ user.endorsementCount === 1 ? '' : 's' }}
                <span>
                  <span style="font-weight: 500;">&middot;</span>
                  Joined
                  <span style="font-weight: 500;">{{ joinedDate }}</span>
                  <span v-if="user.isCurrentUser" @click="openBannerInput">
                    <span style="font-weight: 500;">&middot;</span>
                    <span class="hoverable"
                      >Upload Banner (rec size: 1920x208)</span
                    >
                  </span>
                  <v-file-input
                    ref="bannerinput"
                    v-model="bannerFile"
                    type="file"
                    style="display: none;"
                  />
                </span>
              </div>
              <div
                class="pt-4 bio"
                :class="user.isCurrentUser ? 'editablebio' : ''"
                @click="openBioDialog"
              >
                {{ user.bio }}
                <v-icon v-if="user.isCurrentUser" size="16" class="ml-1">{{
                  $vuetify.icons.values.mdiPencil
                }}</v-icon>
              </div>
            </div>
          </div>
        </v-container>
      </div>
    </div>

    <v-container class="pt-0">
      <v-row justify="center">
        <v-col :class="$device.isDesktop ? 'pt-0' : 'pa-0'">
          <v-tabs v-model="tab" background-color="transparent" class="pb-3">
            <v-tab style="text-transform: none; letter-spacing: normal;">
              <v-icon class="mr-2" size="20">{{
                $vuetify.icons.values.mdiPost
              }}</v-icon>
              Posts
            </v-tab>
            <v-tab style="text-transform: none; letter-spacing: normal;">
              <v-icon class="mr-2" size="20">{{
                $vuetify.icons.values.mdiCommentMultipleOutline
              }}</v-icon>
              Comments
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="tab" style="background-color: transparent;">
            <v-tab-item>
              <PostsScroller
                v-model="dialog"
                :loading="$fetchState.pending"
                :items="feed"
                :selected-post="selectedPost"
                @togglehidden="toggleHidden"
                @toggleblock="toggleBlock"
                @infinite="showMore"
              />
            </v-tab-item>

            <v-tab-item>
              <UserCommentsScroller
                v-model="dialog"
                :items="userComments"
                :selected-post="selectedPost"
                :loading="$fetchState.pending"
              />
            </v-tab-item>
          </v-tabs-items>
        </v-col>
        <v-col v-if="$device.isDesktop" cols="3" class="pl-0 pt-0">
          <div class="sticky">
            <UserSummaryCard
              :user="user"
              allow-edit
              style="margin-top: 60px;"
            />
            <ModeratedPlanetsCard
              v-if="user.moderatedPlanets.length > 0"
              class="mt-3"
              :user="user"
            />
            <InfoLinks class="mt-3" />
          </div>
        </v-col>
      </v-row>
    </v-container>

    <v-dialog
      v-model="avatarDialog"
      :fullscreen="!$device.isDesktop"
      width="35%"
      persistent
    >
      <v-card class="pa-3">
        <AvatarEditor
          require-change
          button-text="Done"
          show-cancel
          :dialog-open="avatarDialog"
          @finished="finishAvatarDialog"
          @cancelled="avatarDialog = false"
        />
      </v-card>
    </v-dialog>

    <v-dialog
      v-model="bioDialog"
      :fullscreen="!$device.isDesktop"
      width="35%"
      persistent
    >
      <v-card>
        <div class="px-3 pt-3">
          <v-textarea
            v-model="editBio"
            label="Write something about yourself"
            solo
            flat
            class="darktextfield"
            :counter="160"
          />
        </div>
        <v-card-actions>
          <v-spacer />
          <v-btn text @click="cancelEditBio">Cancel</v-btn>
          <v-btn
            depressed
            color="primary"
            class="ml-2"
            :disabled="!editBio || editBio.length > 160"
            @click="finishEditBio"
            >Done</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { format, formatDistanceToNowStrict } from 'date-fns'
import gql from 'graphql-tag'
import postDialogMixin from '@/mixins/postDialogMixin'
import PostsScroller from '@/components/post/PostsScroller'
import userGql from '@/gql/user.graphql'
import userCommentsGql from '@/gql/userComments.graphql'
import setBioGql from '@/gql/setBio.graphql'
import UserSummaryCard from '@/components/user/UserSummaryCard'
import ModeratedPlanetsCard from '@/components/user/ModeratedPlanetsCard'
import UserCommentsScroller from '@/components/user/UserCommentsScroller'
import { userHead } from '@/util/userHead'
import { postHead } from '@/util/postHead'
import InfoLinks from '@/components/InfoLinks'
import feedGql from '@/gql/feed'
import { feedVars } from '@/util/feedVars'

export default {
  name: 'User',
  components: {
    InfoLinks,
    UserCommentsScroller,
    AvatarEditor: () => import('@/components/avatar_editor/AvatarEditor'),
    ModeratedPlanetsCard,
    UserSummaryCard,
    PostsScroller
  },
  mixins: [postDialogMixin],
  async fetch() {
    this.feed = (
      await this.$apollo.query({
        query: feedGql,
        variables: feedVars(this.$route),
        fetchPolicy: 'network-only'
      })
    ).data.feed
    this.userComments = (
      await this.$apollo.query({
        query: userCommentsGql,
        variables: {
          username: this.$route.params.username
        },
        fetchPolicy: 'network-only'
      })
    ).data.userComments
  },
  async asyncData({ app, params }) {
    const user = (
      await app.apolloProvider.defaultClient.query({
        query: userGql,
        variables: { username: params.username },
        fetchPolicy: 'network-only'
      })
    ).data.user
    return { user, editBio: user.bio }
  },
  data() {
    return {
      user: null,
      userComments: [],
      avatarDialog: false,
      tab: 0,
      selectedPostId: null,
      bioDialog: false,
      editBio: '',
      bannerFile: null
    }
  },
  computed: {
    joinedDate() {
      return format(new Date(this.user.createdAt), 'MMM d, yyyy')
    },
    lastOnlineString() {
      if (!this.user || !this.user.lastLogin) return ''
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
  watch: {
    async bannerFile(val) {
      if (!val) return
      if (val.size > 4 * 1024 * 1024) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Too big - banner file must be less than 4MB'
        })
        this.bannerFile = null
        return
      }
      await this.$apollo.mutate({
        mutation: gql`
          mutation($file: Upload!) {
            uploadBannerImage(file: $file)
          }
        `,
        variables: {
          file: this.bannerFile
        }
      })
      this.refetchUser()
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  scrollToTop: false,
  methods: {
    openBannerInput() {
      if (!this.user.isCurrentUser) return
      this.$refs.bannerinput.$refs.input.click()
    },
    openAvatarDialog() {
      if (!this.user.isCurrentUser) return
      this.avatarDialog = true
    },
    finishAvatarDialog() {
      this.avatarDialog = false
      this.refetchUser()
    },
    async refetchUser() {
      this.user = (
        await this.$apollo.query({
          query: userGql,
          variables: {
            username: this.$route.params.username
          },
          fetchPolicy: 'network-only'
        })
      ).data.user
    },
    openBioDialog() {
      if (!this.user.isCurrentUser) return
      this.bioDialog = true
    },
    cancelEditBio() {
      this.bioDialog = false
      this.editBio = this.user.bio
    },
    finishEditBio() {
      this.bioDialog = false
      this.user.bio = this.editBio
      this.$apollo.mutate({
        mutation: setBioGql,
        variables: {
          bio: this.editBio
        }
      })
    }
  },
  head() {
    if (this.selectedPost && this.dialog) return postHead(this.selectedPost)
    else return userHead(this.user)
  }
}
</script>

<style scoped>
.editprofileavatar:hover {
  opacity: 0.75;
  cursor: pointer;
}

.editprofileavatar:hover .editprofileicon {
  display: initial;
}

.editprofileicon {
  display: none;
}

.editablebio .v-icon {
  display: none;
}

.editablebio:hover .v-icon {
  display: initial !important;
}

.editablebio:hover {
  cursor: pointer;
}

.bio {
  word-break: break-word;
}
</style>
