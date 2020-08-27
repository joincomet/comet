<template>
  <v-list class="py-0">
    <v-list-item @click="chooseTop">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiFormatListNumbered }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title :class="!$route.query.sort ? 'font-weight-bold' : ''"
          >Top</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>

    <v-list-item @click="chooseNew">
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiClockTimeOneOutline }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title
          :class="$route.query.sort === 'new' ? 'font-weight-bold' : ''"
          >New</v-list-item-title
        >
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'CommentSortMenuContent',
  data() {
    return {
      menu: false
    }
  },
  methods: {
    chooseTop() {
      this.menu = false
      const query = Object.assign({}, this.$route.query)
      delete query.sort
      this.$router.push({
        path: this.$route.path,
        query
      })
    },
    chooseNew() {
      this.menu = false
      const query = Object.assign({}, this.$route.query)
      query.sort = 'new'
      this.$router.push({
        path: this.$route.path,
        query
      })
    }
  }
}
</script>

<style scoped></style>
