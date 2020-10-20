<template>
  <div
    class="fixed left-0 right-0 z-50 flex flex-col px-0 transform top-10 bottom-10"
    style="height: calc(100% - 5rem)"
    :class="loginDialog ? '' : '-translate-x-full transition delay-700'"
  >
    <transition name="bg">
      <div v-show="loginDialog" class="absolute left-0 right-0" style="bottom: -3rem; top: -3rem; background: rgba(16, 16, 16, 0.7)" @click="closeLogin" />
    </transition>

    <transition name="modal">
      <div v-show="loginDialog" class="relative z-10 w-full h-full max-w-5xl m-auto bg-white shadow-xl rounded-2xl">
        <div class="absolute p-1 transition duration-150 ease-in-out rounded-full cursor-pointer top-4 right-4 hover:bg-gray-100" @click="closeLogin">
          <svg class="w-6 h-6 text-gray-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <div class="grid h-full grid-cols-12">
          <div class="hidden h-full col-span-4 sm:flex bg-gradient-to-br to-red-400 from-indigo-500 rounded-l-xl">
            <div class="m-auto h-2/3">
              <img src="~/assets/logo_angled_noio_white.svg" class="h-8">
              <div class="text-xl text-center text-white font-base mt-7">
                See what's in orbit.
              </div>
            </div>
          </div>
          <div class="flex h-full col-span-12 px-5 sm:px-0 sm:col-span-8 rounder-r-xl">
            <div class="m-auto space-y-7 h-2/3">
              <div class="flex flex-col items-center pb-5 sm:hidden">
                <img src="~/assets/logo_angled_noio.svg" class="h-8">
                <div class="text-xl text-center text-black font-base mt-7">
                  See what's in orbit.
                </div>
              </div>

              <h1 class="hidden text-2xl font-medium sm:block">
                Welcome to CometX.
              </h1>

              <TextInput placeholder="Username" />
              <TextInput placeholder="Email (Optional)" />
              <TextInput placeholder="Password" type="password" class="mt-6" />

              <div class="flex">
                <div class="inline-flex items-center px-6 py-2 ml-auto transition duration-150 ease-in-out rounded-full cursor-pointer hover:bg-gray-200">
                  <span class="mx-auto text-sm font-medium text-tertiary">Already have an account?</span>
                </div>
                <div class="inline-flex items-center px-6 py-2 ml-3 text-white transition duration-300 ease-in-out transform bg-indigo-500 border border-indigo-600 rounded-full cursor-pointer hover:scale-105 hover:bg-white hover:text-indigo-600">
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
