<template>
  <v-card
    flat
    :outlined="!$vuetify.theme.dark && !isHover"
    :width="isHover ? 400 : undefined"
    :style="{
      'border-width': '1px',
      'border-bottom-right-radius': showViewPlanetBtn ? '0' : '10px',
      'border-bottom-left-radius': showViewPlanetBtn ? '0' : '10px'
    }"
    :tile="tile"
  >
    <img
      v-if="planet.bannerImageUrl"
      alt="Planet cover image"
      :src="planet.bannerImageUrl"
      style="height: 40px; width: 100%; object-fit: cover;"
      loading="lazy"
      :style="`background-color: ${
        planet.themeColor ? planet.themeColor : 'var(--v-primary-base)'
      }`"
    />
    <div
      v-else
      style="height: 40px; width: 100%;"
      :style="`background-color: ${
        planet.themeColor ? planet.themeColor : 'var(--v-primary-base)'
      }`"
    />
    <v-list-item>
      <v-list-item-avatar size="48" style="align-self: center;">
        <nuxt-link
          style="height: 48px; min-width: 48px; width: 48px;"
          :to="`/p/${planet.name}`"
        >
          <img
            v-if="planet.avatarImageUrl"
            loading="lazy"
            :src="planet.avatarImageUrl"
            style="object-fit: cover;"
          />
          <v-icon v-else>{{ $vuetify.icons.values.mdiEarth }}</v-icon>
        </nuxt-link>
      </v-list-item-avatar>

      <v-list-item-content style="align-self: start;">
        <v-list-item-title
          style="font-size: 1.43rem; font-weight: 500;"
          class="mb-0"
        >
          <nuxt-link :to="`/p/${planet.name}`">{{
            planet.customName ? planet.customName : planet.name
          }}</nuxt-link>
        </v-list-item-title>
        <v-list-item-subtitle>p/{{ planet.name }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-actions>
      <v-chip outlined>
        <v-icon left>{{
          $vuetify.icons.values.mdiAccountMultipleOutline
        }}</v-icon>
        {{ planet.userCount }} User{{ planet.userCount === 1 ? '' : 's' }}
      </v-chip>

      <v-spacer />

      <PlanetJoinButton :planet="planet" />
    </v-card-actions>

    <v-card-actions class="pt-0">
      <v-chip outlined small class="mr-2" nuxt :to="`/g/${planet.galaxy.name}`">
        <v-icon small class="mr-2">{{
          $vuetify.icons.values[planet.galaxy.icon]
        }}</v-icon>
        {{ planet.galaxy.fullName }}
      </v-chip>

      <v-spacer />

      <span class="text--secondary">{{ createdDate }}</span>
    </v-card-actions>

    <v-card-actions
      v-if="
        showEditBtn &&
        $store.state.currentUser &&
        $route.params.planetname &&
        ($store.state.currentUser.moderatedPlanets
          .map((p) => p.name)
          .includes($route.params.planetname) ||
          $store.state.currentUser.admin)
      "
      class="pb-3 pt-1"
    >
      <v-btn
        depressed
        class="flex-grow-1"
        nuxt
        :to="`/p/${planet.name}/edit`"
        :style="$vuetify.theme.dark ? '' : 'background-color: #DEE1E6'"
      >
        Edit Planet
        <v-icon size="20" class="ml-2">{{
          $vuetify.icons.values.mdiPencil
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-actions v-if="showVisitBtn" class="pb-3 pt-1">
      <v-btn
        depressed
        outlined
        rounded
        class="flex-grow-1"
        nuxt
        :to="`/p/${planet.name}`"
        :style="{
          'background-color': $vuetify.theme.dark
            ? ''
            : 'background-color: #DEE1E6',
          'border-color': $vuetify.theme.dark
            ? 'rgba(255, 255, 255, 0.12)'
            : 'rgba(0, 0, 0, 0.12)'
        }"
      >
        Visit
        <v-icon size="20" class="ml-2">{{
          $vuetify.icons.values.mdiArrowRightThinCircleOutline
        }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-text
      v-if="!hideDescription"
      class="text--primary py-3 description"
      style="
        overflow: auto;
        text-overflow: initial;
        white-space: pre-line;
        word-break: break-word;
      "
    >
      {{ planet.description }}
    </v-card-text>

    <div v-if="showViewPlanetBtn && $route.params.planetname !== planet.name">
      <v-list-item nuxt :to="`/p/${planet.name}`">
        <v-list-item-icon
          ><v-icon>{{
            $vuetify.icons.values.mdiOpenInNew
          }}</v-icon></v-list-item-icon
        >
        <v-list-item-content>
          <v-list-item-title>View planet</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </div>
  </v-card>
</template>

<script>
import { format } from 'date-fns'
import PlanetJoinButton from '@/components/planet/PlanetJoinButton'

export default {
  name: 'PlanetInfoCard',
  components: {
    PlanetJoinButton
  },
  props: {
    planet: {
      type: Object,
      required: true
    },
    hideDescription: {
      type: Boolean,
      default: false
    },
    isHover: {
      type: Boolean,
      default: false
    },
    showViewPlanetBtn: {
      type: Boolean,
      default: false
    },
    showVisitBtn: {
      type: Boolean,
      default: false
    },
    showEditBtn: {
      type: Boolean,
      default: false
    },
    tile: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    createdDate() {
      return 'Created ' + format(new Date(this.planet.createdAt), 'MMM d, yyyy')
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

.description:first-line {
  line-height: 0;
}
</style>
