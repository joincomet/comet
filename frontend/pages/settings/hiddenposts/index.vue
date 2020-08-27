<template>
  <v-row>
    <v-col :cols="$device.isDesktop ? 6 : 12">
      <div
        v-for="(post, index) in hiddenPosts"
        :key="post.id"
        :style="{
          'border-style': 'solid',
          'border-bottom-style':
            index === hiddenPosts.length - 1 ? 'solid' : 'none',
          'border-top-style':
            index === 0 && !$device.isDesktop ? 'none' : 'solid',
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
            $device.isDesktop && index === hiddenPosts.length - 1
              ? '10px'
              : '0',
          'border-bottom-right-radius':
            $device.isDesktop && index === hiddenPosts.length - 1 ? '10px' : '0'
        }"
        class="pa-3 flex-grow-1"
      >
        <Post :post="post" />
      </div>
      <div v-show="hiddenPosts.length === 0" class="subtitle-2">
        No hidden posts
      </div>
    </v-col>
  </v-row>
</template>

<script>
import hiddenPostsGql from '@/gql/hiddenPosts.graphql'
import Post from '@/components/post/Post'

export default {
  components: { Post },
  middleware: 'authenticated',
  data() {
    return {
      hiddenPosts: []
    }
  },
  apollo: {
    hiddenPosts: {
      query: hiddenPostsGql,
      fetchPolicy: 'cache-and-network'
    }
  }
}
</script>

<style scoped></style>
