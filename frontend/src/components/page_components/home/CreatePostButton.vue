<template>
  <div class="create-button">
    <div class="flex flex-row">
      <div class="page">
        <div class="container px-5 py-5 mx-auto 2xl:px-64">
          <div class="grid grid-cols-7 gap-5">
            <div class="flex col-span-7">
              <div
                class="flex flex-row items-center flex-grow-0 px-8 py-2 mx-auto text-sm font-medium text-white transition duration-150 ease-in-out transform bg-indigo-500 rounded-full shadow-lg cursor-pointer select-none hover:bg-indigo-600 hover:scale-105"
                @click="$store.commit('setLoginDialog', true)"
              >
                <div class="inline-flex flex-row items-center mx-auto">
                  <template v-if="$store.state.currentUser">
                    <iconify-icon width="24" icon="create" />
                    <span class="ml-4">Create a post</span>
                  </template>

                  <template v-else>
                    <iconify-icon width="24" icon="signup" />
                    <span class="ml-4">Sign Up</span>
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
    margin-left: 17.5rem;
    margin-right: 17.5rem;
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
