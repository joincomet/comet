<template>
  <div>
    <div ref="btnRef" style="height: inherit">
      <slot name="activator" :on="togglePopover" />
    </div>

    <div
      v-show="popoverShow"
      class="fixed w-full h-full left-0 top-0 bg-transparent z-40 cursor-auto"
      @click.stop.prevent="popoverShow = false"
    />
    <div
      ref="popoverRef"
      :class="{ hidden: !popoverShow, block: popoverShow }"
      class="shadow bg-white dark:bg-black border border-gray-300 dark:border-gray-800 z-50 font-normal leading-normal text-sm max-w-xs text-left no-underline break-words rounded flex flex-col"
      @click.stop.prevent="popoverShow = false"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

export default {
  name: 'Popover',
  data () {
    return {
      popoverShow: false
    }
  },
  methods: {
    togglePopover () {
      if (this.popoverShow) {
        this.popoverShow = false
      } else {
        this.popoverShow = true
        createPopper(this.$refs.btnRef, this.$refs.popoverRef, {
          placement: 'left',
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 10]
              }
            }
          ]
        })
      }
    }
  }
}
</script>

<style scoped></style>
