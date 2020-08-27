<template>
  <v-btn
    color="secondary"
    depressed
    rounded
    height="34"
    class="px-3 white--text"
    style="margin-bottom: 2px;"
    nuxt
    to="/signup"
  >
    <v-icon class="mr-2" size="20">{{
      $vuetify.icons.values.mdiAccountOutline
    }}</v-icon>
    {{ $device.isDesktop ? 'Sign Up to Customize Planets' : 'Sign Up' }}
  </v-btn>
</template>

<script>
export default {
  name: 'SignUpButton'
}
</script>

<style scoped></style>
