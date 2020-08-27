<template>
  <div>
    <v-text-field
      v-model="title"
      :background-color="$vuetify.theme.dark ? '' : '#F1F3F4'"
      solo
      flat
      label="Title"
      :rules="titleRules"
      clearable
    />

    <v-btn
      v-if="!$device.isDesktop"
      depressed
      color="primary"
      @click="openDialog"
    >
      <v-icon class="mr-2">{{ $vuetify.icons.values.mdiPencil }}</v-icon>
      Open Editor
    </v-btn>

    <client-only v-else>
      <Editor v-model="textContent" :show-submit-btn="false" />
    </client-only>

    <client-only>
      <v-dialog
        v-if="$store.state.currentUser"
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
              Close
            </v-btn>
            <v-btn
              text
              tile
              class="flex-grow-1"
              height="50"
              @click="hideDialog"
            >
              <v-icon class="mr-2">{{
                $vuetify.icons.values.mdiCheckCircleOutline
              }}</v-icon>
              Done
            </v-btn>
          </div>

          <div style="font-size: 1rem;">
            <Editor
              v-model="textContent"
              style="overflow-y: auto;"
              class="pa-2"
            />
          </div>
        </v-card>
      </v-dialog>
    </client-only>

    <v-row no-gutters class="mt-4">
      <PlanetSelector v-model="planet" />
      <v-btn
        class="ml-4"
        depressed
        color="primary"
        :loading="loading"
        :disabled="!title || title.length > 300 || !planet"
        height="48"
        @click="submitPost"
        >Post</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import { isEditorEmpty } from '@/util/isEditorEmpty'
import PlanetSelector from '@/components/planet/PlanetSelector'
import submitPostGql from '~/gql/submitPost'
import { urlName } from '~/util/urlName'

export default {
  middleware: 'authenticated',
  components: {
    PlanetSelector,
    Editor: () => import('@/components/editor/Editor')
  },
  data() {
    return {
      textContent: null,
      title: '',
      titleRules: [
        (v) => v.length <= 300 || 'Title must be 300 characters or less'
      ],
      loading: false,
      dialog: false,
      planet: null
    }
  },
  computed: {
    urlName() {
      return urlName(this.title)
    },
    isEditorEmpty() {
      return isEditorEmpty(this.textContent)
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
      this.dialog = false
      const query = Object.assign({}, this.$route.query)
      delete query.editing
      this.$router.push({ path: this.$route.path, query })
    },
    hideDialog() {
      this.dialog = false
      const query = Object.assign({}, this.$route.query)
      delete query.editing
      this.$router.push({ path: this.$route.path, query })
    },
    async submitPost() {
      this.loading = true

      try {
        await this.$apollo.mutate({
          mutation: submitPostGql,
          variables: {
            title: this.title,
            type: 'TEXT',
            textContent: this.textContent,
            planet: this.planet.name
          },
          update: (store, { data: { submitPost } }) => {
            this.$router.push(
              `/p/${this.planet.name}/comments/${submitPost.id}/${this.urlName}`
            )
          }
        })
      } catch (e) {
        await this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
      this.loading = false
    }
  },
  head: {
    title: 'New Text Post'
  }
}
</script>

<style scoped></style>
