<template>
  <div id="app">
    <transition name="fade">
      <TopBar v-show="topBar" />
    </transition>

    <div class="flex flex-row">
      <NavDrawer />
      <LoginDialog />
      <ImageDialog />

      <div class="page">
        <nuxt />
      </div>

      <RightNavDrawer />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Default',
  computed: {
    topBar: {
      get() {
        return this.$store.state.topBar
      },
      set(val) {
        this.$store.commit('setTopBar', val)
      }
    }
  }
}
</script>

<style scoped>
@media(min-width: 640px) {
  .page {
    margin-left: 17.5rem;
    margin-right: 17.5rem;
  }
}

.page {
  @apply flex flex-grow;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .3s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
