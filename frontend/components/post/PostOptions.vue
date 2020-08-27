<template>
  <div>
    <v-bottom-sheet v-if="!$device.isDesktop" v-model="menuOpen">
      <template v-slot:activator="{ on }">
        <v-btn
          small
          icon
          class="text--secondary"
          aria-label="Post Options"
          v-on="on"
        >
          <v-icon size="20">{{ $vuetify.icons.values.mdiDotsVertical }}</v-icon>
        </v-btn>
      </template>

      <PostOptionsContent
        :post="post"
        :hidden="hidden"
        :reported="reported"
        @reported="$emit('reported')"
        @selected="menuOpen = false"
        @edit="openDialog"
      />
    </v-bottom-sheet>

    <v-menu v-else v-model="menuOpen" transition="slide-y-transition" offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          small
          icon
          class="text--secondary"
          aria-label="Post Options"
          v-on="on"
        >
          <v-icon size="20">{{ $vuetify.icons.values.mdiDotsVertical }}</v-icon>
        </v-btn>
      </template>

      <PostOptionsContent
        :post="post"
        :hidden="hidden"
        :reported="reported"
        @reported="$emit('reported')"
        @edit="openDialog"
      />
    </v-menu>

    <client-only>
      <v-dialog
        v-model="dialog"
        :retain-focus="false"
        persistent
        width="50%"
        :fullscreen="!$device.isDesktop"
        :transition="
          $device.isDesktop ? 'dialog-transition' : 'dialog-bottom-transition'
        "
      >
        <v-card
          :tile="!$device.isDesktop"
          :min-height="$device.isDesktop ? '400' : ''"
        >
          <div
            style="display: flex;"
            :style="{
              'background-color': $vuetify.theme.dark ? '#202124' : '#F1F3F4',
              'border-bottom-width': '1px',
              'border-bottom-color': 'rgba(0, 0, 0, 0.12)',
              'border-bottom-style': $vuetify.theme.dark ? 'none' : 'solid'
            }"
          >
            <v-btn
              text
              tile
              class="flex-grow-1"
              height="50"
              @click="closeDialog"
            >
              <v-icon class="mr-2">{{
                $vuetify.icons.values.mdiCloseCircleOutline
              }}</v-icon>
              Discard
            </v-btn>
            <v-btn
              text
              tile
              class="flex-grow-1"
              height="50"
              :loading="editBtnLoading"
              @click="submitEdit"
            >
              <v-icon class="mr-2">{{
                $vuetify.icons.values.mdiCheckCircleOutline
              }}</v-icon>
              Done
            </v-btn>
          </div>

          <div style="font-size: 1rem;">
            <Editor
              v-model="editTextContent"
              editable
              autofocus
              :style="
                $device.isDesktop ? 'min-height: 296px; max-height: 600px' : ''
              "
              style="overflow-y: auto;"
              class="pa-2"
            />
          </div>
        </v-card>
      </v-dialog>
    </client-only>
  </div>
</template>

<script>
import { isEditorEmpty } from '@/util/isEditorEmpty'
import editPostGql from '../../gql/editPost.graphql'
import PostOptionsContent from './PostOptionsContent'

export default {
  name: 'PostOptions',
  components: {
    Editor: () => import('@/components/editor/Editor'),
    PostOptionsContent
  },
  props: {
    post: {
      type: Object,
      required: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    reported: {
      type: Boolean,
      default: false
    },
    blocked: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialog: false,
      editTextContent: this.post.textContent,
      editBtnLoading: false,
      menuOpen: false
    }
  },
  computed: {
    isEditorEmpty() {
      return isEditorEmpty(this.editTextContent)
    }
  },
  watch: {
    $route: {
      deep: true,
      handler() {
        if (!this.$route.query || !this.$route.query.editing) {
          this.dialog = false
        }
      }
    }
  },
  mounted() {
    if (this.$route.query && this.$route.query.editing) {
      const query = Object.assign({}, this.$route.query)
      delete query.editing
      this.$router.push({ path: this.$route.path, query })
    }
  },
  methods: {
    openDialog() {
      this.$router.push({
        path: this.$route.path,
        query: { ...this.$route.query, editing: 'true' }
      })
      this.dialog = true
    },
    closeDialog() {
      if (!this.isEditorEmpty) {
        const confirmed = window.confirm(
          'Are you sure you want to discard this edit?'
        )
        if (!confirmed) return
      }
      this.dialog = false
      const query = Object.assign({}, this.$route.query)
      delete query.editing
      this.$router.push({ path: this.$route.path, query })
      this.editTextContent = this.post.textContent
    },
    async submitEdit() {
      this.editBtnLoading = true
      await this.$apollo.mutate({
        mutation: editPostGql,
        variables: {
          postId: this.post.id,
          newTextContent: this.editTextContent
        }
      })
      this.post.textContent = this.editTextContent
      this.editBtnLoading = false
      this.dialog = false
      const query = Object.assign({}, this.$route.query)
      delete query.editing
      await this.$router.push({ path: this.$route.path, query })
    }
  }
}
</script>

<style scoped></style>
