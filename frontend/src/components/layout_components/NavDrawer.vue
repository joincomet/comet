<template>
  <nav
    class="navdrawer"
  >
    <div class="mx-5 pt-7 pb-5 mb-4 border-b border-gray-200 flex flex-row items-center">
      <nuxt-link to="/" class="ml-1.5 mr-auto">
        <img src="~/assets/logo_angled_noio.svg" class="w-40" alt="CometX logo">
      </nuxt-link>
      <nuxt-link to="/settings" class="hover:scale-125 transform duration-150 ease-in-out text-gray-500" active-class="text-indigo-600">
        <iconify-icon icon="settings" class="w-4 h-4" />
      </nuxt-link>
      <div v-if="$store.state.currentUser" class="ml-4 hover:scale-125 transform duration-150 ease-in-out cursor-pointer">
        <svg class="text-gray-500 w-0.5 h-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
        </svg>
      </div>
    </div>
    <div class="text-gray-500">
      <nuxt-link to="/" class="navitem border-indigo-600" exact-active-class="navitem-active text-indigo-600">
        <svg class="w-6 h-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
        Home
      </nuxt-link>
      <nuxt-link to="/universe" class="navitem border-black" exact-active-class="navitem-active text-black">
        <svg class="w-6 h-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
        </svg>
        Universe
      </nuxt-link>
      <nuxt-link to="/~Test" class="navitem border-purple-600" exact-active-class="navitem-active text-purple-600">
        <svg class="w-6 h-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
        Galaxies
      </nuxt-link>
      <nuxt-link v-if="$store.state.currentUser" to="/saved" class="navitem" exact-active-class="navitem-active">
        <svg class="w-6 h-6 mr-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        Saved
      </nuxt-link>
      <nuxt-link v-if="$store.state.currentUser" :to="`/@${$store.state.currentUser.username}`" class="navitem" exact-active-class="navitem-active">
        <img :src="$store.state.currentUser.profile.avatar" class="mr-6" alt="User Avatar">
        {{ $store.state.currentUser.profile.realName || $store.state.currentUser.username }}
      </nuxt-link>
      <div v-else class="navitem cursor-pointer" @click="$store.commit('setLoginDialog', true)">
        <svg class="w-6 h-6 mr-6 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
        </svg>

        <span class="text-green-600">Log In</span>
      </div>
    </div>

    <div class="m-4 shadow-md px-6 py-2.5 bg-indigo-500 hover:bg-indigo-600 rounded-full text-white text-sm flex flex-row items-center cursor-pointer hover:scale-105 transform duration-150 ease-in-out" @click="$store.commit('setLoginDialog', true)">
      <div class="mx-auto inline-flex flex-row items-center">
        <svg class="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="font-medium">Sign Up</span>
      </div>
    </div>

    <div class="px-5 mt-9 mb-3 flex flex-row items-center">
      <div class="text-tiny font-bold tracking-widest uppercase text-tertiary">
        {{ $store.state.currentUser ? 'My ' : 'Top ' }} Planets
      </div>
      <div class="ml-auto rounded-full border border-gray-200 text-tiny font-bold tracking-widest uppercase text-tertiary py-1 px-3 cursor-pointer hover:bg-gray-100">
        EXPLORE
      </div>
    </div>

    <nuxt-link v-for="planet in ($store.state.currentUser ? $store.state.joinedPlanets : $store.state.topPlanets)" :key="planet.id" :to="`/+${planet.name}`" class="navitem">
      <img :src="planet.profile.avatarURL" class="w-6 h-6 mr-6 rounded-full bg-gray-200">
      <span class="text-tertiary">+{{ planet.name }}</span>
    </nuxt-link>
  </nav>
</template>

<script>
import IconifyIcon from '@iconify/vue'
import settings from '@iconify/icons-heroicons-solid/cog'

IconifyIcon.addIcon('settings', settings)

export default {
  name: 'NavDrawer'
}
</script>

<style scoped>
.navitem {
  @apply mr-5 dark:text-gray-300 origin-left flex flex-row font-medium items-center py-3 px-6 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transform hover:scale-105 transition duration-150 ease-in-out rounded-r-full;
}

.navitem-active {
  @apply border-l-4 dark:text-white;
}

.navdrawer {
  @apply fixed z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-lg min-h-full h-full hidden sm:block;
  width: 17.5rem;
}
</style>
