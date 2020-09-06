<template>
  <v-card flat :outlined="!$vuetify.theme.dark">
    <v-card-title class="pb-0" style="word-break: break-word">
      <span>
        <v-icon class="mr-2">{{ $vuetify.icons.values.mdiShield }}</v-icon>
        Planets moderated by {{ user.username }}
      </span>
    </v-card-title>
    <v-list>
      <PlanetListItem
        v-for="planet in user.moderatedPlanets"
        :key="planet.name"
        :planet="planet"
        hide-post-count
      />
    </v-list>
  </v-card>
</template>

<script>
import PlanetListItem from '@/components/planet/PlanetListItem'

export default {
  name: 'ModeratedPlanetsCard',
  components: { PlanetListItem },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
