<template>
  <v-container>
    <v-row>
      <v-col
        :cols="$device.isDesktop ? 9 : 12"
        :class="
          $vuetify.theme.dark ? 'editor-dark__content' : 'editor-light__content'
        "
      >
        <h1>Privacy Policy</h1>

        <p>
          Your information (including email) is not shared with any third party,
          unless:
        </p>
        <ul>
          <li>United States law requires your information</li>
          <li>
            There is good reason (at Comet's discretion) to share your
            information with United States law enforcement
          </li>
          <li>
            Your data may be exposed to our hosting services (Heroku, Amazon Web
            Services, and Cloudflare)
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  head: {
    title: 'Privacy Policy'
  }
}
</script>

<style scoped></style>
