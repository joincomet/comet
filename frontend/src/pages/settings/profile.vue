<template>
  <div class="container py-3 mx-auto">
    <div class="mb-6 font-bold text-md">
      Customize Profile
    </div>
    <div class="flex flex-row items-start">
      <img :src="$store.state.currentUser.profile.avatar" class="w-48 h-48 bg-indigo-500 rounded-full">
      <div class="flex flex-col ml-6">
        <TextInput placeholder="Full name" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped>

</style>
