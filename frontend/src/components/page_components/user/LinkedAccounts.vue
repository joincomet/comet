<template>
  <div class="flex flex-col px-6 py-4 mb-4 rounded-lg card">
    <div class="font-semibold text-secondary text-md">
      Linked Accounts
    </div>
    <div v-if="user.usernameTwitter" class="linked-account text-secondary">
      <!--<img class="w-5" src="~/assets/twitter.svg">-->
      <span class="ml-6 text-sm">{{ user.usernameTwitter }}</span>
    </div>

    <div v-if="user.usernameDiscord" class="linked-account text-secondary">
      <!--<img class="w-5" src="~/assets/discord.svg">-->
      <span class="ml-6 text-sm">{{ user.usernameDiscord }}</span>
    </div>

    <div v-if="user.usernameReddit" class="linked-account text-secondary">
      <!--<img class="w-5" src="~/assets/reddit.svg">-->
      <span class="ml-6 text-sm">{{ user.usernameReddit }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LinkedAccounts',
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.linked-account {
  @apply flex flex-row items-center mt-4 hover:underline cursor-pointer;
}
</style>
