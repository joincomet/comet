<template>
  <div class="flex flex-grow items-center px-3 sm:px-0">
    <div class="inline-flex flex-grow relative h-10 mr-5">
      <button type="submit" class="focus:outline-none absolute left-0 top-0 mt-3 mr-4 ml-4">
        <iconify-icon
          icon="search"
          :class="searchFocused ? 'text-indigo-600' : 'text-tertiary'"
          class="transition duration-150 ease-in-out"
          width="18"
          height="18"
        />
      </button>
      <input
        ref="searchInput"
        type="text"
        placeholder="Search posts, @users and +planets"
        class="pl-12 pr-6 focus:border-indigo-600 shadow transition duration-150 ease-in-out h-10 border border-gray-100 rounded-full text-sm text-tertiary w-full focus:outline-none"
        @focusin="searchFocused = true"
        @focusout="searchFocused = false"
      >
    </div>

    <SortMenu />
  </div>
</template>
<script>
import IconifyIcon from '@iconify/vue'
import search from '@iconify/icons-heroicons-solid/search'

IconifyIcon.addIcon('search', search)

export default {
  name: 'SearchBar',
  components: { IconifyIcon },
  data() {
    return {
      searchFocused: false
    }
  }
}
</script>
