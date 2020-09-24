<template>
  <div class="container py-6 mx-auto">
    <div class="grid grid-cols-12 gap-4">
      <div class="flex flex-row col-span-9 p-6 rounded-lg card">
        <img :src="user.profilePicUrl" class="w-48 h-48 mr-12 rounded-full">
        <div class="py-2">
          <div class="inline-flex flex-row items-center mb-3">
            <span class="inline-flex flex-row items-end">
              <span class="text-3xl font-semibold">
                {{ user.username }}
              </span>
              <span class="text-2xl font-semibold text-gray-500 dark:text-gray-400">&nbsp;&nbsp;@{{ user.username }}</span>
            </span>
            <span class="px-3 py-1 ml-6 text-sm text-white bg-indigo-500 rounded cursor-pointer">Follow</span>
            <Icon class="ml-6 cursor-pointer text-secondary" name="dots-horizontal" />
          </div>
          <div class="mb-3 text-sm text-secondary">
            Joined {{ user.timeSinceCreated }} &middot; {{ user.endorsementCount }} Rocket{{ user.endorsementCount === 1 ? '' : 's' }} &middot; 22 Followers &middot; 68 Following
          </div>
          <div class="mb-3 text-md text-secondary">
            {{ user.bio }}
          </div>
        </div>
      </div>

      <div class="flex flex-col col-span-3 p-6 rounded-lg card">
        <div class="text-xl font-bold">
          Linked Accounts
        </div>
        <div class="linked-account text-secondary">
          <img class="w-5" src="~/assets/twitter.svg">
          <span class="ml-6 text-sm">@dan_b__</span>
        </div>

        <div class="linked-account text-secondary">
          <img class="w-5" src="~/assets/discord.svg">
          <span class="ml-6 text-sm">Dan#7457</span>
        </div>

        <div class="linked-account text-secondary">
          <img class="w-5" src="~/assets/reddit.svg">
          <span class="ml-6 text-sm">u/CometCommunications</span>
        </div>
      </div>
    </div>

    <div class="flex flex-row items-center mt-6">
      <div class="tab tab-active">
        Everything
      </div>
      <div class="tab">
        22 Posts
      </div>
      <div class="tab">
        45 Comments
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'UserPage',
  components: { Icon },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.background {
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url('~assets/spaceimages/01.jpg');
}

.linked-account {
  @apply flex flex-row items-center mt-4 hover:underline cursor-pointer;
}

.tab {
  @apply px-6 py-3 text-sm text-gray-500 transition duration-150 ease-in-out border-b-2 dark:border-gray-800 border-gray-200 cursor-pointer dark:hover:bg-gray-800 hover:bg-gray-200;
}

.tab-active {
  @apply text-black dark:text-white border-gray-700 dark:border-gray-300;
}
</style>
