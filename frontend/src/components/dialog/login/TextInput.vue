<template>
  <div class="mb-2">
    <label class="block mb-2 text-xs text-secondary" :for="label">
      {{ label }}
    </label>
    <input
      :id="label"
      v-model="text"
      class="w-full px-3 py-2 mb-2 leading-tight border rounded appearance-none focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700"
      :class="error ? 'border-red-500' : ''"
      :type="type"
      :placeholder="placeholder"
    >
    <p class="text-xs italic text-red-500" :class="error ? '' : 'opacity-0'">
      {{ errorMessage }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'TextInput',
  props: {
    value: {
      type: String,
      default: null
    },
    label: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      required: true
    },
    error: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  data () {
    return {
      text: null
    }
  },
  watch: {
    text (val) {
      this.$emit('input', val)
    }
  }
}
</script>

<style scoped></style>
