<template>
  <div>
    <label class="block mb-2 text-xs text-secondary" :for="label">
      {{ label }}
    </label>
    <input
      :id="label"
      v-model="text"
      class="px-4 focus:border-indigo-600 origin-left transition duration-150 ease-in-out h-10 border border-gray-200 rounded-md text-sm text-tertiary w-full focus:outline-none"
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
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    errorMessage: {
      type: String,
      default: ''
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
