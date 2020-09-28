<template>
  <Popover
    v-model="sortMenu"
  >
    <template v-slot:activator="{ on }">
      <div
        v-if="sort === 'top' || tab === 'top'"
        class="menubutton"
        :class="sortMenu ? 'menubutton-active' : ''"
        @click="on"
      >
        <svg
          v-if="sort === 'top' || tab === 'top'"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
        <span class="ml-3">Top</span>
      </div>

      <div
        v-else
        class="menubutton"
        :class="sortMenu ? 'menubutton-active' : ''"
        @click="on"
      >
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span class="ml-3">New</span>
      </div>
    </template>

    <div class="rounded-lg shadow-lg">
      <nuxt-link v-if="sort !== 'top'" class="menuitem" :to="tab === 'posts' || tab === 'comments' ? `/${id}/${tab}/top` : `/${id}/top`">
        <svg
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
        <span class="ml-3">Top</span>
      </nuxt-link>

      <nuxt-link v-else class="menuitem" :to="tab === 'posts' || tab === 'comments' ? `/${id}/${tab}` : `/${id}`">
        <div style="width: 20px; height: 20px">
          <svg
            width="20"
            height="20"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
          </svg>
        </div>
        <span class="ml-3">New</span>
      </nuxt-link>
    </div>
  </Popover>
</template>

<script>

export default {
  name: 'UserPageSortMenu',
  props: {
    sort: {
      type: String,
      default: null
    },
    tab: {
      type: String,
      default: null
    },
    id: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      sortMenu: false
    }
  }
}
</script>

<style scoped>
.menubutton {
  @apply inline-flex flex-row items-center h-full min-h-full px-6 text-sm transition duration-150 ease-in-out cursor-pointer select-none hover:bg-gray-200 dark:hover:bg-gray-700;
}

.menubutton-active {
  @apply dark:bg-gray-800 bg-gray-100;
}

.menuitem {
  @apply inline-flex flex-row items-center w-full px-6 py-3 text-sm transition duration-150 ease-in-out bg-gray-100 rounded-b cursor-pointer select-none hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700;
}
</style>
