<template>
  <div class="container mx-auto py-3 sm:px-3">
    <div class="text-xl font-semibold">
      {{ community.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'communityPage',
  props: {
    community: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
