<template>
  <article>
    <div class="post">
      <div class="post__top">
        <nuxt-link :to="`/@${post.author.username}`">
          <img :src="post.author.profile.avatarURL" class="object-cover object-center w-8 h-8 bg-gray-200 rounded-full">
        </nuxt-link>
        <div class="flex flex-col flex-grow pr-12 ml-4">
          <div class="text-xs">
            <nuxt-link :to="`/@${post.author.username}`" class="font-semibold text-tertiary hover:underline">
              {{ post.author.username }}
            </nuxt-link>
            <span class="text-tertiary">in</span>
            <nuxt-link :to="`/+${post.planet.name}`" class="font-semibold text-accent hover:underline">
              +{{ post.planet.name }}
            </nuxt-link>
          </div>
          <div class="text-xs mt-0.5">
            <span class="text-tertiary">{{ post.timeSince }} &middot; </span>
            <nuxt-link :to="post.relativeURL" class="text-tertiary hover:underline">
              {{ post.commentCount }} comment{{ post.commentCount === 1 ? '' : 's' }}
            </nuxt-link>
          </div>
        </div>
        <!--        <div class="post__bookmark">
          <iconify-icon icon="bookmark-outline" class="w-4 h-4" />
        </div>-->
      </div>
      <div class="post__content">
        <div class="text-base font-semibold text-primary">
          {{ post.title }}
        </div>
        <div v-if="post.textContent" class="mt-1 text-sm text-primary line-clamp-3" v-html="post.textContent" />

        <img v-if="post.imageURLs && post.imageURLs.length > 0" :src="post.imageURLs[0]" class="object-contain object-center w-full h-32 max-w-full mt-4 transition duration-100 ease-in-out bg-gray-100 border border-gray-200 hover:bg-gray-200 rounded-2xl" @click.stop.prevent="$store.dispatch('openImageDialog', post.imageURLs)">

        <!--        <a
          v-else-if="post.embed && post.embed.links && post.embed.links.thumbnail && post.embed.links.thumbnail.length > 0"
          :href="post.linkURL"
          target="_blank"
          rel="noreferrer noopener nofollow"
          class="block mt-4 transition duration-100 ease-in-out bg-gray-100 border border-gray-200 rounded-2xl hover:bg-gray-200"
        >
          <img :src="post.embed.links.thumbnail[0].href" class="object-contain object-center w-full h-auto max-w-full bg-white rounded-t-2xl" style="max-height: 19.8125rem">
          <div class="px-4 py-3 cursor-pointer rounded-b-xl">
            <div class="text-sm font-semibold text-secondary">
              {{ post.embed.meta.title }}
            </div>

            <div class="text-xs text-tertiary font-medium line-clamp-2 mt-0.5">
              {{ post.embed.meta.description }}
            </div>

            <div class="mt-1 text-xs font-semibold text-tertiary">
              {{ post.domain }}
            </div>
          </div>
        </a>-->
        <a
          v-else-if="post.embed && post.embed.links && post.embed.links.thumbnail && post.embed.links.thumbnail.length > 0"
          :href="post.linkURL"
          target="_blank"
          rel="noreferrer noopener nofollow"
          class="flex flex-row items-start mt-4 transition duration-100 ease-in-out bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200"
        >
          <img :src="post.embed.links.thumbnail[0].href" class="object-cover object-center w-32 h-32 bg-white rounded-l-lg">
          <div class="flex flex-col h-32 px-6 py-3 cursor-pointer">
            <div class="text-sm font-semibold text-secondary line-clamp-2">
              {{ post.embed.meta.title }}
            </div>

            <div class="mt-1 text-xs font-medium text-tertiary line-clamp-2">
              {{ post.embed.meta.description }}
            </div>

            <div class="flex flex-row items-start mt-auto">
              <img v-if="post.embed.links.icon && post.embed.links.icon.length > 0" :src="post.embed.links.icon[0].href" class="object-contain w-4 h-4 mr-3 rounded-sm">
              <div class="text-xs font-semibold text-tertiary">
                {{ post.domain }}
              </div>
            </div>

          </div>
        </a>
      </div>
      <div class="post__bottom">
        <div class="post__chip">
          <!--          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>-->
          <svg class="w-4 h-4" fill="currentColor" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m17.415 15.791s0-4.0376 0.0014-5.4164c0-4.3317-5.4164-7.5816-5.4164-7.5816s-5.4164 3.2499-5.4157 7.5823c0 3.2385 0.036062 5.4327 0.036062 5.4327s-3.2859 2.1489-3.2859 5.3988h17.331c0-3.2499-3.2506-5.4157-3.2506-5.4157zm-7.4154-5.2913c-9.404e-4 -1.1048 0.89494-2.0007 1.9997-1.9997 1.7821-2.829e-4 2.6744 2.1542 1.4144 3.4141-1.26 1.26-3.4144 0.36762-3.4141-1.4144z" />
          </svg>
          <span class="ml-2 text-xs font-semibold">{{ post.rocketCount }}</span>
        </div>

        <div class="ml-4 post__chip">
          <iconify-icon icon="comment" class="w-4 h-4" />
          <span class="ml-2 text-xs font-semibold">{{ post.commentCount }}</span>
        </div>

        <div class="inline-flex flex-row items-center px-3 py-1 ml-auto transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200">
          <iconify-icon icon="share" class="w-4 h-4 text-green-500" />
          <!--          <span class="ml-4 text-xs font-semibold text-green-500">Share</span>-->
        </div>

        <div class="inline-flex flex-row items-center px-3 py-1 ml-4 transition duration-150 ease-in-out rounded-full text-tertiary hover:bg-gray-200">
          <iconify-icon icon="bookmark-outline" class="w-4 h-4" />
          <!--          <span class="ml-4 text-xs font-semibold text-green-500">Share</span>-->
        </div>

        <!--        <div class="post__options">
          <iconify-icon icon="dots" class="w-4 h-4" />
        </div>-->
      </div>
    </div>
  </article>
