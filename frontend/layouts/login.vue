<template>
  <v-app id="app">
    <v-main>
      <nuxt />
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/bars/Snackbar'
import layoutMixin from '@/mixins/layoutMixin'

export default {
  name: 'Login',
  components: { Snackbar },
  mixins: [layoutMixin]
}
</script>

<style scoped></style>
