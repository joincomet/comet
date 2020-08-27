<template>
  <v-btn small text aria-label="Post Types" @click.stop.prevent="click">
    <span v-if="typeString === 'Everything'">
      <v-icon size="20" class="mr-1">{{
        $vuetify.icons.values.mdiText
      }}</v-icon>
      <v-icon size="20" class="mr-1">{{
        $vuetify.icons.values.mdiLink
      }}</v-icon>
      <v-icon size="20">{{ $vuetify.icons.values.mdiImage }}</v-icon>
    </span>

    <span v-else>
      <v-icon v-if="typeString.includes('Text')" size="20" class="mr-1">{{
        $vuetify.icons.values.mdiText
      }}</v-icon>
      <v-icon v-if="typeString.includes('Links')" size="20" class="mr-1">{{
        $vuetify.icons.values.mdiLink
      }}</v-icon>
      <v-icon v-if="typeString.includes('Images')" size="20">{{
        $vuetify.icons.values.mdiImage
      }}</v-icon>
    </span>
  </v-btn>
</template>

<script>
export default {
  name: 'TypeMenuBtn',
  computed: {
    typeString() {
      if (!this.$route.query.types) return 'Everything'
      let arr = this.$route.query.types.split('-')
      arr = arr.map((s) => s[0].toUpperCase() + s.substring(1))
      return arr.join(' + ').replace('Image', 'Images').replace('Link', 'Links')
    }
  },
  methods: {
    click(event) {
      this.$emit('click', event)
    }
  }
}
</script>

<style scoped></style>