</template>

<script>
import IconifyIcon from '@iconify/vue'
import dots from '@iconify/icons-heroicons-solid/dots-horizontal'
import comment from '@iconify/icons-heroicons-solid/annotation'
import share from '@iconify/icons-heroicons-solid/share'
import bookmarkOutline from '@iconify/icons-fa-regular/bookmark'
import bookmark from '@iconify/icons-fa-solid/bookmark'

IconifyIcon.addIcon('dots', dots)
IconifyIcon.addIcon('comment', comment)
IconifyIcon.addIcon('share', share)
IconifyIcon.addIcon('bookmark-outline', bookmarkOutline)
IconifyIcon.addIcon('bookmark', bookmark)

export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.post {
  @apply bg-white border border-gray-100 shadow sm:rounded-xl pb-5 cursor-pointer;

  &__top {
    @apply pt-5 pl-5 pr-5 sm:pt-6 sm:pl-8 sm:pr-20 flex flex-row;
  }

  &__content {
    @apply px-5 sm:pl-20 sm:pr-20 mt-3;
  }

  &__bottom {
    @apply sm:mt-4 mt-4 sm:px-20 px-5 flex flex-row items-center;
  }

  &__chip {
    @apply px-3 py-1 text-gray-500 inline-flex flex-row items-center rounded-full border border-gray-200 hover:bg-gray-200 transition duration-150 ease-in-out;
  }

  &__bookmark {
    @apply ml-auto px-3 py-1 text-gray-500 inline-flex flex-row items-center rounded-full hover:bg-gray-200 transition duration-150 ease-in-out opacity-0 transition duration-150 ease-in-out;
  }

  &__options {
    @apply cursor-pointer ml-auto px-3 py-1 text-gray-500 inline-flex flex-row items-center rounded-full hover:bg-gray-200 transition duration-150 ease-in-out opacity-0;
  }
}

.post:hover > .post__top > .post__bookmark {
  @apply opacity-100;
}

.post:hover > .post__bottom > .post__options {
  @apply opacity-100;
}
</style>
