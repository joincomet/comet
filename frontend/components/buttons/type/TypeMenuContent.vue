<template>
  <div>
    <v-list-item :disabled="textDisabled" @click="toggle('text')">
      <v-list-item-action>
        <v-checkbox v-model="textEnabled" readonly />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          >Text<v-icon small class="ml-3">{{
            $vuetify.icons.values.mdiText
          }}</v-icon></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-list-item :disabled="linksDisabled" @click="toggle('link')">
      <v-list-item-action>
        <v-checkbox v-model="linksEnabled" readonly />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          >Links<v-icon small class="ml-3">{{
            $vuetify.icons.values.mdiLink
          }}</v-icon></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-list-item :disabled="imagesDisabled" @click="toggle('image')">
      <v-list-item-action>
        <v-checkbox v-model="imagesEnabled" readonly />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          >Images<v-icon small class="ml-3">{{
            $vuetify.icons.values.mdiImage
          }}</v-icon></v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </div>
</template>

<script>
export default {
  name: 'TypeMenuContent',
  data() {
    return {
      menu: false
    }
  },
  computed: {
    textEnabled() {
      return (
        !this.$route.query.types ||
        this.$route.query.types.split('-').includes('text')
      )
    },
    linksEnabled() {
      return (
        !this.$route.query.types ||
        this.$route.query.types.split('-').includes('link')
      )
    },
    imagesEnabled() {
      return (
        !this.$route.query.types ||
        this.$route.query.types.split('-').includes('image')
      )
    },
    textDisabled() {
      return (
        this.$route.query.types &&
        this.$route.query.types.split('-').length === 1 &&
        this.$route.query.types.split('-').includes('text')
      )
    },
    linksDisabled() {
      return (
        this.$route.query.types &&
        this.$route.query.types.split('-').length === 1 &&
        this.$route.query.types.split('-').includes('link')
      )
    },
    imagesDisabled() {
      return (
        this.$route.query.types &&
        this.$route.query.types.split('-').length === 1 &&
        this.$route.query.types.split('-').includes('image')
      )
    }
  },
  methods: {
    toggle(type) {
      let types = this.$route.query.types
        ? this.$route.query.types.split('-')
        : []

      if (types.length === 0) {
        types = ['text', 'link', 'image'].filter((t) => t !== type)
      } else if (types.includes(type)) types = types.filter((t) => t !== type)
      else types.push(type)

      const query = Object.assign({}, this.$route.query)

      if (types.length === 0 || types.length === 3) {
        delete query.types
      } else {
        query.types = types.join('-')
      }

      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
</script>

<style scoped></style>
