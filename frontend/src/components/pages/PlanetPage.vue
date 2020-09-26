<template>
  <div class="container mx-auto py-3 sm:px-3">
    <div class="text-xl font-semibold">
      {{ planet.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlanetPage',
  props: {
    planet: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
