<template>
  <v-list>
    <v-list-item
      nuxt
      :to="`/submit/text${
        $route.params.planetname ? `?planet=${$route.params.planetname}` : ''
      }`"
      @click="$emit('selected')"
    >
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiText }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Text Post</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      nuxt
      :to="`/submit/link${
        $route.params.planetname ? `?planet=${$route.params.planetname}` : ''
      }`"
      @click="$emit('selected')"
    >
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiLink }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Link Post</v-list-item-title>
      </v-list-item-content>
    </v-list-item>

    <v-list-item
      nuxt
      :to="`/submit/image${
        $route.params.planetname ? `?planet=${$route.params.planetname}` : ''
      }`"
      @click="$emit('selected')"
    >
      <v-list-item-icon>
        <v-icon>{{ $vuetify.icons.values.mdiImage }}</v-icon>
      </v-list-item-icon>
      <v-list-item-content>
        <v-list-item-title>Image Upload</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  name: 'NewPostButtonContent'
}
</script>

<style scoped></style>
