<template>
  <div>
    <DynamicScroller
      page-mode
      :items="items"
      :min-item-size="54"
      :buffer="3000"
    >
      <template v-slot="{ item, index, active }">
        <DynamicScrollerItem
          :item="item"
          :active="active"
          :index="index"
          :size-dependencies="[item.title, item.textContent]"
        >
          <div
            :style="{
              'margin-bottom': index >= items.length - 1 ? '0' : '-1px',
              'border-style': 'solid',
              'border-left-style': $device.isDesktop ? 'solid' : 'none',
              'border-right-style': $device.isDesktop ? 'solid' : 'none',
              'border-width': '1px',
              'border-color': $vuetify.theme.dark
                ? 'rgba(255, 255, 255, 0.12)'
                : 'rgba(0, 0, 0, 0.12)',
              'border-top-left-radius':
                $device.isDesktop && index === 0 ? '10px' : '0',
              'border-top-right-radius':
                $device.isDesktop && index === 0 ? '10px' : '0',
              'border-bottom-left-radius':
                $device.isDesktop && index === items.length - 1 ? '10px' : '0',
              'border-bottom-right-radius':
                $device.isDesktop && index === items.length - 1 ? '10px' : '0',
              'background-color': $vuetify.theme.dark ? '#202124' : '#F8F9FA'
            }"
            class="pa-3"
            :class="$vuetify.theme.dark ? 'post-dark' : 'post-light'"
            style="cursor: pointer;"
            v-on="
              !dialog
                ? {
                    click: () =>
                      $router.push(
                        `/p/${item.planet.name}/comments/${item.id}/${urlName(
                          item
                        )}`
                      )
                  }
                : {}
            "
          >
            <Post
              v-intersect.quiet.once="intersect(index)"
              :post="item"
              :index="index"
              :active="active"
              @togglehidden="$emit('togglehidden')"
              @toggleblock="$emit('toggleblock')"
            />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <div class="pt-3" :class="$device.isDesktop ? '' : 'px-3'">
      <v-progress-linear v-show="loading" indeterminate />

      <div
        v-if="
          $route.name === 'home-sort-time' && !loading && items.length === 0
        "
        :style="`display: flex; flex-direction: column; align-items: center; text-align: center`"
        class="text--secondary"
      >
        <v-icon class="text--secondary" size="36">{{
          $vuetify.icons.values.mdiEmoticonFrown
        }}</v-icon>
        <span class="mt-2" style="font-size: 1.5rem;"
          >You have not joined any Planets</span
        >
        <nuxt-link to="/planets/explore" class="mt-2 primary--text"
          >Discover Planets</nuxt-link
        >
        <nuxt-link to="/universe" class="mt-2 primary--text"
          >View Posts from All Planets</nuxt-link
        >
      </div>

      <NoPostsMessage v-else-if="!loading && items.length === 0" />
    </div>
    <PostDialog v-model="dialog" :post="selectedPost" />
  </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import Post from '@/components/post/Post'
import PostDialog from '@/components/pages/PostDialog'
import { urlName } from '@/util/urlName'
import NoPostsMessage from '@/components/NoPostsMessage'

export default {
  name: 'PostsScroller',
  components: {
    NoPostsMessage,
    PostDialog,
    Post,
    DynamicScroller,
    DynamicScrollerItem
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      required: true
    },
    value: {
      type: Boolean,
      default: false
    },
    selectedPost: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      dialog: this.value
    }
  },
  watch: {
    dialog(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.dialog = val
    }
  },
  methods: {
    intersect(index) {
      if (index === this.items.length - 10) {
        this.$emit('infinite')
      }
    },
    urlName(item) {
      return urlName(item.title)
    }
  }
}
</script>

<style scoped>
.hover .post-dark {
  border-color: rgba(255, 255, 255, 0.36) !important;
}

.hover .post-light {
  border-color: rgba(0, 0, 0, 0.36) !important;
}

>>> .vue-recycle-scroller__item-view.hover {
  z-index: 1 !important;
}

>>> .vue-recycle-scroller__item-view {
  z-index: 0;
}
</style>
