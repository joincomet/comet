<template>
  <v-menu
    offset-y
    transition="slide-y-transition"
    width="420"
    nudge-left="210"
    :close-on-content-click="false"
  >
    <template v-slot:activator="{ on }">
      <v-btn icon v-on="on">
        <v-icon>{{ $vuetify.icons.values.mdiEmoticonExcited }}</v-icon>
      </v-btn>
    </template>

    <Picker
      native
      :data="emojiIndex"
      style="width: 420px;"
      title="Emoji Picker"
      @select="(e) => $emit('select', e)"
    />
  </v-menu>
</template>

<script>
import 'emoji-mart-vue-fast/css/emoji-mart.css'
import data from 'emoji-mart-vue-fast/data/apple.json'
import { Picker, EmojiIndex } from 'emoji-mart-vue-fast'

const emojiIndex = new EmojiIndex(data)

export default {
  name: 'EmojiPicker',
  components: { Picker },
  data() {
    return {
      emojiIndex
    }
  }
}
</script>

<style scoped></style>
