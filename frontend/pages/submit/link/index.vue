<template>
  <div>
    <v-text-field
      v-model="title"
      :background-color="$vuetify.theme.dark ? '' : '#F1F3F4'"
      solo
      flat
      label="Title"
      :rules="titleRules"
      :loading="detectTitleLoading"
      clearable
    />

    <v-text-field
      v-model="link"
      :background-color="$vuetify.theme.dark ? '' : '#F1F3F4'"
      solo
      flat
      label="Link URL"
    />

    <v-row no-gutters class="mt-4">
      <PlanetSelector v-model="planet" />
      <v-btn
        class="ml-4"
        color="primary"
        :loading="loading"
        :disabled="!title || title.length > 300 || !link || !planet"
        height="48"
        @click="submitPost"
        >Post</v-btn
      >
    </v-row>
  </div>
</template>

<script>
import isUrl from 'is-url'
import gql from 'graphql-tag'
import PlanetSelector from '@/components/planet/PlanetSelector'
import { urlName } from '~/util/urlName'
import submitPostGql from '~/gql/submitPost'

export default {
  middleware: 'authenticated',
  components: { PlanetSelector },
  data() {
    return {
      title: '',
      link: '',
      titleRules: [
        (v) => v.length <= 300 || 'Title must be 300 characters or less'
      ],
      loading: false,
      detectTitleLoading: false,
      planet: null
    }
  },
  computed: {
    urlName() {
      return urlName(this.title)
    }
  },
  watch: {
    async link() {
      if (!this.link || !isUrl(this.link) || this.title) {
        this.detectTitleLoading = false
        return
      }
      this.detectTitleLoading = true
      this.title = (
        await this.$apollo.query({
          query: gql`
            query($url: String!) {
              getTitleAtUrl(url: $url)
            }
          `,
          variables: {
            url: this.link
          }
        })
      ).data.getTitleAtUrl
      this.detectTitleLoading = false
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
            type: 'LINK',
            link: this.link,
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
    title: 'New Link Post'
  }
}
</script>

<style scoped></style>
