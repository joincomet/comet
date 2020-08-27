<template>
  <v-navigation-drawer
    v-model="nav"
    app
    clipped
    :color="$vuetify.theme.dark ? '#202124' : '#F8F9FA'"
    mobile-breakpoint="1281"
    style="z-index: 30;"
    width="250"
  >
    <simplebar style="height: 100%;" data-simplebar-auto-hide="false">
      <NavDrawerContents class="mt-2" />
    </simplebar>
  </v-navigation-drawer>
</template>

<script>
import 'simplebar/dist/simplebar.min.css'
import simplebar from 'simplebar-vue'
import NavDrawerContents from '@/components/bars/NavDrawerContents'

export default {
  name: 'NavDrawer',
  components: { NavDrawerContents, simplebar },
  computed: {
    nav: {
      get() {
        return this.$store.state.nav
      },
      set(val) {
        this.$store.commit('setNav', val)
      }
    }
  }
}
</script>

<style>
.simplebar-track.simplebar-vertical .simplebar-scrollbar:before {
  background-color: var(--v-primary-base);
  opacity: 0.15;
  transition: opacity ease 0.1s;
}
.simplebar-track.simplebar-vertical.simplebar-hover
  .simplebar-scrollbar:before {
  background-color: var(--v-primary-base);
  opacity: 0.5;
  transition: opacity ease 0.1s;
}
.simplebar-track.simplebar-vertical {
  width: 12px !important;
  transition: width ease 0.1s;
}
.simplebar-track.simplebar-vertical.simplebar-hover {
  width: 17px !important;
  transition: width ease 0.1s;
  margin-right: 0px;
}
</style>
