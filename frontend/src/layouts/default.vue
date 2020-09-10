<template>
  <div id="app">
    <header id="header" class="flex flex-row flex-grow items-center fixed top-0 inset-x-0 z-50 h-12 px-6 dark:bg-gray-900 bg-white border-b border-gray-200 dark:border-gray-800">
      <nuxt-link to="/">
        <Icon class="text-black dark:text-white w-32" name="comet-logo" />
        <!--<img src="~/assets/cometx_optimized.png" class="h-6">-->
      </nuxt-link>

      <div class="ml-auto inline-flex flex-row items-center">
        <select
          v-model="$colorMode.preference"
          class="border w-24 h-8 dark:bg-gray-900 dark:border-gray-700"
        >
          <option value="system">
            System
          </option>
          <option value="light">
            Light
          </option>
          <option value="dark">
            Dark
          </option>
        </select>

        <template v-if="$store.state.currentUser">
          <button
            class="mr-6 py-1 px-3 bg-indigo-500 text-sm text-white rounded"
          >
            Create Post
          </button>

          <Popover>
            <template v-slot:activator="{ on }">
              <img
                ref="btnRef"
                class="rounded-full h-8 w-8 cursor-pointer"
                :src="$store.state.currentUser.profilePicUrl"
                alt="Profile"
                @click="on"
              >
            </template>

            <div class="listitem">
              Profile
            </div>
          </Popover>
        </template>

        <LoginDialog v-else />
      </div>
    </header>

    <div class="flex flex-row">
      <nav
        id="navdrawer"
        class="flex flex-grow-0 flex-shrink-0 flex-col w-56 sticky overflow-y-auto overflow-x-hidden py-4 z-50 border-r border-gray-200 dark:border-gray-800 mt-12"
        style="height: calc(100vh - 3rem); top: 3rem"
      >
        <nuxt-link to="/" class="navitem">
          <Icon name="home" class="mr-6" />
          Home
        </nuxt-link>
        <nuxt-link to="/universe" class="navitem">
          <Icon name="globe" class="mr-6" />
          Universe
        </nuxt-link>
        <nuxt-link to="/saved" class="navitem">
          <Icon name="bookmark" class="mr-6" />
          Saved
        </nuxt-link>

        <div class="tracking-widest text-secondary uppercase text-xs px-6 pt-3 pb-1">
          MY PLANETS
        </div>

        <nuxt-link v-for="planet in joinedPlanets" :key="planet.id" to="/p/+Comet" class="navitem">
          <img :src="planet.avatarImageUrl" class="rounded-full h-6 w-6 mr-6">
          +{{ planet.name }}
        </nuxt-link>
      </nav>

      <div class="mt-16">
        <nuxt />
      </div>
    </div>

    <!--<div id="galaxySlider">
      <div class="flex top-16 inset-x-0 z-100 h-12 items-center">
        <div class="w-full max-w-screen-xl relative mx-auto px-6">
          <div class="flex items-center text-sm uppercase">
            <div class="pr-4">
              <Icon size="16" class="text-gray-700" name="chevron-left" />
            </div>
            <div class="text pr-6">My Planets</div>
            <div class="text pr-6 text-gray-700">Universe</div>
            <div class="ml-auto pl-4">
              <Icon size="16" class="text-gray-700" name="chevron-right" />
            </div>
          </div>
        </div>
      </div>
    </div>-->
  </div>
</template>

<script>
import joinedPlanetsGql from '@/gql/joinedPlanets.graphql'
import Icon from '@/components/Icon'
import LoginDialog from '@/components/dialog/login/LoginDialog'
import Popover from '@/components/popover/Popover'

export default {
  name: 'Default',
  components: { Icon, Popover, LoginDialog },
  data () {
    return {
      loginDialog: false,
      joinedPlanets: []
    }
  },
  apollo: {
    joinedPlanets: {
      query: joinedPlanetsGql
    }
  },
  methods: {
    openLoginDialog () {
      this.loginDialog = true
    }
  }
}
</script>

<style scoped>
.navitem {
  @apply flex flex-row items-center py-3 px-6 text-sm;
}

.navitem:hover {
  @apply bg-gray-200;
}

.dark-mode .navitem:hover {
  @apply bg-gray-800;
}
</style>
