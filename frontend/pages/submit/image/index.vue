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

    <v-file-input
      ref="fileInput"
      v-model="image"
      :background-color="$vuetify.theme.dark ? '' : '#F1F3F4'"
      solo
      flat
      label="Choose an image"
      :rules="uploadRules"
    />

    <img
      v-if="image"
      ref="imagePreview"
      style="max-width: 500px;"
      class="pb-6"
    />

    <v-row no-gutters class="mt-4">
      <PlanetSelector v-model="planet" />
      <v-btn
        class="ml-4"
        color="primary"
        :loading="loading"
        :disabled="
          !title || title.length > 300 || !image || !uploadValid || !planet
        "
        height="48"
        @click="submitPost"
        >Post</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import PlanetSelector from '@/components/planet/PlanetSelector'
import { urlName } from '~/util/urlName'
import submitPostGql from '~/gql/submitPost'

export default {
  middleware: 'authenticated',
  components: { PlanetSelector },
  data() {
    return {
      title: '',
      titleRules: [
        (v) => v.length <= 300 || 'Title must be 300 characters or less'
      ],
      image: null,
      uploadRules: [
        (v) => (v && v.size < 4 * 1024 * 1024) || 'Image must be 4MB or less',
        (v) =>
          (v && (v.type === 'image/jpeg' || v.type === 'image/png')) ||
          'Image must be PNG or JPEG'
      ],
      loading: false,
      planet: null
    }
  },
  computed: {
    urlName() {
      return urlName(this.title)
    },
    uploadValid() {
      return this.$refs.fileInput.valid
    }
  },
  watch: {
    image() {
      if (!this.image) {
        this.$refs.imagePreview.src = ''
        return
      }
      const reader = new FileReader()
      reader.onload = (ev) => (this.$refs.imagePreview.src = ev.target.result)
      reader.readAsDataURL(this.image)
    }
  },
  methods: {
    async submitPost() {
      this.loading = true

      try {
        await this.$apollo.mutate({
          mutation: submitPostGql,
          variables: {
            title: this.title,
            type: 'IMAGE',
            image: this.image,
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
    title: 'New Image Upload'
  }
}
</script>

<style scoped></style>
