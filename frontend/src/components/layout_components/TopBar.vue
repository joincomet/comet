<template>
  <div class="fixed z-10 top-0 inset-x-0 w-full h-16 bg-white shadow-md">
    <div class="page h-full">
      <div class="container mx-auto 2xl:px-80 flex items-center flex-grow h-full">
        <SearchBar />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopBar'
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
</style>
