<template>
  <div id="app">
    <div id="header">
      <div class="flex inset-x-0 z-100 h-12 items-center bg-indigo-500">
        <div class="w-full max-w-screen-xl relative mx-auto px-6">
          <div class="flex items-center">
            <!--<select
              v-model="$colorMode.preference"
              class="border w-24 h-8 dark:bg-gray-900 dark:border-gray-700"
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>-->
            <Icon class="text-black" style="width: 148px" name="comet-logo" />

            <div class="ml-auto inline-flex flex-row items-center">
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
          </div>
        </div>
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

    <nuxt />
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import LoginDialog from '~/components/test/LoginDialog'
import Popover from '~/components/test/Popover'

export default {
  name: 'Test',
  components: { Icon, Popover, LoginDialog },
  data () {
    return {
      loginDialog: false
    }
  },
  methods: {
    openLoginDialog () {
      this.loginDialog = true
    }
  }
}
</script>

<style scoped></style>
