<template>
  <article>
    <div class="post">
      <div class="post__top">
        <nuxt-link :to="`/@${post.author.username}`">
          <img :src="post.author.profile.avatarURL" class="object-cover object-center w-8 h-8 rounded-full bg-gray-200">
        </nuxt-link>
        <div class="flex flex-col ml-4 pr-12 flex-grow">
          <div class="text-xs">
            <nuxt-link :to="`/@${post.author.username}`" class="text-tertiary font-semibold hover:underline">
              {{ post.author.username }}
            </nuxt-link>
            <span class="text-tertiary">in</span>
            <nuxt-link :to="`/+${post.planet.name}`" class="text-accent font-semibold hover:underline">
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
        <div class="post__bookmark">
          <svg
            aria-hidden="true"
            focusable="false"
            data-prefix="far"
            data-icon="bookmark"
            class="w-5 h-5"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 384 512"
          >
            <path fill="currentColor" d="M336 0H48C21.49 0 0 21.49 0 48v464l192-112 192 112V48c0-26.51-21.49-48-48-48zm0 428.43l-144-84-144 84V54a6 6 0 0 1 6-6h276c3.314 0 6 2.683 6 5.996V428.43z" />
          </svg>
        </div>
      </div>
      <div class="post__content">
        <div class="text-base text-primary font-semibold mt-4">
          {{ post.title }}
        </div>
        <div v-if="post.textContent" class="text-primary line-clamp-3 text-sm mt-1" v-html="post.textContent" />

        <img v-if="post.imageURLs && post.imageURLs.length > 0" :src="post.imageURLs[0]" class="border border-gray-200 bg-gray-100 hover:bg-gray-200 transition duration-100 ease-in-out mt-4 object-contain object-center max-w-full w-full h-auto rounded-2xl" style="max-height: 19.8125rem" @click.stop.prevent="$store.dispatch('openImageDialog', post.imageURLs)">

        <a
          v-else-if="post.embed && post.embed.links && post.embed.links.thumbnail && post.embed.links.thumbnail.length > 0"
          :href="post.linkURL"
          target="_blank"
          rel="noreferrer noopener nofollow"
          class="rounded-2xl mt-4 border border-gray-200 bg-gray-100 hover:bg-gray-200 transition duration-100 ease-in-out block"
        >
          <img :src="post.embed.links.thumbnail[0].href" class="bg-white object-contain object-center max-w-full w-full h-auto rounded-t-xl" style="max-height: 19.8125rem">
          <div class="rounded-b-xl px-4 py-3 cursor-pointer">
            <div class="text-sm text-secondary font-semibold">
              {{ post.embed.meta.title }}
            </div>

            <div class="text-xs text-tertiary font-medium line-clamp-2 mt-0.5">
              {{ post.embed.meta.description }}
            </div>

            <div class="text-xs mt-1 font-semibold text-tertiary">
              {{ post.domain }}
            </div>
          </div>
        </a>
      </div>
      <div class="post__bottom">
        <div class="post__chip">
          <!--          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd" />
          </svg>-->
          <svg class="w-5 h-5" fill="currentColor" version="1.1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="m17.415 15.791s0-4.0376 0.0014-5.4164c0-4.3317-5.4164-7.5816-5.4164-7.5816s-5.4164 3.2499-5.4157 7.5823c0 3.2385 0.036062 5.4327 0.036062 5.4327s-3.2859 2.1489-3.2859 5.3988h17.331c0-3.2499-3.2506-5.4157-3.2506-5.4157zm-7.4154-5.2913c-9.404e-4 -1.1048 0.89494-2.0007 1.9997-1.9997 1.7821-2.829e-4 2.6744 2.1542 1.4144 3.4141-1.26 1.26-3.4144 0.36762-3.4141-1.4144z" />
          </svg>
          <span class="font-medium ml-2 text-sm">{{ post.rocketCount }}</span>
        </div>

        <div class="ml-4 post__chip">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clip-rule="evenodd" />
          </svg>
          <span class="font-medium ml-2 text-sm">{{ post.commentCount }}</span>
        </div>

        <div class="ml-4 px-3 py-1 text-gray-500 inline-flex flex-row items-center rounded-full hover:bg-gray-200 transition duration-150 ease-in-out">
          <svg class="w-5 h-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
          </svg>
          <span class="ml-4 text-sm font-medium text-green-500">Share</span>
        </div>

        <div class="post__options">
          <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
          </svg>
        </div>
      </div>
    </div>
  </article>
</template>

<script>
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
  @apply bg-white border border-gray-200 sm:rounded-2xl shadow-sm sm:shadow sm:shadow-none pb-6 cursor-pointer;

  &__top {
    @apply pt-5 pl-5 pr-5 sm:pt-6 sm:pl-8 sm:pr-6 flex flex-row;
  }

  &__content {
    @apply px-5 sm:px-20;
  }

  &__bottom {
    @apply mt-5 sm:mt-4 sm:pl-20 sm:pr-6 pl-5 pr-5 flex flex-row items-center;
  }

  &__chip {
    @apply px-3 py-1 text-gray-500 inline-flex flex-row items-center rounded-full border border-gray-300 hover:bg-gray-200 transition duration-150 ease-in-out;
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
