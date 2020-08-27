<template>
  <div
    style="
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    "
    class="text--secondary"
  >
    <v-icon class="text--secondary" size="36">{{
      $vuetify.icons.values.mdiEmoticonFrown
    }}</v-icon>
    <span class="mt-2" style="font-size: 1.5rem;"
      >We searched far and wide, but there's nothing here.</span
    >
    <nuxt-link to="/" class="mt-2 primary--text"
      >Return to My Planets</nuxt-link
    >
  </div>
</template>

<script>
export default {
  name: 'NoPostsMessage'
}
</script>

<style scoped></style>
