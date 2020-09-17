<template>
  <header class="fixed inset-x-0 top-0 z-50 flex flex-row items-center flex-grow h-12 px-6 bg-white dark:bg-gray-900">
    <nuxt-link to="/">
      <Icon class="text-black w-36 dark:text-white" name="comet-logo" />
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
</template>

<script>
import Icon from '@/components/Icon'
import LoginDialog from '@/components/dialog/login/LoginDialog'
import Popover from '@/components/popover/Popover'

export default {
  components: { Icon, LoginDialog, Popover }
}
</script>

<style scoped>

</style>
