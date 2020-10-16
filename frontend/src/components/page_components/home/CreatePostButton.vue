<template>
  <div class="create-button">
    <div class="flex flex-row">
      <div class="page">
        <div class="container py-5 px-5 2xl:px-64">
          <div class="grid grid-cols-7 gap-5">
            <div class="col-span-7 sm:col-span-5 flex">
              <div
                class="px-8 py-2 font-medium mx-auto flex flex-row flex-grow-0 items-center bg-indigo-500 hover:bg-indigo-600 rounded-full text-white text-sm shadow-lg cursor-pointer duration-150 ease-in-out transition hover:scale-105 transform"
              >
                <div class="mx-auto inline-flex flex-row items-center">
                  <template v-if="$store.state.currentUser">
                    <iconify-icon width="24" icon="create" />
                    <span class="ml-4">Create a post</span>
                  </template>

                  <template v-else>
                    <iconify-icon width="24" icon="signup" />
                    <span class="ml-4">Sign up</span>
                  </template>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import IconifyIcon from '@iconify/vue'
import create from '@iconify/icons-heroicons-solid/pencil-alt'
import signup from '@iconify/icons-heroicons-solid/user-circle'

IconifyIcon.addIcon('create', create)
IconifyIcon.addIcon('signup', signup)

export default {
  name: 'CreatePostButton'
}
</script>

<style scoped>
@media(min-width: 640px) {
  .page {
    margin-left: 17.5rem
  }
}

.page {
  @apply flex flex-grow;
}

@media(min-width: 640px) {
  .create-button {
    bottom: 4rem
  }
}

.create-button {
  @apply z-10 fixed inset-x-0;
  bottom: 1rem;
}
</style>
