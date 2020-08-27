<template>
  <div
    style="font-size: 1rem; line-height: 1.5;"
    class="text--primary"
    :class="
      $vuetify.theme.dark ? 'editor-dark__content' : 'editor-light__content'
    "
    v-html="textContent"
  />
</template>

<script>
export default {
  name: 'TextContent',
  props: {
    textContent: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped></style>
