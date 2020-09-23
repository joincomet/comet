<template>
  <v-menu
    v-if="$device.isDesktop"
    offset-y
    transition="slide-y-transition"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <TypeMenuBtn v-on="on" />
    </template>

    <v-list>
      <TypeMenuContent />
    </v-list>
  </v-menu>

  <v-bottom-sheet v-else>
    <template v-slot:activator="{ on }">
      <TypeMenuBtn v-on="on" />
    </template>

    <v-list>
      <TypeMenuContent />
    </v-list>
  </v-bottom-sheet>
</template>

<script>
import TypeMenuContent from './TypeMenuContent'
import TypeMenuBtn from './TypeMenuBtn'
export default {
  name: 'TypeMenu',
  components: { TypeMenuBtn, TypeMenuContent }
}
</script>

<style scoped></style>
