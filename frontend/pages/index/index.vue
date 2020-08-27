<template>
  <div style="display: flex; flex-direction: column;">
    <v-btn
      class="flex-grow-1"
      depressed
      rounded
      color="primary"
      style="margin-bottom: 12px;"
      nuxt
      to="/signup"
      @click="signingUp = true"
      >Sign Up</v-btn
    >

    <v-btn
      class="flex-grow-1"
      depressed
      rounded
      color="primary"
      outlined
      style="margin-bottom: 12px;"
      nuxt
      to="/login"
      >Log In</v-btn
    >
  </div>
</template>

<script>
export default {}
</script>

<style scoped></style>
