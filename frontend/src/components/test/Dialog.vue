<template>
  <div>
    <slot name="activator" :on="openDialog" />

    <div v-if="open" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen text-center">
        <div class="fixed inset-0" @click.stop.prevent="open = false">
          <div
            class="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"
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
    },
    name: {
      type: String,
      default: 'dialog'
    },
    id: {
      type: String,
      default: 'true'
    }
  },
  data () {
    return {
      open: this.value
    }
  },
  watch: {
    open (val) {
      if (val) {
        const query = {}
        query[this.name] = this.id
        this.$router.push({ query })
      } else {
        const query = Object.assign({}, this.$route.query)
        delete query[this.name]
        this.$router.push({ query })
      }
      this.$emit('input', val)
    },
    value (val) {
      this.open = val
    },
    '$route.query' (query) {
      this.open = query[this.name] === this.id
    }
  },
  mounted () {
    this.open = this.$route.query[this.name] === this.id
  },
  methods: {
    openDialog () {
      this.open = !this.open
    }
  }
}
</script>

<style scoped></style>
