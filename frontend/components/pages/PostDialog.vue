<template>
  <div>
    <div
      style="position: fixed; top: 48px; left: 0; width: 100%; height: 100%;"
      class="background"
      :class="dialogOpen ? '' : 'backgroundhidden'"
    />
    <v-dialog
      v-model="dialogOpen"
      fullscreen
      content-class="dialogcontent"
      hide-overlay
      :origin="mousePosition"
      persistent
      no-click-animation
    >
      <div
        id="overlay"
        :style="`bottom: 0; left: 0; right: 0; position: fixed; height: 100%; width: 100%; z-index: 50;`"
      >
        <v-app-bar
          v-if="!$device.isDesktop"
          class="topappbar"
          dense
          flat
          style="position: fixed; top: 0; z-index: 700;"
          :style="{
            'border-bottom-width': '1px',
            'border-bottom-style': 'solid',
            'border-bottom-color': $vuetify.theme.dark
              ? 'rgba(255, 255, 255, 0.12)'
              : 'rgba(0, 0, 0, 0.12)'
          }"
        >
          <v-app-bar-nav-icon @click="goBack">
            <v-icon>{{ $vuetify.icons.values.mdiArrowLeft }}</v-icon>
          </v-app-bar-nav-icon>

          <div
            style="
              position: fixed;
              top: 8px;
              left: 50%;
              transform: translateX(-50%);
              font-size: 21px;
              font-weight: 500;
            "
          >
            {{ post ? post.planet.name : '' }}
          </div>
        </v-app-bar>

        <div
          style="
            bottom: 0;
            left: 0;
            right: 0;
            position: fixed;
            top: 48px;
            height: 100%;
            width: 100%;
            z-index: 50;
            backface-visibility: hidden;
          "
        >
          <div
            ref="dialog"
            :style="`height: 100%; overflow-y: auto; position: relative; width: 100%; will-change: transform; contain: layout style size;`"
            @click="goBack"
          >
            <div
              v-if="$device.isDesktop"
              :style="`background-color: var(--v-primary-base); color: #e8eaed; position: sticky; box-sizing: border-box; height: 48px; left: 0; margin: 0 auto; max-width: 1280px; right: 0; top: 0; width: calc(100% - 160px); z-index: 70;`"
              @click.stop="doNothing"
            >
              <div
                :style="`padding-left: 32px; padding-right: 24px; align-items: center; box-sizing: border-box; display: flex; height: 100%; margin: auto; max-width: 1280px; width: 100%;`"
              >
                <div
                  :style="`align-items: center; display: flex; flex: 1; max-width: calc(100% - 324px); width: 100%;`"
                >
                  <div
                    :style="`overflow: hidden; text-overflow: ellipsis; white-space: nowrap;`"
                    class="white--text font-weight-medium"
                  >
                    {{ post ? post.title : '' }}
                  </div>
                </div>

                <div
                  :style="`display: flex; justify-content: flex-end; margin-left: 12px; width: 312px;`"
                >
                  <v-btn
                    icon
                    rounded
                    depressed
                    class="white--text"
                    @click="goBack"
                  >
                    <v-icon size="20">{{
                      $vuetify.icons.values.mdiCloseThick
                    }}</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>

            <div
              :style="{
                'background-color': $vuetify.theme.dark ? '#202124' : '#F1F3F4',
                margin: $device.isDesktop ? '0 auto' : '',
                width: $device.isDesktop ? 'calc(100% - 160px)' : '100%',
                'will-change': 'transform',
                'box-sizing': 'border-box',
                display: 'flex',
                'justify-content': 'center',
                'max-width': '1280px',
                'padding-bottom': '32px',
                position: 'relative'
              }"
              @click.stop="doNothing"
            >
              <div
                :style="`flex: 1; min-height: calc(100vh - 124px); min-width: 0; padding-bottom: 1px; width: 100%; word-break: break-word; ${
                  $device.isDesktop ? 'margin: 12px 12px 32px 32px' : ''
                }`"
                class="left"
              >
                <div
                  :style="{
                    'border-width': '1px',
                    'border-radius': '10px',
                    'border-style': $device.isDesktop ? 'solid' : 'none',
                    'border-color': $vuetify.theme.dark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)',
                    'background-color': $vuetify.theme.dark
                      ? '#202124'
                      : '#F8F9FA'
                  }"
                  :class="$device.isDesktop ? 'pa-3 mb-3' : 'pa-3'"
                >
                  <Post v-if="post" :post="post" is-post-view />
                </div>

                <div v-if="$device.isDesktop" class="pb-3">
                  <div v-if="$store.state.currentUser">
                    <div class="pb-3">
                      <span class="text--secondary" style="font-size: 0.86rem;"
                        >Commenting as
                        <UsernameMenu :user-data="$store.state.currentUser"
                      /></span>
                    </div>

                    <client-only>
                      <Editor
                        v-model="replyHTML"
                        :loading="replyBtnLoading"
                        @submitted="
                          submitReply(
                            replyingComment
                              ? replyingComment
                              : { postId: post.id }
                          )
                        "
                      />
                    </client-only>
                  </div>

                  <v-card
                    v-else
                    flat
                    :outlined="!$vuetify.theme.dark"
                    :style="
                      $vuetify.theme.dark
                        ? 'background-color: #35363A'
                        : 'background-color: #F8F9FA'
                    "
                  >
                    <v-card-actions class="px-4">
                      <span class="text--secondary"
                        >Sign up or log in to leave a comment</span
                      >
                      <v-spacer />
                      <v-btn text nuxt to="/login">Log in</v-btn>
                      <v-btn depressed color="primary" nuxt to="/signup"
                        >Sign up</v-btn
                      >
                    </v-card-actions>
                  </v-card>
                </div>

                <v-row
                  v-else
                  no-gutters
                  class="pb-3 px-3 pt-3"
                  :style="{
                    'border-width': '1px',
                    'border-top-style': $device.isDesktop ? 'none' : 'solid',
                    'border-bottom-style': $device.isDesktop ? 'none' : 'solid',
                    'border-color': $vuetify.theme.dark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)',
                    'background-color': $vuetify.theme.dark
                      ? '#202124'
                      : '#F8F9FA'
                  }"
                >
                  <v-btn
                    v-if="$store.state.currentUser"
                    rounded
                    depressed
                    color="primary"
                    :class="$device.isDesktop ? '' : 'flex-grow-1 mr-3'"
                    style="justify-content: start;"
                    height="34"
                    @click="handleStartReply(null)"
                  >
                    <v-icon class="mr-2">{{
                      $vuetify.icons.values.mdiPencil
                    }}</v-icon>
                    <span class="mr-2">Write a comment...</span>
                  </v-btn>

                  <v-btn
                    v-if="!$store.state.currentUser"
                    rounded
                    depressed
                    color="primary"
                    :class="$device.isDesktop ? '' : 'flex-grow-1 mr-3'"
                    style="justify-content: start;"
                    height="34"
                    to="/login"
                    nuxt
                  >
                    <v-icon class="mr-2">{{
                      $vuetify.icons.values.mdiPencil
                    }}</v-icon>
                    Log in to comment
                  </v-btn>

                  <v-spacer v-if="$device.isDesktop" />

                  <CommentSortMenu />
                </v-row>

                <div
                  v-show="postComments.length > 0"
                  style="box-sizing: border-box;"
                  :style="{
                    'border-style': $device.isDesktop ? 'solid' : 'none',
                    'border-bottom-style': 'solid',
                    'border-color': $vuetify.theme.dark
                      ? 'rgba(255, 255, 255, 0.12)'
                      : 'rgba(0, 0, 0, 0.12)',
                    'border-width': '1px',
                    'border-radius': $device.isDesktop ? '10px' : '0',
                    'background-color': $vuetify.theme.dark
                      ? '#202124'
                      : '#F8F9FA'
                  }"
                >
                  <Comment
                    v-for="(comment, index) in postComments"
                    :key="comment.id"
                    :post="post"
                    :post-view="postView"
                    :comment="comment"
                    :style="{
                      'border-top-style':
                        comment.level === 0 && index > 0 ? 'solid' : 'none',
                      'border-color': $vuetify.theme.dark
                        ? 'rgba(255, 255, 255, 0.12)'
                        : 'rgba(0, 0, 0, 0.12)',
                      'border-top-width': '1px'
                    }"
                    @startreply="handleStartReply"
                    @startedit="handleStartEdit"
                  />
                </div>
                <div style="height: 300px;" />
              </div>

              <div
                v-if="$device.isDesktop"
                style="
                  margin: 12px 32px 32px 0;
                  padding: 0;
                  right: 0;
                  top: 0;
                  width: 312px;
                "
                class="right"
              >
                <div
                  style="
                    display: flex;
                    flex-direction: column;
                    height: 100%;
                    top: 0;
                    width: 312px;
                  "
                >
                  <div style="position: sticky; top: 60px;">
                    <PlanetInfoCard
                      v-if="post"
                      :style="
                        $vuetify.theme.dark ? '' : 'background-color: #F8F9FA'
                      "
                      :planet="post.planet"
                    />
                    <InfoLinks class="mt-3" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <template v-if="!$device.isDesktop">
          <EditorDialog
            ref="replydialog"
            v-model="replyHTML"
            :parent-text-content="
              replyingComment ? replyingComment.textContent : null
            "
            :loading="replyBtnLoading"
            @submitted="
              submitReply(
                replyingComment ? replyingComment : { postId: post.id }
              )
            "
          />

          <EditorDialog
            ref="editdialog"
            v-model="editHTML"
            :loading="editBtnLoading"
            @submitted="editComment(editingComment)"
          />
        </template>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import { urlName } from '@/util/urlName'
import Post from '@/components/post/Post'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import UsernameMenu from '@/components/user/UsernameMenu'
import CommentSortMenu from '@/components/comment/sort/CommentSortMenu'
import InfoLinks from '@/components/InfoLinks'
import commentMixin from '@/mixins/commentMixin'
import Comment from '../comment/Comment'
import recordPostViewGql from '../../gql/recordPostView.graphql'
import postCommentsGql from '../../gql/postComments.graphql'

export default {
  name: 'PostDialog',
  components: {
    InfoLinks,
    CommentSortMenu,
    PlanetInfoCard,
    UsernameMenu,
    Editor: () => import('@/components/editor/Editor'),
    EditorDialog: () => import('@/components/editor/EditorDialog'),
    Post,
    Comment
  },
  mixins: [commentMixin],
  props: {
    post: {
      type: Object,
      default: null
    },
    value: {
      type: Boolean,
      required: true
    },
    standalone: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      postComments: [],
      postView: null,
      dialogOpen: this.value,
      addedEventListener: false,
      replyingComment: null,
      editingComment: null,
      mousePosition: 'center center'
    }
  },
  computed: {
    postId() {
      return this.post ? this.post.id : ''
    },
    urlName() {
      if (!this.post) return ''
      return urlName(this.post.title)
    }
  },
  watch: {
    'post.id'() {
      this.updateThemeColor()
      this.postComments = []
      this.$nextTick(() => this.$refs.dialog.scrollTo(0, 0))
    },
    async dialogOpen() {
      this.updateThemeColor()
      this.$emit('input', this.dialogOpen)

      if (!this.dialogOpen && this.addedEventListener) {
        window.removeEventListener('popstate', this.handleHistoryChange)
        this.addedEventListener = false
      } else if (!this.addedEventListener) {
        window.addEventListener('popstate', this.handleHistoryChange)
        this.addedEventListener = true
      }

      if (this.$store.state.currentUser && this.dialogOpen && this.postId) {
        const { data } = await this.$apollo.mutate({
          mutation: recordPostViewGql,
          variables: {
            postId: this.postId
          }
        })
        this.postView = data.recordPostView
      }
    },
    value() {
      this.dialogOpen = this.value
    }
  },
  destroyed() {
    if (this.addedEventListener) {
      window.removeEventListener('popstate', this.handleHistoryChange)
      this.addedEventListener = false
    }
  },
  async mounted() {
    document.onmousedown = this.handleMouseDown

    this.updateThemeColor()
    if (!this.addedEventListener) {
      window.addEventListener('popstate', this.handleHistoryChange)
      this.addedEventListener = true
    }

    if (!this.dialogOpen) {
      window.document.documentElement.style.overflowY = 'scroll'
    } else {
      window.document.documentElement.style.overflowY = 'hidden'
    }
  },
  methods: {
    doNothing() {},
    handleMouseDown(event) {
      this.mousePosition = `${event.clientX}px ${event.clientY}px`
    },
    handleStartReply(e) {
      this.replyingComment = e
      this.$refs.replydialog.open()
    },
    handleStartEdit(e) {
      this.editingComment = e
      this.editHTML = e.textContent
      this.$refs.editdialog.open()
    },
    updateThemeColor() {
      if (
        (!this.post || !this.dialogOpen) &&
        this.$route.name !== 'p-planetname-sort-time'
      ) {
        this.$nextTick(() => {
          this.$vuetify.theme.themes.dark.primary = this.$primaryColor
          this.$vuetify.theme.themes.light.primary = this.$primaryColor
        })
      } else if (this.post && this.post.planet.themeColor) {
        this.$nextTick(() => {
          this.$vuetify.theme.themes.dark.primary = this.post.planet.themeColor
          this.$vuetify.theme.themes.light.primary = this.post.planet.themeColor
        })
      }
    },
    goBack() {
      this.dialogOpen = false
      if (!this.standalone) {
        window.history.pushState({}, null, this.$route.path)
      }
    },
    handleHistoryChange(e) {
      if (this.standalone) return
      if (
        e.target.location.href.includes('/p/') &&
        e.target.location.href.includes('/comments/')
      )
        return
      if (this.$refs.editordialog) {
        this.$refs.editordialog.close()
      }
      this.dialogOpen = false
    }
  },
  apollo: {
    postComments: {
      query: postCommentsGql,
      variables() {
        return {
          postId: this.postId
        }
      },
      skip() {
        return !this.post || !this.dialogOpen || !this.postId
      },
      fetchPolicy: 'network-only'
    }
  }
}
</script>

<style scoped>
>>> .dialogcontent {
  overflow-y: hidden !important;
  box-shadow: none !important;
}

.background.backgroundhidden {
  background-color: rgba(28, 28, 28, 0);
  transition: background-color ease 0.25s;
  z-index: -1;
}

.background {
  background-color: rgba(28, 28, 28, 0.9);
  transition: background-color ease 0.25s;
  z-index: 35;
}

@media (min-width: 960px) {
  .left {
    max-width: 740px;
  }

  .right {
    display: block;
  }
}
</style>
