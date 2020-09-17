<template>
  <nav
    class="sticky z-50 flex flex-col flex-grow-0 flex-shrink-0 w-56 py-4 mt-12 overflow-y-auto"
    style="height: calc(100vh - 3rem); top: 3rem"
  >
    <nuxt-link to="/" class="navitem">
      <Icon name="home" class="mr-6" />
      Home
    </nuxt-link>
    <nuxt-link to="/universe" class="navitem">
      <Icon name="globe" class="mr-6" />
      Universe
    </nuxt-link>
    <nuxt-link to="/saved" class="navitem">
      <Icon name="bookmark" class="mr-6" />
      Saved
    </nuxt-link>

    <div class="px-6 pt-3 pb-1 text-xs tracking-widest uppercase text-secondary">
      MY PLANETS
    </div>

    <nuxt-link v-for="planet in joinedPlanets" :key="planet.id" :to="`/+${planet.name}`" class="navitem">
      <img :src="planet.avatarImageUrl" class="w-6 h-6 mr-6 rounded-full">
      +{{ planet.name }}
    </nuxt-link>
  </nav>
</template>

<script>
import Icon from '@/components/Icon'
import joinedPlanetsGql from '@/gql/joinedPlanets.graphql'

export default {
  components: { Icon },
  data () {
    return {
      joinedPlanets: []
    }
  },
  apollo: {
    joinedPlanets: {
      query: joinedPlanetsGql
    }
  }
}
</script>

<style scoped>
.navitem {
  z-index: 200;
  @apply mr-3 flex flex-row items-center py-3 px-6 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transform hover:scale-110 transition duration-150 ease-in-out rounded-r-full;
}
</style>
