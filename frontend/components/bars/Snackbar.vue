<template>
  <v-snackbar
    v-model="snackbarEnabled"
    style="position: fixed; bottom: 64px;"
    bottom
    :color="snackbarSuccess ? 'success' : 'error'"
    >{{ snackbarMessage }}</v-snackbar
  >
</template>

<script>
export default {
  name: 'Snackbar',
  computed: {
    snackbarEnabled() {
      return this.$store.state.snackbarEnabled
    },
    snackbarMessage() {
      return this.$store.state.snackbarMessage
    },
    snackbarSuccess() {
      return this.$store.state.snackbarSuccess
    }
  }
}
</script>

<style scoped>
.v-snack__content {
  font-size: 1rem;
}
</style>
