<template>
  <nav
    class="navdrawer"
  >
    <div class="mx-5 pt-7 pb-5 mb-4 border-b border-gray-200 flex flex-row items-center">
      <nuxt-link to="/" class="ml-1.5 mr-auto">
        <img src="~/assets/logo_angled_noio.svg" class="w-32" alt="CometX logo">
      </nuxt-link>
      <nuxt-link to="/settings" class="hover:scale-125 transform duration-150 ease-in-out text-gray-500" active-class="text-indigo-600">
        <iconify-icon icon="settings" class="w-4 h-4" />
      </nuxt-link>
      <nuxt-link v-if="$store.state.currentUser" to="/notifications" class="ml-4 hover:scale-125 transform duration-150 ease-in-out text-gray-500" active-class="text-indigo-600">
        <iconify-icon icon="bell" class="w-4 h-4" />
      </nuxt-link>
    </div>
    <div class="text-gray-500">
      <nuxt-link :to="{ name: 'home', params: { sort: $route.params.sort, time: $route.params.time } }" class="navitem border-indigo-600" exact-active-class="navitem-active text-indigo-600">
        <iconify-icon icon="home" class="w-6 h-6" />
        <span class="ml-6">Home</span>
      </nuxt-link>
      <nuxt-link to="/universe" class="navitem border-black" exact-active-class="navitem-active text-black">
        <iconify-icon icon="universe" class="w-6 h-6" />
        <span class="ml-6">Universe</span>
      </nuxt-link>
      <nuxt-link to="/~Test" class="navitem border-purple-600" exact-active-class="navitem-active text-purple-600">
        <iconify-icon icon="galaxies" class="w-6 h-6" />
        <span class="ml-6">Galaxies</span>
      </nuxt-link>
      <nuxt-link v-if="$store.state.currentUser" to="/saved" class="navitem" exact-active-class="navitem-active">
        <iconify-icon icon="bookmark" class="w-6 h-6" />
        <span class="ml-6">Saved</span>
      </nuxt-link>
      <nuxt-link v-if="$store.state.currentUser" :to="`/@${$store.state.currentUser.username}`" class="navitem" exact-active-class="navitem-active">
        <img :src="$store.state.currentUser.profile.avatar" class="mr-6" alt="User Avatar">
        {{ $store.state.currentUser.profile.realName || $store.state.currentUser.username }}
      </nuxt-link>
      <div v-else class="navitem cursor-pointer text-green-600" @click="$store.commit('setLoginDialog', true)">
        <iconify-icon icon="login" class="w-6 h-6" />
        <span class="ml-6">Log In</span>
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
      <div class="ml-auto rounded-full border border-gray-200 dark:border-gray-700 text-tiny font-bold tracking-widest uppercase text-tertiary py-1 px-4 cursor-pointer hover:bg-gray-100 inline-flex items-center">
        EXPLORE
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-4 h-4 ml-1.5">
          <path d="M21.9 8.9l-1.7 1l-4-6.9l1.7-1l4 6.9m-12.1-1l3 5.2l6.1-3.5l-3-5.2l-6.1 3.5m1.6 4.8l-2-3.5l-4.3 2.5l2 3.5l4.3-2.5m-9.3 1.9l1 1.7l2.6-1.5l-1-1.7l-2.6 1.5m10-.6l-.3-.4l-4.3 2.5l.3.4c.2.3.5.6.8.8L7 22h2l1.4-4.3h.1L12 22h2l-1.9-5.6c.5-.7.5-1.6 0-2.4z" />
        </svg>
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
import bell from '@iconify/icons-heroicons-solid/bell'
import home from '@iconify/icons-heroicons-outline/home'
import universe from '@iconify/icons-heroicons-outline/globe-alt'
import galaxies from '@iconify/icons-heroicons-outline/sparkles'
import login from '@iconify/icons-heroicons-outline/login'
import user from '@iconify/icons-heroicons-outline/user-circle'
import bookmark from '@iconify/icons-heroicons-outline/bookmark'

IconifyIcon.addIcon('settings', settings)
IconifyIcon.addIcon('bell', bell)
IconifyIcon.addIcon('home', home)
IconifyIcon.addIcon('universe', universe)
IconifyIcon.addIcon('galaxies', galaxies)
IconifyIcon.addIcon('login', login)
IconifyIcon.addIcon('user', user)
IconifyIcon.addIcon('bookmark', bookmark)

export default {
  name: 'NavDrawer'
}
</script>

<style scoped>
.navitem {
  @apply relative mr-5 dark:text-gray-300 origin-left flex flex-row font-medium items-center py-3 px-6 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transform hover:scale-105 transition duration-150 ease-in-out rounded-r-full;
}

.navitem-active::before {
  content: "";
  @apply absolute left-0 top-0 bottom-0 w-1 bg-indigo-500;
}

.navdrawer {
  @apply fixed z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-lg min-h-full h-full hidden sm:block;
  width: 17.5rem;
}
</style>
