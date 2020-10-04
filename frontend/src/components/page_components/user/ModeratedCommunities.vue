<template>
  <div class="flex flex-col px-6 py-4 rounded-lg card">
    <div class="font-semibold text-secondary text-md">
      Moderated Communities
    </div>
    <div v-for="community in user.moderatedCommunities" :key="community.id" class="moderated-community text-secondary">
      <img class="w-5 rounded-full" :src="community.profile.avatar">
      <span class="ml-6 text-sm">+{{ community.name }}</span>
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
.moderated-community {
  @apply flex flex-row items-center mt-4 hover:underline cursor-pointer;
}
</style>
