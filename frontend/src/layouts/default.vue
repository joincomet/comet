<template>
  <div id="app">
    <header id="header" class="fixed inset-x-0 top-0 z-50 flex flex-row items-center flex-grow h-12 px-6 bg-white dark:bg-gray-900">
      <nuxt-link to="/">
        <Icon class="w-32 text-black dark:text-white" name="comet-logo" />
        <!--<img src="~/assets/cometx_optimized.png" class="h-6">-->
      </nuxt-link>

      <div class="inline-flex flex-row items-center ml-auto">
        <select
          v-model="$colorMode.preference"
          class="w-24 h-8 border dark:bg-gray-900 dark:border-gray-700"
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
            class="px-3 py-1 mr-6 text-sm text-white bg-indigo-500 rounded"
          >
            Create Post
          </button>

          <Popover>
            <template v-slot:activator="{ on }">
              <img
                ref="btnRef"
                class="w-8 h-8 rounded-full cursor-pointer"
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
        class="sticky z-50 flex flex-col flex-grow-0 flex-shrink-0 w-56 py-4 mt-12 overflow-x-hidden overflow-y-auto"
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

        <div class="px-6 pt-3 pb-1 text-xs tracking-widest uppercase text-secondary">
          MY PLANETS
        </div>

        <nuxt-link v-for="planet in joinedPlanets" :key="planet.id" to="/p/+Comet" class="navitem">
          <img :src="planet.avatarImageUrl" class="w-6 h-6 mr-6 rounded-full">
          +{{ planet.name }}
        </nuxt-link>
      </nav>

      <div class="mt-16">
        <nuxt />
      </div>
    </div>

    <!--<div id="galaxySlider">
      <div class="inset-x-0 flex items-center h-12 top-16 z-100">
        <div class="relative w-full max-w-screen-xl px-6 mx-auto">
          <div class="flex items-center text-sm uppercase">
            <div class="pr-4">
              <Icon size="16" class="text-gray-700" name="chevron-left" />
            </div>
            <div class="pr-6 text">My Planets</div>
            <div class="pr-6 text-gray-700 text">Universe</div>
            <div class="pl-4 ml-auto">
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
