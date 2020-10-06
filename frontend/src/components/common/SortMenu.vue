<template>
  <Popover :offset-y="-40">
    <template v-slot:activator="{ on }">
      <div class="sortbutton" @click="on">
        <svg v-if="currentSort === 'Hot'" class="sortbutton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
        </svg>
        <svg
          v-else-if="currentSort === 'New'"
          class="sortbutton__icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <svg v-else-if="currentSort === 'Top'" class="sortbutton__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
        <span class="sortbutton__text">{{ currentSort }}</span>
      </div>
    </template>

    <div class="sortmenu">
      <nuxt-link :to="hotRoute" class="sortmenu__item" exact active-class="sortmenu__item-active">
        <svg class="sortmenu__item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
        </svg>
        <span class="sortmenu__item-text">Hot</span>
      </nuxt-link>
      <nuxt-link :to="newRoute" class="sortmenu__item" active-class="sortmenu__item-active">
        <svg
          style="min-height: 20px; min-width: 20px"
          height="20"
          width="20"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd" />
        </svg>
        <span class="sortmenu__item-text">New</span>
      </nuxt-link>
      <nuxt-link :to="topRoute" class="sortmenu__item" active-class="sortmenu__item-active">
        <svg class="sortmenu__item-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path d="M3 3a1 1 0 000 2h11a1 1 0 100-2H3zM3 7a1 1 0 000 2h5a1 1 0 000-2H3zM3 11a1 1 0 100 2h4a1 1 0 100-2H3zM13 16a1 1 0 102 0v-5.586l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 101.414 1.414L13 10.414V16z" />
        </svg>
        <span class="sortmenu__item-text">Top</span>
      </nuxt-link>
    </div>
  </Popover>
</template>

<script>
export default {
  name: 'SortMenu',
  computed: {
    hotRoute () {
      const params = Object.assign({}, this.$route.params)
      const { name } = this.$route
      delete params.sort
      delete params.time
      return { params, name }
    },
    newRoute () {
      const params = Object.assign({}, this.$route.params)
      const { name } = this.$route
      params.sort = 'new'
      delete params.time
      return { params, name }
    },
    topRoute () {
      const params = Object.assign({}, this.$route.params)
      const { name } = this.$route
      params.sort = 'top'
      delete params.time
      return { params, name }
    },
    currentSort () {
      const { sort } = this.$route.params
      if (sort === 'new') { return 'New' } else if (sort === 'top') { return 'Top' } else { return 'Hot' }
    }
  }
}
</script>

<style scoped lang="scss">
.sortbutton {
  @apply inline-flex border-gray-200 flex-row items-center text-indigo-600 bg-white cursor-pointer px-6 rounded-full shadow hover:bg-gray-100 border h-10;

  &__text {
    @apply font-medium text-sm;
  }

  &__icon {
    @apply w-5 h-5 mr-3;
  }
}

.sortmenu {
  @apply bg-white border shadow border-gray-200;
  border-radius: 1rem;

  &__item {
    @apply flex flex-row items-center text-gray-500 px-6 h-10 hover:bg-gray-100 cursor-pointer;

    &-text {
      @apply font-medium text-sm ml-3;
    }

    &-icon {
      @apply w-5 h-5;
    }
  }

  &__item:first-child {
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  }

  &__item:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }

  &__item-active {
    @apply text-indigo-600;
  }
}
</style>
