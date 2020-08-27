<template>
  <v-list>
    <template v-if="comment.author.isCurrentUser">
      <v-list-item @click="$emit('startedit')">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiPencil }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Edit</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click="$emit('deletecomment')">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiTrashCan }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Delete</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </template>

    <template
      v-if="
        $store.state.currentUser &&
        (!!$store.state.currentUser.moderatedPlanets.find(
          (p) => p.name === post.planet.name
        ) ||
          $store.state.currentUser.admin)
      "
    >
      <v-list-item @click="$emit('removecomment')">
        <v-list-item-icon>
          <v-icon>{{ $vuetify.icons.values.mdiShield }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title style="font-weight: 500;"
            >Remove (Mod)</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'CommentOptionsContent',
  props: {
    comment: {
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
