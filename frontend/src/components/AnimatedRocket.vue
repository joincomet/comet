<template>
  <div :style="`height: ${size}px; width: ${size}px`">
    <input
      :id="`toggle-heart-${item.id}`"
      v-model="item.isEndorsed"
      type="checkbox"
    >
    <label
      :style="`max-height: ${size}px !important; max-width: ${size}px !important; display: inline-flex`"
      :for="`toggle-heart-${item.id}`"
    >
      <v-icon :size="size" :class="item.isEndorsed ? '' : 'text--secondary'">{{
        $vuetify.icons.values.mdiRocket
      }}</v-icon>
    </label>
  </div>
</template>

<script>
export default {
  name: 'AnimatedRocket',
  props: {
    item: {
      type: Object,
      required: true
    },
    size: {
      type: Number,
      default: 20
    }
  }
}
</script>

<style></style>
