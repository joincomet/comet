<template>
  <div
    class="px-0 top-10 bottom-10 left-0 fixed right-0 flex flex-col z-50 transform"
    style="height: calc(100% - 5rem)"
    :class="dialog ? '' : '-translate-x-full transition delay-400'"
  >
    <transition name="bg">
      <div v-show="dialog" class="absolute left-0 right-0" style="bottom: -3rem; top: -3rem; background: rgba(16, 16, 16, 0.7)" @click="dialog = false" />
    </transition>

    <transition name="modal">
      <img v-show="dialog" alt="Image popup" :src="$store.state.imageURLs[currentImage] || ''" class="image" @click="dialog = false">
    </transition>
  </div>
</template>

<script>
export default {
  name: 'ImageDialog',
  data() {
    return {
      currentImage: 0
    }
  },
  computed: {
    dialog: {
      get() {
        return this.$store.state.imageDialog
      },
      set(val) {
        this.$store.commit('setImageDialog', val)
      }
    }
  }
}
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  @apply transition transform duration-200 ease-in-out origin-bottom;
}
.modal-enter, .modal-leave-to {
  @apply opacity-0 scale-95 origin-bottom translate-y-10;
}

.bg-enter-active, .bg-leave-active {
  @apply transition duration-200 ease-in-out;
}
.bg-enter, .bg-leave-to {
  @apply opacity-0 delay-200;
}

.image {
  @apply cursor-pointer sm:rounded-2xl shadow-xl z-10 m-auto max-h-full max-w-full sm:max-w-5xl w-auto object-center object-contain;
}
</style>
