<template>
  <v-bottom-sheet v-if="!$device.isDesktop" v-model="menu">
    <template v-slot:activator="{ on }">
      <v-btn
        aria-label="Sort Comments"
        outlined
        rounded
        class="font-weight-regular"
        style="border-width: 1px;"
        height="34"
        :style="
          $vuetify.theme.dark
            ? 'border-color: rgba(255, 255, 255, 0.12);'
            : 'border-color: rgba(0, 0, 0, 0.12);'
        "
        v-on="on"
      >
        <v-icon v-if="!$route.query.sort" class="mr-2">{{
          $vuetify.icons.values.mdiFormatListNumbered
        }}</v-icon>
        <v-icon v-else-if="$route.query.sort === 'new'" class="mr-2">{{
          $vuetify.icons.values.mdiClockTimeOneOutline
        }}</v-icon>

        <span v-if="!$route.query.sort">Top</span>
        <span v-else-if="$route.query.sort === 'new'">New</span>
      </v-btn>
    </template>

    <CommentSortMenuContent />
  </v-bottom-sheet>

  <v-menu v-else v-model="menu" bottom offset-y transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn
        aria-label="Sort Comments"
        outlined
        rounded
        class="font-weight-regular"
        style="border-width: 1px;"
        :style="
          $vuetify.theme.dark
            ? 'border-color: rgba(255, 255, 255, 0.12);'
            : 'border-color: rgba(0, 0, 0, 0.12);'
        "
        v-on="on"
      >
        <v-icon v-if="!$route.query.sort" class="mr-2">{{
          $vuetify.icons.values.mdiFormatListNumbered
        }}</v-icon>
        <v-icon v-else-if="$route.query.sort === 'new'" class="mr-2">{{
          $vuetify.icons.values.mdiClockTimeOneOutline
        }}</v-icon>

        <span v-if="!$route.query.sort">Top</span>
        <span v-else-if="$route.query.sort === 'new'">New</span>
      </v-btn>
    </template>

    <CommentSortMenuContent />
  </v-menu>
</template>

<script>
import CommentSortMenuContent from './CommentSortMenuContent'

export default {
  name: 'CommentSortMenu',
  components: { CommentSortMenuContent },
  data() {
    return {
      menu: false
    }
  }
}
</script>

<style scoped></style>
