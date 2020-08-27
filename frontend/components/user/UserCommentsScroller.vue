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
            :class="$vuetify.theme.dark ? 'post-dark' : 'post-light'"
            style="cursor: pointer;"
            @click="selectComment(item)"
          >
            <Comment
              :post="item.post"
              :comment="item"
              show-post-title
              hide-reply
            />
          </div>
        </DynamicScrollerItem>
      </template>
    </DynamicScroller>

    <div class="pt-3" :class="$device.isDesktop ? '' : 'px-3'">
      <v-progress-linear v-show="loading" indeterminate />

      <NoPostsMessage v-show="!loading && items.length === 0" />
    </div>
    <PostDialog v-if="selectedPost" v-model="dialog" :post="selectedPost" />
  </div>
</template>

<script>
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import PostDialog from '@/components/pages/PostDialog'
import { urlName } from '@/util/urlName'
import Comment from '@/components/comment/Comment'
import NoPostsMessage from '@/components/NoPostsMessage'

export default {
  name: 'PostsScroller',
  components: {
    NoPostsMessage,
    Comment,
    PostDialog,
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
      default: false
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
    selectComment(item) {
      this.$router.push(
        `/p/${item.post.planet.name}/comments/${item.post.id}/${urlName(
          item.post.title
        )}`
      )
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
