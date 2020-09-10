<template>
  <div class="px-24 py-6 w-full">
    <div class="flex flex-row">
      <img :src="user.profilePicUrl" class="rounded-full h-32 w-32 mr-12 border-2 border-indigo-500">
      <div>
        <div class="inline-flex flex-row items-center">
          <span class="text-3xl font-semibold">
            Dan Beneventano
          </span>
          <span class="ml-6 text-sm px-3 py-1 rounded border border-indigo-500 text-indigo-500 cursor-pointer">Follow</span>
          <Icon class="ml-3 text-secondary cursor-pointer" name="dots-horizontal" />
        </div>
        <div class="py-3 text-sm text-secondary">
          Co-Founder and Programmer of CometX
        </div>
        <div class="flex flex-row items-center">
          <a href="https://www.cometx.io" target="_blank" class="text-sm text-accent hover:underline">
            cometx.io
          </a>
          <a href="https://www.twitter.com/CometWebsite" target="_blank">
            <Icon class="text-secondary ml-3" name="twitter" size="16" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'

export default {
  name: 'UserPage',
  components: { Icon },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.background {
  background-image: linear-gradient(0deg, rgba(255, 255, 255, 1), rgba(255, 255, 255, 0)), url('~assets/spaceimages/01.jpg');
}
</style>
