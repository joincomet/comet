<template>
  <div
    class="px-0 top-10 bottom-10 left-0 fixed right-0 flex flex-col z-50 transform"
    style="height: calc(100% - 5rem)"
    :class="loginDialog ? '' : '-translate-x-full transition delay-700'"
  >
    <transition name="bg">
      <div v-show="loginDialog" class="absolute left-0 right-0" style="bottom: -3rem; top: -3rem; background: rgba(16, 16, 16, 0.7)" @click="closeLogin" />
    </transition>

    <transition name="modal">
      <div v-show="loginDialog" class="rounded-2xl bg-white shadow-xl z-10 m-auto h-full max-w-5xl w-full relative">
        <div class="absolute top-4 right-4 rounded-full p-1 hover:bg-gray-100 transition duration-150 ease-in-out cursor-pointer" @click="closeLogin">
          <svg class="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="grid grid-cols-12 h-full">
          <div class="col-span-4 bg-gradient-to-br to-red-400 from-indigo-500 h-full rounded-l-xl flex">
            <div class="m-auto h-2/3">
              <img src="~/assets/logo_angled_noio_white.svg" class="h-8">
              <div class="text-xl text-white font-base text-center mt-7">
                See what's in orbit.
              </div>
            </div>
          </div>
          <div class="col-span-8 h-full rounder-r-xl flex">
            <div class="space-y-7 m-auto h-2/3">
              <h1 class="text-2xl font-medium">
                Welcome to CometX.
              </h1>

              <TextInput placeholder="Username" />
              <TextInput placeholder="Email (Optional)" />
              <TextInput placeholder="Password" type="password" class="mt-6" />

              <div class="flex">
                <div class="ml-auto cursor-pointer px-6 py-2 inline-flex items-center hover:bg-gray-200 transition duration-150 ease-in-out rounded-full">
                  <span class="mx-auto text-sm text-tertiary font-medium">Already have an account?</span>
                </div>
                <div class="transform hover:scale-105 ml-3 rounded-full bg-indigo-500 hover:bg-white text-white hover:text-indigo-600 border border-indigo-600 cursor-pointer px-6 py-2 inline-flex items-center transition duration-300 ease-in-out">
                  <span class="mx-auto text-sm font-semibold">Sign Up</span>
                </div>
              </div>

              <div class="text-xs text-tertiary">
                By clicking Sign Up, you agree to our <nuxt-link class="text-indigo-600 hover:underline" to="/about/terms" target="_blank">
                  Terms of Service
                </nuxt-link> and <nuxt-link class="text-indigo-600 hover:underline" to="/about/privacy" target="_blank">
                  Privacy Policy
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'LoginDialog',
  data() {
    return {
      tab: 'login'
    }
  },
  computed: {
    loginDialog: {
      get() {
        return this.$store.state.loginDialog
      },
      set(val) {
        this.$store.commit('setLoginDialog', val)
      }
    }
  },
  methods: {
    openLogin() {
      this.loginDialog = true
    },
    closeLogin() {
      this.loginDialog = false
    }
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  @apply transition transform duration-300 ease-in-out origin-bottom;
}
.modal-enter, .modal-leave-to {
  @apply opacity-0 scale-95 origin-bottom translate-y-10;
}

.bg-enter-active, .bg-leave-active {
  @apply transition duration-300 ease-in-out;
}
.bg-enter, .bg-leave-to {
  @apply opacity-0 delay-300;
}
</style>
