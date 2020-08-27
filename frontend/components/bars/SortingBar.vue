<template>
  <div
    ref="barcontainer"
    style="position: sticky; top: -1px; z-index: 20;"
    class="barcontainer"
    :class="$device.isDesktop ? 'desktop' : 'mobile'"
  >
    <v-app-bar
      class="mb-3"
      style="border-width: 1px; border-style: solid; z-index: 20;"
      flat
      dense
      :style="{
        'border-color': $vuetify.theme.dark
          ? 'rgba(255, 255, 255, 0.12)'
          : 'rgba(0, 0, 0, 0.12)',
        'border-left-style': $device.isDesktop ? 'solid' : 'none',
        'border-right-style': $device.isDesktop ? 'solid' : 'none'
      }"
    >
      <slot />
      <v-spacer />
      <SortMenu />
      <v-tooltip bottom transition="fade-transition">
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            height="34"
            width="34"
            class="ml-2"
            @click="toggleExpand"
            v-on="on"
          >
            <v-icon size="20">{{
              $route.query.expanded === 'yes'
                ? $vuetify.icons.values.mdiArrowCollapse
                : $vuetify.icons.values.mdiArrowExpand
            }}</v-icon>
          </v-btn>
        </template>
        <span>{{
          $route.query.expanded === 'yes'
            ? 'Collapse Posts'
            : 'Expand Posts (Experimental)'
        }}</span>
      </v-tooltip>
    </v-app-bar>
  </div>
</template>

<script>
import SortMenu from '@/components/buttons/home_sort/SortMenu'
export default {
  name: 'SortingBar',
  components: { SortMenu },
  mounted() {
    const stickyElm = this.$refs.barcontainer
    const observer = new IntersectionObserver(
      ([e]) => e.target.classList.toggle('isSticky', e.intersectionRatio < 1),
      { threshold: [1] }
    )
    observer.observe(stickyElm)
  },
  methods: {
    toggleExpand() {
      this.$emit('selected')
      if (this.$route.query.expanded === 'yes') {
        const query = Object.assign({}, this.$route.query)
        delete query.expanded
        this.$router.push({ query })
      } else {
        this.$router.push({ query: { ...this.$route.query, expanded: 'yes' } })
      }
    }
  }
}
</script>

<style scoped>
/*>>> .v-toolbar__content {
  padding-left: 0;
  padding-right: 0;
}*/

.barcontainer.desktop:not(.isSticky) > .v-app-bar {
  border-radius: 10px;
  transition: border-radius ease 0.25s;
}

.barcontainer.desktop.isSticky > .v-app-bar {
  border-radius: 0;
  transition: border-radius ease 0.25s;
}

.barcontainer {
  padding-top: 48px;
  margin-top: -48px;
}
</style>
