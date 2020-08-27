import feedGql from '@/gql/feed'
import postGql from '@/gql/post'
import { feedVars } from '@/util/feedVars'

export default {
  data() {
    return {
      feed: [],
      hasMore: true,
      page: 0,
      dialog: false,
      selectedPost: null,
      loadingMore: false
    }
  },
  computed: {
    vars() {
      return feedVars(this.$route)
    }
  },
  watch: {
    dialog() {
      if (!this.dialog) {
        this.hideDialog()
        if (process.client) {
          window.document.documentElement.style.overflowY = 'scroll'
        }
      } else if (process.client) {
        window.document.documentElement.style.overflowY = 'hidden'
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name === 'p-planetname-comments-id-title') {
      if (!this.dialog) {
        this.displayDialog(to)
      } else if (this.$device.isDesktop) {
        window.history.back()
        this.hideDialog()
      }
    } else {
      next()
    }
  },
  methods: {
    async displayDialog(route) {
      window.history.pushState({}, null, route.path)
      this.selectedPost = this.feed.find((p) => p.id === route.params.id)
      if (!this.selectedPost) {
        this.selectedPost = (
          await this.$apollo.query({
            query: postGql,
            variables: {
              postId: route.params.id
            }
          })
        ).data.post
      }
      this.dialog = true
    },
    hideDialog() {
      this.dialog = false
    },
    toggleHidden() {
      this.$apollo.provider.defaultClient.cache.writeQuery({
        query: feedGql,
        variables: {
          ...this.vars
        },
        data: { feed: this.feed.filter((p) => !p.isHidden) }
      })
    },
    toggleBlock() {
      this.$apollo.provider.defaultClient.cache.writeQuery({
        query: feedGql,
        variables: {
          ...this.vars
        },
        data: { feed: this.feed.filter((p) => !p.author.isBlocking) }
      })
    },
    async showMore() {
      if (!this.hasMore || this.loadingMore) return
      this.loadingMore = true
      this.page++
      const { data } = await this.$apollo.query({
        query: feedGql,
        variables: {
          page: this.page,
          ...this.vars
        }
      })
      const newPosts = data.feed
      if (newPosts.length === 0) this.hasMore = false
      this.feed = [...this.feed, ...newPosts]
      this.loadingMore = false
    }
  }
}
