import submitCommentGql from '@/gql/submitComment'
import postCommentsGql from '@/gql/postComments'
import recordPostViewGql from '@/gql/recordPostView'
import { isEditorEmpty } from '@/util/isEditorEmpty'
import editCommentGql from '@/gql/editComment'

export default {
  data() {
    return {
      replyHTML: null,
      replying: false,
      replyBtnLoading: false,
      editHTML: null,
      editing: false,
      editBtnLoading: false
    }
  },
  computed: {
    isReplyEmpty() {
      return isEditorEmpty(this.replyHTML)
    },
    isEditEmpty() {
      return isEditorEmpty(this.editHTML)
    }
  },
  methods: {
    startReply(comment) {
      if (!this.$store.state.currentUser) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Must log in to reply'
        })
        return
      }
      this.replying = !this.replying
      this.expanded = false
      if (!this.$device.isDesktop) {
        this.$emit('startreply', comment)
      }
    },
    async submitReply(comment) {
      this.replyBtnLoading = true
      try {
        await this.$apollo.mutate({
          mutation: submitCommentGql,
          variables: {
            textContent: this.replyHTML,
            postId: comment.postId,
            parentCommentId: comment.id
          },
          update: (store, { data: { submitComment } }) => {
            const data = store.readQuery({
              query: postCommentsGql,
              variables: {
                postId: comment.postId
                // sort: this.sort.sort.toUpperCase()
              }
            })
            submitComment.level = comment.level + 1
            const index = data.postComments.findIndex(
              (c) => c.id === comment.id
            )
            data.postComments.splice(index + 1, 0, submitComment)
            store.writeQuery({
              query: postCommentsGql,
              variables: {
                postId: comment.postId
                // sort: this.sort.sort.toUpperCase()
              },
              data
            })
            this.replyHTML = null
          }
        })
        if (this.$refs.replydialog) {
          this.$refs.replydialog.closeAndGoBack()
        }
        this.replying = false
      } catch (e) {
        await this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
      this.$apollo.mutate({
        mutation: recordPostViewGql,
        variables: {
          postId: comment.postId
        }
      })
      this.replyBtnLoading = false
    },
    startEdit(comment) {
      if (!this.$store.state.currentUser) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Must log in to reply'
        })
        return
      }
      this.editHTML = comment.textContent
      this.editing = true
      this.expanded = false
      if (!this.$device.isDesktop) {
        this.$emit('startedit', comment)
      }
    },
    async editComment(comment) {
      this.editBtnLoading = true
      await this.$apollo.mutate({
        mutation: editCommentGql,
        variables: {
          commentId: comment.id,
          newTextContent: this.editHTML
        }
      })
      comment.textContent = this.editHTML
      this.editing = false
      this.editBtnLoading = false
      if (this.$refs.editdialog) {
        this.$refs.editdialog.closeAndGoBack()
      }
    }
  }
}
