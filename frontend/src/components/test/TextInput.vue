<template>
  <div class="mb-2">
    <label class="block text-secondary text-xs mb-2" :for="label">
      {{ label }}
    </label>
    <input
      :id="label"
      v-model="text"
      class="appearance-none border rounded w-full py-2 px-3 mb-2 leading-tight focus:outline-none focus:shadow-outline dark:bg-gray-900 dark:border-gray-700"
      :class="error ? 'border-red-500' : ''"
      :type="type"
      :placeholder="placeholder"
    >
    <p class="text-red-500 text-xs italic" :class="error ? '' : 'opacity-0'">
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
