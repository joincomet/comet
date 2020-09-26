<template>
  <div class="container py-3 mx-auto">
    <div class="grid grid-cols-12 gap-6">
      <div class="col-span-2 py-6 bg-white rounded-lg">
        <div class="px-6 pb-3 text-xs tracking-widest uppercase text-secondary">
          SETTINGS
        </div>
        <nuxt-link to="/settings" class="vertical-tab">
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
          </svg>
          <span class="ml-6">General</span>
        </nuxt-link>
        <nuxt-link to="/settings/filters" class="vertical-tab">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd" />
          </svg>
          <span class="ml-6">Filters</span>
        </nuxt-link>
        <nuxt-link to="/settings/account" class="vertical-tab">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clip-rule="evenodd" />
          </svg>
          <span class="ml-6">Account</span>
        </nuxt-link>
        <div class="text-red-500 vertical-tab">
          <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clip-rule="evenodd" />
          </svg>
          <span class="ml-6">Log Out</span>
        </div>
      </div>
      <div class="col-span-10 px-6 py-3 bg-white rounded-lg">
        <nuxt-child />
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.vertical-tab {
    @apply inline-flex flex-row items-center w-full px-6 py-3 text-sm transition duration-150 ease-in-out cursor-pointer hover:bg-gray-200 select-none;
}
</style>
