<template>
  <v-menu v-if="$device.isDesktop" offset-y transition="slide-y-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon small class="text--secondary" v-on="on">
        <v-icon size="20">{{ $vuetify.icons.values.mdiDotsVertical }}</v-icon>
      </v-btn>
    </template>

    <CommentOptionsContent
      :comment="comment"
      :post="post"
      @startedit="$emit('startedit')"
      @deletecomment="$emit('deletecomment')"
      @removecomment="$emit('removecomment')"
    />
  </v-menu>

  <v-bottom-sheet v-else v-model="menu">
    <template v-slot:activator="{ on }">
      <v-btn text tile class="text--secondary flex-grow-1" v-on="on">
        <v-icon>{{ $vuetify.icons.values.mdiDotsVertical }}</v-icon>
      </v-btn>
    </template>

    <CommentOptionsContent
      :comment="comment"
      :post="post"
      @startedit="startEdit"
      @deletecomment="deleteComment"
      @removecomment="removeComment"
    />
  </v-bottom-sheet>
</template>

<script>
import CommentOptionsContent from '@/components/comment/options/CommentOptionsContent'
export default {
  name: 'CommentOptions',
  components: { CommentOptionsContent },
  props: {
    comment: {
      type: Object,
      required: true
    },
    post: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      menu: false
    }
  },
  methods: {
    startEdit() {
      this.$emit('startedit')
      this.menu = false
    },
    deleteComment() {
      this.$emit('deletecomment')
      this.menu = false
    },
    removeComment() {
      this.$emit('removecomment')
      this.menu = false
    }
  }
}
</script>

<style scoped></style>
