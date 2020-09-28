<template>
  <div class="flex flex-col px-6 py-4 rounded-lg card">
    <div class="font-semibold text-secondary text-md">
      Moderated Planets
    </div>
    <div v-for="planet in user.moderatedPlanets" :key="planet.id" class="moderated-planet text-secondary">
      <img class="w-5 rounded-full" :src="planet.avatarImageUrl">
      <span class="ml-6 text-sm">+{{ planet.name }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.moderated-planet {
  @apply flex flex-row items-center mt-4 hover:underline cursor-pointer;
}
</style>
