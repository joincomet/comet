<template>
  <div ref="btnRef" style="height: inherit">
    <slot name="activator" :on="handleClick" style="height: inherit" />

    <div
      ref="popoverRef"
      class="z-50 block transition-opacity duration-150 ease-in-out"
      :class="{ invisible: !popoverShow, 'opacity-1': popoverShow, 'opacity-0': !popoverShow }"
      @click.stop.prevent="popoverShow = false"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import { createPopper } from '@popperjs/core'

const sameWidthMod = {
  name: 'sameWidth',
  enabled: true,
  phase: 'beforeWrite',
  requires: ['computeStyles'],
  fn: ({ state }) => {
    state.styles.popper.width = `${state.rects.reference.width}px`
  },
  effect: ({ state }) => {
    state.elements.popper.style.width = `${
      state.elements.reference.offsetWidth
    }px`
  }
}

export default {
  name: 'Popover',
  props: {
    value: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: 'bottom'
    },
    offsetX: {
      type: Number,
      default: 0
    },
    offsetY: {
      type: Number,
      default: 0
    },
    sameWidth: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      popoverShow: this.value
    }
  },
  watch: {
    popoverShow () {
      this.$emit('input', this.popoverShow)
    }
  },
  mounted () {
    document.addEventListener('click', this.togglePopover)
  },
  beforeDestroy () {
    document.removeEventListener('click', this.togglePopover)
  },
  methods: {
    handleClick () {

    },
    togglePopover (e) {
      this.$nextTick(() => {
        const { target } = e
        const btn = this.$refs.btnRef
        const popover = this.$refs.popoverRef
        if (btn.contains(target) || btn.isEqualNode(target) || popover.contains(target) || popover.isEqualNode(target)) {
          if (this.popoverShow) {
            this.popoverShow = false
          } else {
            e.preventDefault()
            this.popoverShow = true
            createPopper(btn, popover, {
              placement: this.placement,
              modifiers: [
                this.sameWidth ? sameWidthMod : undefined,
                {
                  name: 'offset',
                  options: {
                    offset: [this.offsetX, this.offsetY]
                  }
                }
              ]
            })
          }
        } else {
          this.popoverShow = false
        }
      })
    }
  }
}
</script>

<style scoped></style>
