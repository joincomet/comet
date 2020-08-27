<template>
  <v-container>
    <v-row justify="center">
      <v-col :cols="$device.isDesktop ? 6 : 12">
        <div class="text-h6">Create a Planet</div>
        <div class="text-subtitle-1 text--secondary mb-3">
          The Universe is in your hands!
        </div>
        <v-text-field
          v-model="name"
          class="namefield mb-3"
          autofocus
          solo
          flat
          label="Name"
          persistent-hint
          hint="Name shown in address bar (e.g p/Comet). Letters, numbers, and underscores. This cannot be changed later."
          :counter="21"
          :rules="name.length > 0 ? planetRules : []"
        >
          <template v-slot:prepend-inner>
            <span class="text--secondary">p/</span>
          </template>
        </v-text-field>

        <v-textarea
          v-model="description"
          class="descriptionfield mb-3"
          solo
          no-resize
          flat
          label="Description (Required)"
          persistent-hint
          hint='Explain what your Planet is all about (e.g. "Discussion of the Comet platform")'
        />

        <v-select
          ref="galaxyMenu"
          v-model="selectedGalaxy"
          :items="galaxies"
          solo
          flat
          label="Choose Galaxy"
          persistent-hint
          hint="Choose your planet's Galaxy"
          class="mb-3"
          item-text="fullName"
          item-value="name"
        >
          <template v-slot:prepend-inner>
            <v-avatar class="mr-2" size="24">
              <v-icon class="text--secondary">{{
                selectedGalaxy
                  ? $vuetify.icons.values[
                      galaxies.find((g) => g.name === selectedGalaxy).icon
                    ]
                  : $vuetify.icons.values.mdiChevronDown
              }}</v-icon>
            </v-avatar>
          </template>

          <template v-slot:selection="data">
            <span class="text--primary">{{ data.item.fullName }}</span>
          </template>

          <template v-slot:item="data">
            <v-list-item-icon>
              <v-icon>{{ $vuetify.icons.values[data.item.icon] }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ data.item.fullName }}</v-list-item-title>
            </v-list-item-content>
          </template>
        </v-select>

        <v-btn
          depressed
          rounded
          color="primary"
          :disabled="
            !name ||
            !description ||
            !selectedGalaxy ||
            $store.state.currentUser.moderatedPlanets.length >= 10 ||
            !name.match(/^[a-zA-Z0-9_]+$/) ||
            name.length > 21
          "
          :loading="createBtnLoading"
          @click="createPlanet"
          >Create</v-btn
        >

        <div
          v-if="$store.state.currentUser.moderatedPlanets.length >= 10"
          class="error--text"
        >
          Disabled: Cannot moderate more than 10 planets
        </div>

        <div class="text--secondary mt-2" style="font-size: 0.86rem;">
          Further customization will be available on your Planet's page.
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import gql from 'graphql-tag'
import createPlanetGql from '../../../gql/createPlanet.graphql'

export default {
  middleware: 'authenticated',
  data() {
    return {
      name: '',
      description: '',
      galaxies: [],
      selectedGalaxy: null,
      createBtnLoading: false,
      planetRules: [
        (v) => v.length >= 3 || 'Planet name must be at least 3 characters',
        (v) => v.length <= 21 || 'Maximum planet name length is 21 characters',
        (v) =>
          (v.match(/^[a-zA-Z0-9_]+$/) &&
            v.match(/^[a-zA-Z0-9_]+$/).length > 0) ||
          'Planet name can only have letters, numbers, and underscores.'
      ]
    }
  },
  watch: {
    galaxies() {
      if (this.$route.query.galaxy) {
        this.selectedGalaxy = this.$route.query.galaxy
      }
    }
  },
  created() {
    if (this.$route.query.galaxy && this.galaxies.length > 0) {
      this.selectedGalaxy = this.$route.query.galaxy
    }
  },
  apollo: {
    galaxies: {
      query: gql`
        query {
          galaxies {
            name
            fullName
            icon
          }
        }
      `
    }
  },
  methods: {
    async createPlanet() {
      this.createBtnLoading = true
      try {
        await this.$apollo.mutate({
          mutation: createPlanetGql,
          variables: {
            name: this.name,
            description: this.description,
            galaxy: this.selectedGalaxy
          }
        })
        await this.$store.dispatch('fetchCurrentUser')
        await this.$router.push(`/p/${this.name}`)
      } catch (e) {
        await this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
      this.createBtnLoading = false
    }
  },
  head: {
    title: 'Create a Planet'
  }
}
</script>

<style scoped>
>>> .v-input__prepend-inner {
  padding-right: 0 !important;
}

.namefield >>> .v-label {
  top: initial !important;
}

.descriptionfield >>> .v-label {
  top: 0.86rem !important;
}
</style>
