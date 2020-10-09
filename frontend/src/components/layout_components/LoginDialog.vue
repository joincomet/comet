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
      <div v-show="loginDialog" class="rounded-xl bg-white shadow-xl z-10 m-auto h-full max-w-5xl w-full" />
    </transition>
  </div>
</template>

<script>
export default {
  name: 'NewLoginDialog',
  computed: {
    loginDialog: {
      get () {
        return this.$store.state.loginDialog
      },
      set (val) {
        this.$store.commit('setLoginDialog', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
