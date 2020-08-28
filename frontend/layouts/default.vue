<template>
  <v-app id="app">
    <AppBar />

    <NavDrawer v-if="$device.isDesktop" />

    <v-main>
      <HomePageGalaxyBar
        v-if="
          $route.name === 'home-sort-time' ||
          $route.name === 'universe-sort-time' ||
          $route.name === 'g-galaxyname-sort-time'
        "
      />

      <nuxt keep-alive :keep-alive-props="{ max: 10 }" />

      <Snackbar />
    </v-main>

    <BottomNavBar v-if="!$device.isDesktop" />
  </v-app>
</template>

<script>
import layoutMixin from '@/mixins/layoutMixin'

export default {
  name: 'Default',
  components: {
    HomePageGalaxyBar: () => import('@/components/bars/HomePageGalaxyBar'),
    NavDrawer: () => import('@/components/bars/NavDrawer'),
    BottomNavBar: () => import('@/components/bars/BottomNavBar'),
    AppBar: () => import('@/components/bars/AppBar'),
    Snackbar: () => import('@/components/bars/Snackbar')
  },
  mixins: [layoutMixin]
}
</script>

<style></style>
