<template>
  <v-card class="mt-3" flat :outlined="!$vuetify.theme.dark">
    <v-list-item>
      <v-list-item-content class="pb-1">
        <v-list-item-title style="font-size: 1.143rem; font-weight: 500;"
          >Moderators</v-list-item-title
        >
        <div class="mt-2">
          <v-list-item
            v-for="mod in planet.moderators"
            :key="mod.id"
            class="px-0 pb-2"
            style="min-height: 0;"
          >
            <UsernameMenu :user-data="mod" />
          </v-list-item>
        </div>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import UsernameMenu from '@/components/user/UsernameMenu'

export default {
  name: 'PlanetModsCard',
  components: { UsernameMenu },
  props: {
    planet: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped></style>
