<template>
  <Dialog>
    <template v-slot:activator="{ on }">
      <slot name="activator" :on="on" />
    </template>

    <div
      class="inline-block align-bottom bg-white bg-cover text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      :style="`background-image: url(${post.link})`"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-headline"
    >
      <img :src="post.link" class="w-full h-full rounded" alt="Image preview">
    </div>
  </Dialog>
</template>

<script>
import Dialog from '@/components/dialog/Dialog'

export default {
  name: 'ImageOverlay',
  components: { Dialog },
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
