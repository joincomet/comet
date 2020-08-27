<template>
  <v-combobox
    ref="combobox"
    v-model="planet"
    solo
    flat
    :items="allPlanets"
    item-text="name"
    item-value="name"
    label="Choose a planet"
    class="namefield"
  >
    <template v-slot:prepend-inner>
      <v-avatar
        class="mr-2"
        size="24"
        :color="
          planet && planet.avatarImageUrl && planet.themeColor
            ? planet.themeColor
            : ''
        "
      >
        <img
          v-if="planet && planet.avatarImageUrl"
          :src="planet.avatarImageUrl"
          loading="lazy"
        />
        <v-icon v-else class="text--secondary">{{
          $vuetify.icons.values.mdiEarth
        }}</v-icon>
      </v-avatar>
    </template>

    <template v-slot:selection="data">
      <span class="text--primary">{{ data.item.name }}</span>
    </template>

    <template v-slot:item="data">
      <v-list-item-avatar>
        <v-avatar
          v-if="data.item.avatarImageUrl"
          :color="data.item.themeColor ? data.item.themeColor : 'primary'"
          left
        >
          <img
            loading="lazy"
            :src="data.item.avatarImageUrl"
            style="object-fit: cover;"
          />
        </v-avatar>
        <v-icon v-else class="text--secondary">{{
          $vuetify.icons.values.mdiEarth
        }}</v-icon>
      </v-list-item-avatar>
      <v-list-item-content>
        <v-list-item-title style="font-size: 1rem;">
          {{ data.item.name }}
        </v-list-item-title>
      </v-list-item-content>
    </template>
  </v-combobox>
</template>

<script>
import gql from 'graphql-tag'

export default {
  name: 'PlanetSelector',
  props: {
    value: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      allPlanets: [],
      search: '',
      planet: this.value
    }
  },
  watch: {
    allPlanets() {
      if (this.$route.query.planet) {
        this.planet = this.allPlanets.find(
          (p) => p.name === this.$route.query.planet
        )
      }
    },
    planet: {
      deep: true,
      handler() {
        this.$emit('input', this.planet)
      }
    }
  },
  created() {
    if (this.$route.query.planet && this.allPlanets.length > 0) {
      this.planet = this.allPlanets.find(
        (p) => p.name === this.$route.query.planet
      )
    }
  },
  apollo: {
    allPlanets: {
      query: gql`
        query {
          allPlanets {
            avatarImageUrl
            name
          }
        }
      `,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>

<style scoped>
>>> .v-input__prepend-inner {
  padding-right: 0 !important;
}

>>> .v-list-item {
  cursor: pointer;
}
</style>
