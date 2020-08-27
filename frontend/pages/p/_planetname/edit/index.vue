<template>
  <v-container>
    <v-row>
      <v-col :cols="$device.isDesktop ? 6 : 12">
        <div class="text-h4 pb-3">Edit p/{{ $route.params.planetname }}</div>
        <div class="pb-6">
          <div
            style="font-size: 1.143rem; font-weight: 500;"
            class="text--primary"
          >
            Planet Color
          </div>
          <div
            style="font-size: 0.86rem; font-weight: 500;"
            class="text--secondary pb-3"
          >
            Tip: Make sure your Planet's color looks good on both dark and light
            themes!
          </div>
          <div>
            <v-color-picker
              v-model="themeColor"
              hide-canvas
              hide-inputs
              hide-mode-switch
              disabled
              :class="
                $vuetify.theme.dark ? 'darkcolorpicker' : 'lightcolorpicker'
              "
              :swatches="swatches"
              show-swatches
            />
          </div>
        </div>

        <div>
          <div
            style="font-size: 1.143rem; font-weight: 500;"
            class="text--primary pb-3"
          >
            Custom Planet Name ({{
              planet.customName ? `"${planet.customName}"` : 'none'
            }})
          </div>
          <div>
            <v-text-field
              v-model="planet.customName"
              solo
              flat
              :counter="50"
              label="Custom Planet Name"
            />
          </div>
        </div>

        <div>
          <div
            style="font-size: 1.143rem; font-weight: 500;"
            class="text--primary pb-3"
          >
            Planet Description
          </div>
          <div>
            <v-textarea
              v-model="planet.description"
              solo
              flat
              label="Planet Description (Required)"
            />
          </div>
        </div>

        <v-text-field
          v-model="addModeratorUsername"
          solo
          flat
          label="Add a moderator"
          :append-icon="$vuetify.icons.values.mdiAccountPlusOutline"
          @click:append="addModerator"
          @keydown.enter="addModerator"
        />

        <div v-if="planet.bannerImageUrl" class="mb-3">
          <span
            style="cursor: pointer;"
            class="hoverable"
            @click="removeBanner"
          >
            Remove Planet Banner
          </span>
        </div>

        <div v-if="planet.avatarImageUrl">
          <span
            style="cursor: pointer;"
            class="hoverable"
            @click="removeAvatar"
          >
            Remove Planet Avatar
          </span>
        </div>

        <v-row no-gutters>
          <v-spacer />
          <v-btn
            depressed
            color="primary"
            :loading="loading"
            :disabled="
              !planet.description ||
              (planet.customName && planet.customName.length > 50)
            "
            @click="confirmEdits"
            >Done</v-btn
          >
        </v-row>

        <div style="height: 300px;" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import colors from 'vuetify/lib/util/colors'
import gql from 'graphql-tag'
import planetGql from '@/gql/planet'

export default {
  middleware({ store, redirect, params }) {
    // If the user is not a mod of this planet
    if (
      !store.state.currentUser ||
      (!store.state.currentUser.moderatedPlanets.find(
        (p) => p.name.toLowerCase() === params.planetname.toLowerCase()
      ) &&
        !store.state.currentUser.admin)
    ) {
      return redirect(`/p/${params.planetname}`)
    }
  },
  async fetch() {
    this.planet = (
      await this.$apollo.query({
        query: planetGql,
        variables: { planetName: this.$route.params.planetname }
      })
    ).data.planet
    this.themeColor = this.planet.themeColor
  },
  data() {
    return {
      planet: null,
      loading: false,
      swatches: [[]],
      themeColor: this.$primaryColor,
      addModeratorUsername: ''
    }
  },
  watch: {
    themeColor(val) {
      this.planet.themeColor = val.hex ? val.hex : val
    },
    'planet.themeColor'(val) {
      this.$vuetify.theme.themes.dark.primary = val
      this.$vuetify.theme.themes.light.primary = val
    }
  },
  mounted() {
    const keys = Object.keys(colors)
    const swatches = []
    keys.forEach((key) => {
      swatches.push(colors[key].lighten1)
    })
    const swatches2d = [[]]
    for (let i = 0; i < 5; i++) {
      swatches2d[i] = []
      for (let j = 0; j < swatches.length / 5; j++) {
        if (swatches[j * (swatches.length / 5 + 1) + i]) {
          swatches2d[i][j] = swatches[j * (swatches.length / 5 + 1) + i]
        }
      }
    }
    this.swatches = swatches2d
  },
  methods: {
    async addModerator() {
      if (!this.addModeratorUsername) return
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation($planetName: ID!, $username: String!) {
              addModerator(planetName: $planetName, username: $username)
            }
          `,
          variables: {
            planetName: this.planet.name,
            username: this.addModeratorUsername
          }
        })
        this.$store.dispatch('displaySnackbar', {
          message: `Added ${this.addModeratorUsername} as a moderator`,
          success: true
        })
        this.addModeratorUsername = ''
      } catch (e) {
        this.$store.dispatch('displaySnackbar', {
          message: e.message.split('GraphQL error: ')[1]
        })
      }
    },
    async removeAvatar() {
      this.planet.avatarImageUrl = null
      this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!) {
            removePlanetAvatar(planetName: $planetName)
          }
        `,
        variables: {
          planetName: this.planet.name
        }
      })
    },
    async removeBanner() {
      this.planet.bannerImageUrl = null
      this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!) {
            removePlanetBanner(planetName: $planetName)
          }
        `,
        variables: {
          planetName: this.planet.name
        }
      })
    },
    async confirmEdits() {
      this.loading = true

      await this.$apollo.mutate({
        mutation: gql`
          mutation(
            $planetName: ID!
            $allowTextPosts: Boolean!
            $allowLinkPosts: Boolean!
            $allowImagePosts: Boolean!
            $modPostsOnly: Boolean!
            $description: String!
            $customName: String
            $themeColor: String
          ) {
            setPlanetInfo(
              planetName: $planetName
              allowTextPosts: $allowTextPosts
              allowLinkPosts: $allowLinkPosts
              allowImagePosts: $allowImagePosts
              modPostsOnly: $modPostsOnly
              description: $description
              customName: $customName
              themeColor: $themeColor
            )
          }
        `,
        variables: {
          planetName: this.planet.name,
          ...this.planet
        }
      })

      this.loading = false
      this.$router.push(`/p/${this.planet.name}`)
    }
  }
}
</script>

<style scoped>
.darkcolorpicker >>> .v-color-picker__input > input {
  color: #ffffff !important;
}
.lightcolorpicker >>> .v-color-picker__input > input {
  color: #000000 !important;
}
.v-color-picker >>> .v-icon.theme--dark {
  color: #ffffff !important;
}
</style>
