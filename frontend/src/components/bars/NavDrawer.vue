<template>
  <v-navigation-drawer
    v-model="nav"
    app
    clipped
    :color="$vuetify.theme.dark ? '#202124' : '#F8F9FA'"
    mobile-breakpoint="1281"
    style="z-index: 301"
    width="250"
  />
</template>

<script>
export default {
  name: 'NavDrawer',
  computed: {
    nav: {
      get () {
        return this.$store.state.nav
      },
      set (val) {
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
