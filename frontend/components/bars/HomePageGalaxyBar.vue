<template>
  <v-app-bar
    flat
    dense
    :class="$device.isDesktop ? 'pr-5' : ''"
    style="border-bottom-width: 1px; border-bottom-style: solid; z-index: 30;"
    :style="{
      'border-bottom-color': $vuetify.theme.dark
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(0, 0, 0, 0.12)'
    }"
  >
    <v-slide-group ref="slider" v-model="model" show-arrows center-active>
      <v-slide-item
        v-if="$store.state.currentUser"
        v-slot:default="{ active, toggle }"
      >
        <v-chip
          :ripple="false"
          class="mx-2 elevation-0"
          :class="$route.name === 'home-sort-time' ? 'white--text' : ''"
          active-class="active"
          nuxt
          :to="{
            name: 'home-sort-time',
            params: { ...$route.params, galaxyname: undefined }
          }"
          :color="
            $route.name === 'home-sort-time'
              ? 'primary'
              : $vuetify.theme.dark
              ? '#35363A'
              : '#F8F9FA'
          "
          :style="{
            'border-width': '1px',
            'border-color': 'rgba(0, 0, 0, 0.12)',
            'border-style': $vuetify.theme.dark ? 'none' : 'solid'
          }"
          @click="toggle"
        >
          <v-avatar left>
            <v-icon>{{ $vuetify.icons.values.mdiEarth }}</v-icon>
          </v-avatar>
          My Planets
        </v-chip>
      </v-slide-item>

      <v-slide-item v-slot:default="{ active, toggle }">
        <v-chip
          :ripple="false"
          class="mx-2 elevation-0"
          active-class="active"
          nuxt
          :to="{
            name: 'universe-sort-time',
            params: { ...$route.params, galaxyname: undefined }
          }"
          :color="
            $route.name === 'universe-sort-time'
              ? 'primary'
              : $vuetify.theme.dark
              ? '#35363A'
              : '#F8F9FA'
          "
          :style="{
            'border-width': '1px',
            'border-color': 'rgba(0, 0, 0, 0.12)',
            'border-style': $vuetify.theme.dark ? 'none' : 'solid'
          }"
          @click="toggle"
        >
          <v-avatar left>
            <v-icon>{{ $vuetify.icons.values.mdiInfinity }}</v-icon>
          </v-avatar>
          Universe
        </v-chip>
      </v-slide-item>

      <v-slide-item
        v-for="galaxy in $store.state.galaxies"
        :key="galaxy.name"
        v-slot:default="{ active, toggle }"
      >
        <v-chip
          :ripple="false"
          class="mx-2 elevation-0"
          active-class="active"
          nuxt
          :to="{
            name: 'g-galaxyname-sort-time',
            params: { ...$route.params, galaxyname: galaxy.name }
          }"
          :color="
            $route.params.galaxyname === galaxy.name
              ? 'primary'
              : $vuetify.theme.dark
              ? '#35363A'
              : '#F8F9FA'
          "
          :style="{
            'border-width': '1px',
            'border-color': 'rgba(0, 0, 0, 0.12)',
            'border-style': $vuetify.theme.dark ? 'none' : 'solid'
          }"
          @click="toggle"
        >
          <v-avatar left>
            <v-icon>{{ $vuetify.icons.values[galaxy.icon] }}</v-icon>
          </v-avatar>
          {{ galaxy.fullName }}
        </v-chip>
      </v-slide-item>
    </v-slide-group>
  </v-app-bar>
</template>

<script>
export default {
  name: 'HomePageGalaxyBar',
  data() {
    return {
      model: null
    }
  }
}
</script>

<style scoped>
>>> .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}

.active {
  opacity: 1 !important;
}

.v-chip--active::before {
  opacity: 0 !important;
}
</style>
