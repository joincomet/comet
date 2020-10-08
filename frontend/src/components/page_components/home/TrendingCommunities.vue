<template>
  <div class="bg-white border rounded-xl myborder dark:bg-gray-800">
    <div class="flex flex-row items-center">
      <div class="px-5 py-4 flex flex-row flex-grow h-full items-center border-b border-gray-200 text-sm text-gray-700 font-medium">
        Trending Planets
      </div>
    </div>
    <div v-for="(community, index) in communities" :key="community.id" class="flex flex-row items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
      <div class="mx-5 py-4 flex flex-row flex-grow h-full items-center border-gray-200" :class="index < communities.length - 1 ? 'border-b' : ''">
        <img class="object-cover w-10 h-10 rounded-full bg-gray-200" :src="community.profile.avatarURL">
        <div class="flex flex-row items-center flex-grow community">
          <div class="flex flex-col ml-6">
            <div class="text-sm leading-5 font-medium text-secondary">
              +{{ community.name }}
            </div>
            <div class="text-xs text-tertiary mt-1">
              {{ community.userCount }} user{{ community.userCount == 1 ? '' : 's' }} &middot; {{ community.postCount }} post{{ community.postCount == 1 ? '' : 's' }} today
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-row items-center border-t border-gray-200 hover:bg-gray-100">
      <nuxt-link to="/explore" class="px-5 py-4 flex flex-row flex-grow h-full items-center text-sm text-indigo-600 font-medium">
        Explore more planets
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    communities: {
      type: Array,
      required: true
    }
  }
}
</script>

<style scoped>

</style>
