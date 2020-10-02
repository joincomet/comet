<template>
  <div>
    <div class="mb-6 font-bold text-md">
      Popular Communities
    </div>
    <div class="bg-white border rounded-lg myborder dark:bg-gray-800">
      <div v-for="community in popularCommunities" :key="community.id" class="flex flex-row items-center p-3 transition duration-150 ease-in-out transform cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-800">
        <img class="object-cover w-10 h-10 rounded-full" :src="community.profile.avatar">
        <div class="flex flex-row items-center flex-grow community">
          <div class="flex flex-col ml-6">
            <div class="text-sm">
              +{{ community.name }}
            </div>
            <div class="text-xs text-secondary">
              {{ community.postCount }} post{{ community.postCount == 1 ? '' : 's' }} today
            </div>
          </div>

          <div class="px-3 py-1 ml-auto text-sm text-white bg-indigo-500 rounded-full btn hovergrow-10">
            Join
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popularCommunities: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
.community:hover > .btn {
  opacity: 1;
}

.community > .btn {
  opacity: 0;
}
</style>
