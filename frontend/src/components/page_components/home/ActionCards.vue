<template>
  <div class="sm:grid grid-cols-3 gap-5 mb-5 hidden">
    <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.spacetelescope.org/archives/images/screen/opo0328a.jpg')">
      <div class="actioncard__title">
        Find your home
      </div>
      <div class="actioncard__action">
        Explore planets &nbsp;➤
      </div>
    </div>

    <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.spacetelescope.org/archives/images/screen/heic1713a.jpg')">
      <div class="actioncard__title">
        Build your planet
      </div>
      <div class="actioncard__action">
        Create a planet &nbsp;➤
      </div>
    </div>

    <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://cdn.spacetelescope.org/archives/images/screen/heic2007a.jpg')">
      <div class="actioncard__title">
        Update notes - 10/3/20
      </div>
      <div class="actioncard__action">
        Latest announcement &nbsp;➤
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ActionCards'
}
</script>

<style scoped lang="scss">
.actioncard {
  @apply shadow hover:shadow-md relative h-32 col-span-1 p-4 bg-white border bg-cover cursor-pointer transform transition duration-150 ease-in-out hover:-translate-y-1 border-gray-200 rounded-2xl;

  &__title {
    @apply absolute top-3 left-5 text-white text-base font-semibold;
  }

  &__action {
    @apply absolute bottom-3 right-5 tracking-widest uppercase font-bold text-gray-300;
    font-size: 0.625rem;
  }
}
</style>
