<template>
  <div class="flex flex-row items-center h-12 px-3 mt-6 bg-white rounded-lg dark:bg-gray-800">
    <nuxt-link :to="`/${ id }${ sort ? '/' + sort : ''}`" class="tab" :class="tab !== 'posts' && tab !== 'comments' ? 'tab-active' : ''">
      Everything
    </nuxt-link>
    <nuxt-link :to="`/${ id }/posts${ sort ? '/' + sort : ''}`" class="tab" :class="tab === 'posts' ? 'tab-active' : ''">
      {{ user.postCount }} Post{{ user.postCount === 1 ? '' : 's' }}
    </nuxt-link>
    <nuxt-link :to="`/${ id }/comments${ sort ? '/' + sort : ''}`" class="tab" :class="tab === 'comments' ? 'tab-active' : ''">
      {{ user.commentCount }} Comment{{ user.commentCount === 1 ? '' : 's' }}
    </nuxt-link>

    <UserPageSortMenu :id="id" :sort="sort" :tab="tab" />
  </div>
</template>

<script>
import UserPageSortMenu from '@/components/pages/user/UserPageSortMenu'

export default {
  name: 'UserPageTabs',
  components: { UserPageSortMenu },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  computed: {
    sort () {
      if (this.$route.name === 'user-tab') {
        if (this.$route.params.tab === 'top') { return 'top' } else { return undefined }
      } else if (this.$route.name === 'user-tab-sort') {
        return this.$route.params.sort
      } else {
        return undefined
      }
    },
    tab () {
      const { tab } = this.$route.params
      if (!tab) { return undefined }
      if (tab === 'top') { return undefined }
      return tab
    },
    id () {
      return this.$route.params.id
    }
  }
}
</script>

<style scoped>
.tab {
  @apply select-none h-12 px-6 py-3 text-sm text-gray-500 dark:text-gray-300 transition duration-150 ease-in-out border-b-2 dark:border-gray-700 border-gray-200 cursor-pointer dark:hover:bg-gray-700 hover:bg-gray-200;
}

.tab-active {
  @apply text-black dark:text-white border-gray-700 dark:border-gray-300;
}
</style>
