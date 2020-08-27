<template>
  <div>
    <div v-if="$device.isDesktop" style="position: relative;">
      <div
        :style="
          planet.bannerImageUrl
            ? `height: 208px; background-image: url(${planet.bannerImageUrl}); background-size: cover; background-position: center; background-repeat: no-repeat`
            : 'height: 80px; background-color: var(--v-primary-base)'
        "
        style="display: flex;"
        :class="isMod ? 'editbanner' : ''"
        @click="openBannerInput"
      >
        <v-file-input
          v-if="isMod"
          ref="bannerinput"
          v-model="bannerFile"
          type="file"
          style="display: none;"
        />
        <v-icon
          size="52"
          class="editbannericon"
          dark
          style="margin: auto auto;"
          >{{ $vuetify.icons.values.mdiPencil }}</v-icon
        >
      </div>
      <div
        :style="`min-height: 78px; display: flex; flex-direction: row; align-items: center; ${
          $vuetify.theme.dark
            ? 'background-color: #35363A'
            : 'background-color: #F8F9FA; border-bottom: 1px solid rgba(0, 0, 0, 0.12)'
        }`"
      >
        <div style="padding-left: 120px; margin-bottom: 2px;">
          <v-row no-gutters align="center" class="text--primary">
            <span style="font-size: 2rem; font-weight: 500;">
              {{ planet.customName ? planet.customName : planet.name }}
            </span>
            <PlanetJoinButton :planet="planet" class="ml-2" />
          </v-row>
          <div
            style="font-size: 1rem; font-weight: 400;"
            class="text--secondary"
          >
            p/{{ planet.name }}
          </div>
        </div>
      </div>
      <div
        :style="'position: absolute; left: 24px; bottom: 12px; border: 4px solid white; border-radius: 50%; background-size: cover'"
      >
        <v-avatar
          height="72"
          width="72"
          color="primary"
          style="position: relative;"
          :class="isMod ? 'editplanetavatar' : ''"
          @click="openAvatarInput"
        >
          <v-file-input
            v-if="isMod"
            ref="avatarinput"
            v-model="avatarFile"
            type="file"
            style="display: none;"
          />
          <v-icon
            size="50"
            style="position: absolute; z-index: 10;"
            class="editplaneticon"
            dark
            >{{ $vuetify.icons.values.mdiPencil }}</v-icon
          >
          <img
            v-if="planet.avatarImageUrl"
            loading="lazy"
            :src="planet.avatarImageUrl"
          />
          <v-icon v-else color="white">{{
            $vuetify.icons.values.mdiEarth
          }}</v-icon>
        </v-avatar>
      </div>
    </div>

    <div v-else style="position: relative;">
      <div
        :style="`display: flex; height: 64px; background-image: url(${
          planet && planet.bannerImageUrl ? planet.bannerImageUrl : ''
        }); background-size: cover; background-position: center; background-repeat: no-repeat; background-color: var(--v-primary-base)`"
        :class="isMod ? 'editbanner' : ''"
        @click="openBannerInput"
      >
        <v-file-input
          v-if="isMod"
          ref="bannerinput"
          v-model="bannerFile"
          type="file"
          style="display: none;"
        />
        <v-icon
          size="52"
          class="editbannericon"
          dark
          style="margin: auto auto;"
          >{{ $vuetify.icons.values.mdiPencil }}</v-icon
        >
      </div>
      <div
        style="padding-top: 48px; padding-bottom: 12px; text-align: center;"
        :style="
          $vuetify.theme.dark
            ? 'background-color: #35363A'
            : 'background-color: #F8F9FA; border-bottom: 1px solid rgba(0, 0, 0, 0.12)'
        "
      >
        <div style="font-size: 1.43rem; font-weight: 500;">
          {{ planet.customName || planet.name }}
        </div>
        <div
          style="font-size: 1rem; font-weight: 400;"
          class="text--secondary mt-1"
        >
          p/{{ planet.name }}
        </div>
        <div
          style="font-size: 1rem; font-weight: 400;"
          class="text--secondary mt-3"
        >
          {{ planet.description }}
        </div>
        <v-row no-gutters align="center" justify="center" class="px-3 mt-3">
          <MobilePlanetJoinButton :planet="planet" />
        </v-row>

        <v-card-actions class="pb-0 pt-3" style="justify-content: center;">
          <v-chip outlined nuxt :to="`/g/${planet.galaxy.name}`">
            <v-avatar left>
              <v-icon>{{ $vuetify.icons.values[planet.galaxy.icon] }}</v-icon>
            </v-avatar>
            {{ planet.galaxy.fullName }}
          </v-chip>
          <v-chip outlined class="ml-3">
            <v-icon left>{{
              $vuetify.icons.values.mdiAccountMultipleOutline
            }}</v-icon>
            {{ planet.userCount }} User{{ planet.userCount === 1 ? '' : 's' }}
          </v-chip>
        </v-card-actions>
      </div>
      <div
        :style="`position: absolute; left: 50%; border: 4px solid white; border-radius: 50%; background-size: cover; margin-left: -36px; top: 28px;`"
      >
        <v-avatar
          height="72"
          width="72"
          color="primary"
          style="position: relative;"
          :class="isMod ? 'editplanetavatar' : ''"
          @click="openAvatarInput"
        >
          <v-file-input
            v-if="isMod"
            ref="avatarinput"
            v-model="avatarFile"
            type="file"
            style="display: none;"
          />
          <v-icon
            size="50"
            style="position: absolute; z-index: 10;"
            class="editplaneticon"
            dark
            >{{ $vuetify.icons.values.mdiPencil }}</v-icon
          >
          <img
            v-if="planet.avatarImageUrl"
            loading="lazy"
            :src="planet.avatarImageUrl"
            style="object-fit: cover;"
          />
          <v-icon v-else color="white">{{
            $vuetify.icons.values.mdiEarth
          }}</v-icon>
        </v-avatar>
      </div>
    </div>

    <v-container class="pt-0">
      <v-row justify="center">
        <v-col :class="$device.isDesktop ? '' : 'px-0'">
          <PlanetBar :planet="planet" />
          <PostsScroller
            v-model="dialog"
            :loading="$fetchState.pending"
            :items="feed"
            :selected-post="selectedPost"
            @togglehidden="toggleHidden"
            @toggleblock="toggleBlock"
            @infinite="showMore"
          />
        </v-col>
        <v-col v-if="$device.isDesktop" cols="3" class="pl-0">
          <PlanetInfoCard
            :planet="planet"
            show-edit-btn
            @doneediting="refetchPlanet"
          />
          <PlanetModsCard
            v-if="planet.moderators.length > 0"
            :planet="planet"
            class="mt-3"
          />
          <div class="sticky">
            <InfoLinks class="mt-3" />
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import gql from 'graphql-tag'
import postDialogMixin from '@/mixins/postDialogMixin'
import PostsScroller from '@/components/post/PostsScroller'
import PlanetInfoCard from '@/components/planet/PlanetInfoCard'
import planetGql from '@/gql/planet.graphql'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'
import PlanetModsCard from '@/components/planet/PlanetModsCard'
import { planetHead } from '@/util/planetHead'
import { postHead } from '@/util/postHead'
import InfoLinks from '@/components/InfoLinks'
import PlanetBar from '@/components/bars/PlanetBar'
import MobilePlanetJoinButton from '@/components/planet/MobilePlanetJoinButton'
import feedGql from '@/gql/feed'
import { feedVars } from '@/util/feedVars'

export default {
  name: 'Planet',
  scrollToTop: false,
  components: {
    MobilePlanetJoinButton,
    PlanetBar,
    InfoLinks,
    PlanetModsCard,
    PlanetJoinButton,
    PlanetInfoCard,
    PostsScroller
  },
  mixins: [postDialogMixin],
  async fetch() {
    this.feed = (
      await this.$apollo.query({
        query: feedGql,
        variables: feedVars(this.$route),
        fetchPolicy: 'network-only'
      })
    ).data.feed
  },
  async asyncData({ app, params }) {
    const planet = (
      await app.apolloProvider.defaultClient.query({
        query: planetGql,
        variables: { planetName: params.planetname }
      })
    ).data.planet
    return { planet }
  },
  data() {
    return {
      planet: null,
      bannerFile: null,
      avatarFile: null
    }
  },
  computed: {
    isMod() {
      return (
        this.$store.state.currentUser &&
        (!!this.$store.state.currentUser.moderatedPlanets.find(
          (p) => p.name === this.planet.name
        ) ||
          this.$store.state.currentUser.admin)
      )
    }
  },
  watch: {
    async avatarFile(val) {
      if (!val) return
      if (val.size > 4 * 1024 * 1024) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Too big - avatar file must be less than 4MB'
        })
        this.avatarFile = null
        return
      }
      await this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!, $file: Upload!) {
            uploadPlanetAvatarImage(planetName: $planetName, file: $file)
          }
        `,
        variables: {
          planetName: this.$route.params.planetname,
          file: this.avatarFile
        }
      })
      this.refetchPlanet()
    },
    async bannerFile(val) {
      if (!val) return
      if (val.size > 4 * 1024 * 1024) {
        this.$store.dispatch('displaySnackbar', {
          message: 'Too big - banner file must be less than 4MB'
        })
        this.bannerFile = null
        return
      }
      await this.$apollo.mutate({
        mutation: gql`
          mutation($planetName: ID!, $file: Upload!) {
            uploadPlanetBannerImage(planetName: $planetName, file: $file)
          }
        `,
        variables: {
          planetName: this.$route.params.planetname,
          file: this.bannerFile
        }
      })
      this.refetchPlanet()
    }
  },
  activated() {
    // Call fetch again if last fetch more than 30 sec ago
    if (this.$fetchState.timestamp <= Date.now() - 30000) {
      this.$fetch()
    }
  },
  mounted() {
    const item = localStorage.getItem('recentPlanets')
    let recentPlanets = item ? JSON.parse(item) : []
    recentPlanets = recentPlanets.filter((p) => p !== this.planet.name)
    recentPlanets.unshift(this.planet.name)
    recentPlanets = recentPlanets.slice(0, 5)
    localStorage.setItem('recentPlanets', JSON.stringify(recentPlanets))

    this.$store.dispatch('updateRecentPlanets', recentPlanets)

    this.$nextTick(() => {
      this.$vuetify.theme.themes.dark.primary = this.planet.themeColor
        ? this.planet.themeColor
        : this.$primaryColor
      this.$vuetify.theme.themes.light.primary = this.planet.themeColor
        ? this.planet.themeColor
        : this.$primaryColor
    })
  },
  methods: {
    openAvatarInput() {
      if (!this.isMod) return
      this.$refs.avatarinput.$refs.input.click()
    },
    openBannerInput() {
      if (!this.isMod) return
      this.$refs.bannerinput.$refs.input.click()
    },
    async refetchPlanet() {
      this.planet = (
        await this.$apollo.query({
          query: planetGql,
          variables: {
            planetName: this.$route.params.planetname
          },
          fetchPolicy: 'network-only'
        })
      ).data.planet
    }
  },
  head() {
    if (this.selectedPost && this.dialog) return postHead(this.selectedPost)
    else return planetHead(this.planet)
  }
}
</script>

<style scoped>
.editplanetavatar:hover {
  opacity: 0.75;
  cursor: pointer;
}

.editplanetavatar:hover .editplaneticon {
  display: initial;
}

.editplaneticon {
  display: none;
}

.editbanner:hover {
  opacity: 0.75;
  cursor: pointer;
}

.editbanner:hover .editbannericon {
  display: initial;
}

.editbannericon {
  display: none;
}
</style>
