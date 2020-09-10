<template>
  <div
    class="inline-block align-bottom bg-white dark:bg-gray-900 bg-cover text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:rounded-lg"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-headline"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'DialogCard'
}
</script>

<style scoped>

</style>
