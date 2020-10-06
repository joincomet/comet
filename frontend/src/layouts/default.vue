<template>
  <div id="app">
    <!--<AppBar />-->

    <div class="w-6 h-6 bg-indigo-500 fixed top-0 left-0 z-50 cursor-pointer" @click="openLogin" />

    <div
      class="px-0 top-10 bottom-10 left-0 fixed right-0 flex flex-col z-50 transform"
      style="height: calc(100% - 5rem)"
      :class="loginDialog ? '' : '-translate-x-full transition delay-700'"
    >
      <transition name="bg">
        <div v-show="loginDialog" class="absolute left-0 right-0" style="bottom: -3rem; top: -3rem; background: rgba(16, 16, 16, 0.7)" @click="closeLogin" />
      </transition>

      <transition name="modal">
        <div v-show="loginDialog" class="rounded-xl bg-white shadow-xl z-10 m-auto h-full max-w-5xl w-full" />
      </transition>
    </div>

    <div class="flex flex-row">
      <NavDrawer />

      <div class="flex flex-grow" style="margin-left: 17.5rem">
        <nuxt />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      loginDialog: false
    }
  },

  methods: {
    openLogin () {
      this.loginDialog = true
    },
    closeLogin () {
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
