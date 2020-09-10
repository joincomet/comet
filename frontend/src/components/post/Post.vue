<template>
  <div>
    <div class="overflow-hidden cursor-pointer" @click="$router.push(post.relativeUrl)">
      <ImageOverlay v-if="post.type === 'IMAGE' && post.link" :post="post">
        <template v-slot:activator="{ on }">
          <img
            class="w-full h-24 object-cover"
            :src="post.link"
            :alt="post.title"
            @click.stop.prevent="on"
          >
        </template>
      </ImageOverlay>
      <div v-else class="w-full h-24 bg-gray-200 dark:bg-gray-800 flex">
        <div class="m-auto text-gray-400 dark:text-gray-700">
          <Icon v-if="post.type === 'TEXT'" size="48" name="text" />
          <Icon v-else size="48" name="link" />
        </div>
      </div>
      <div class="flex px-3 pt-3">
        <div class="w-11/12 pr-3 flex flex-col">
          <div class="pb-3">
            <nuxt-link :to="post.relativeUrl" class="font-medium text-base">
              {{ post.title }}
            </nuxt-link>
            <div
              v-if="post.textContent"
              class="text-secondary text-sm"
              style="max-height: 2.6rem; line-height: 1.3rem; overflow: hidden"
              v-html="post.textContent"
            />
          </div>
        </div>
        <div class="w-1/12 items-end flex flex-col">
          <div class="flex flex-col flex-grow items-center">
            <Icon
              class="text-indigo-600"
              name="comment"
            />
            <span
              class="text-xs pt-1 text-indigo-600"
            >
              {{
                post.commentCount
              }}</span>
            <Icon
              class="pt-2 text-red-500"
              name="rocket"
            />

            <span
              class="text-xs pt-1 text-red-500 mb-auto"
            >
              {{
                post.endorsementCount
              }}
            </span>
          </div>
        </div>
      </div>

      <PostAuthor :post="post" class="text-sm text-secondary p-3" />
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import ImageOverlay from '@/components/dialog/image/ImageDialog'
import PostAuthor from '@/components/post/PostAuthor'

export default {
  name: 'Post',
  components: { PostAuthor, ImageOverlay, Icon },
  props: {
    post: {
      type: Object,
      required: true
    },
    alt: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      moreOptions: false
    }
  },
  computed: {
    isMod () {
      return (
        this.$store.state.currentUser &&
        (this.$store.state.currentUser.admin ||
          !!this.$store.state.currentUser.moderatedPlanets.find(
            p => p.name === this.post.planet.name
          ))
      )
    }
  }
}
</script>

<style scoped></style>
