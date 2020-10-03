<template>
  <div class="container py-6 mx-auto">
    <div class="grid justify-center grid-cols-11 gap-4">
      <div class="col-span-8" :class="hasLinkedAccount || user.moderatedCommunities.length > 0 ? '' : 'col-start-2'">
        <div class="flex flex-row p-6 rounded-lg card">
          <img :src="user.profile.avatar" class="w-48 h-48 mr-12 rounded-full" style="min-width: 12rem; min-height: 12rem">
          <div class="py-2">
            <div class="inline-flex flex-row items-center mb-3">
              <span class="inline-flex flex-row items-end">
                <span class="text-3xl font-semibold">
                  {{ user.username }}
                </span>
                <span class="text-2xl font-semibold text-gray-500 dark:text-gray-400">&nbsp;&nbsp;@{{ user.username }}</span>
              </span>
              <nuxt-link v-if="user.isCurrentUser" to="/settings/account" class="inline-flex flex-row items-center px-3 py-1 ml-6 text-sm text-indigo-500 border border-indigo-500 rounded cursor-pointer">
                <svg width="20" height="20" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd" />
                </svg>
                <span class="ml-2">Settings</span>
              </nuxt-link>
              <span v-else class="px-3 py-1 ml-6 text-sm text-white bg-indigo-500 rounded cursor-pointer">Follow</span>
              <Icon class="ml-6 cursor-pointer text-secondary" name="dots-horizontal" />
            </div>
            <div class="mb-3 text-sm text-secondary">
              Joined {{ user.timeSinceCreated }} &middot; {{ user.upvoteCount }} Rocket{{ user.upvoteCount === 1 ? '' : 's' }} &middot; 22 Followers &middot; 68 Following
            </div>
            <div class="mb-3 text-md text-secondary">
              {{ user.bio }}
            </div>
            <div v-if="user.website" class="inline-flex flex-row items-center mb-3 text-sm cursor-pointer text-secondary hover:underline">
              <svg
                width="16"
                height="16"
                class="mr-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
              </svg>
              {{ user.website }}
            </div>
          </div>
        </div>

        <UserPageTabs :user="user" />

        <nuxt-child />
      </div>
      <div v-if="hasLinkedAccount || user.moderatedCommunities.length > 0" class="col-span-3">
        <LazyLinkedAccounts v-if="hasLinkedAccount" :user="user" />

        <ModeratedCommunities v-if="user.moderatedCommunities && user.moderatedCommunities.length > 0" :user="user" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserPage',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    hasLinkedAccount () {
      return Object.keys(this.user).filter(u => u.startsWith('username') && u.length > 8).length > 0
    }
  },
  head () {
    const title = `${this.user.username} – CometX`
    return {
      title,
      link: [
        {
          rel: 'canonical',
          href: `https://www.cometx.io/@${this.user.username}`
        }
      ],
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.user.profile.bio
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'CometX'
        },
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'profile'
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: title
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: this.user.profile.avatar
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.user.profile.bio
        },
        {
          hid: 'og:profile:username',
          property: 'og:profile:username',
          content: this.user.username
        },
        {
          hid: 'og:profile:first_name',
          property: 'og:profile:first_name',
          content: this.user.username.includes(' ') ? this.user.username.split(' ')[0] : this.user.username
        },
        {
          hid: 'og:profile:last_name',
          property: 'og:profile:last_name',
          content: this.user.username.includes(' ') ? this.user.username.split(' ')[1] : ''
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@CometWebsite'
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary'
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: this.user.profile.avatar
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: this.user.bio
        },
        this.user.profile.usernames.twitter ? {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: `@${this.user.profile.usernames.twitter}`
        } : undefined
      ]
    }
  }
}
</script>

<style scoped>
.linked-account {
  @apply flex flex-row items-center mt-4 hover:underline cursor-pointer;
}
</style>
