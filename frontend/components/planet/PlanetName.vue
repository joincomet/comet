<template>
  <span @click="handleClick">
    <nuxt-link :to="`/p/${planet.name}`" class="text--secondary" event="">
      <v-avatar size="20">
        <img
          v-if="planet.avatarImageUrl"
          loading="lazy"
          alt="Profile picture"
          :src="planet.avatarImageUrl"
          style="object-fit: cover;"
        />
        <v-icon v-else class="text--secondary" size="20">{{
          $vuetify.icons.values.mdiEarth
        }}</v-icon>
      </v-avatar>
      <span class="ml-1" style="font-size: 0.86rem;">p/{{ planet.name }}</span>
    </nuxt-link>
  </span>
</template>

<script>
export default {
  name: 'PlanetName',
  props: {
    planet: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleClick(e) {
      if (this.$device.isDesktop) {
        e.stopPropagation()
        e.preventDefault()
        this.$router.push(`/p/${this.planet.name}`)
      }
    }
  }
}
</script>

<style scoped></style>
