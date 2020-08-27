<template>
  <v-app-bar
    flat
    dense
    :style="`border-bottom-width: 1px; border-bottom-style: solid; position: sticky; top: 48px; z-index: 20; border-bottom-color: ${
      $vuetify.theme.dark ? 'rgba(255, 255, 255, 0.12)' : 'rgba(0, 0, 0, 0.12)'
    }`"
  >
    <v-slide-group ref="slider" center-active show-arrows class="slider">
      <v-slide-item v-slot:default="{ active, toggle }">
        <v-chip
          :ripple="false"
          class="mx-2 elevation-0"
          active-class="active"
          nuxt
          :to="{ query: {} }"
          :color="
            !$route.query.galaxy
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
          All
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
          :to="
            $route.query.galaxy === galaxy.name
              ? { query: {} }
              : { query: { galaxy: galaxy.name } }
          "
          :color="
            $route.query.galaxy === galaxy.name
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
  name: 'PlanetPageGalaxyBar'
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

.slider >>> .v-toolbar__content >>> .v-slide-group >>> .v-slide-group__next {
  min-width: 0 !important;
  width: 32px !important;
}
</style>
