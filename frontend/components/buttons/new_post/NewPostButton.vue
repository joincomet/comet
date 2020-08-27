<template>
  <v-btn
    rounded
    depressed
    color="primary"
    nuxt
    :to="
      $store.state.currentUser
        ? `/submit/text${
            $route.params.planetname
              ? `?planet=${$route.params.planetname}`
              : ''
          }`
        : '/'
    "
    height="34"
  >
    <v-icon class="mr-2" color="#E8EAED">{{
      $vuetify.icons.values.mdiPlusBox
    }}</v-icon>
    <span style="color: #e8eaed;">
      New Post
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'NewPostButton'
}
</script>

<style scoped></style>
