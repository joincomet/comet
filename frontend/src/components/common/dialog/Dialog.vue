<template>
  <div>
    <slot name="activator" :on="openDialog" />

    <div v-if="open" class="fixed inset-0 z-10 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen text-center">
        <div class="fixed inset-0" @click.stop.prevent="open = false">
          <div
            class="absolute inset-0 bg-gray-500 opacity-75 dark:bg-gray-900"
          />
        </div>

        <span
          class="hidden sm:inline-block sm:align-middle sm:h-screen"
        />&#8203;

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dialog',
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      open: this.value
    }
  },
  watch: {
    open (val) {
      this.$emit('input', val)
    },
    value (val) {
      this.open = val
    }
  },
  methods: {
    openDialog () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped></style>
