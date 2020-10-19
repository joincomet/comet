<template>
  <nav class="navdrawer">
    <div class="flex flex-col flex-grow items-center py-5 border-b border-gray-200 mx-4">
      <img class="rounded-full bg-indigo-500 w-24 h-24 border-2 border-indigo-500" src="https://pbs.twimg.com/profile_images/1312166598086598658/I2-2CTFg_400x400.jpg">
      <div class="font-semibold mt-3 text-lg inline-flex items-center">
        Dan Beneventano
        <span class="flex h-3 w-3 ml-3 cursor-pointer">
          <span class="animate-online absolute inline-flex h-3 w-3 p-1 rounded-full bg-green-500 opacity-75" />
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
        </span>
      </div>
      <div class="font-medium mt-0.5 text-tertiary text-sm ">
        @Dan
      </div>
    </div>

    <div class="flex items-center justify-between mx-5 mt-5">
      <a href="https://discord.gg/NPCMGSm" target="_blank" rel="noopener" class="link">
        <iconify-icon icon="discord" class="mx-auto w-5 h-5" style="color: #7289DA" />
      </a>
      <a href="https://www.patreon.com/cometx" target="_blank" rel="noopener" class="link">
        <iconify-icon icon="patreon" class="mx-auto w-5 h-5" style="color: #F96854" />
      </a>
      <a href="https://twitter.com/CometX_io" target="_blank" rel="noopener" class="link">
        <iconify-icon icon="twitter" class="mx-auto w-5 h-5" style="color: #1DA1F2" />
      </a>
      <a href="https://github.com/comet-app/cometx" target="_blank" rel="noopener" class="link">
        <iconify-icon icon="github" class="mx-auto w-5 h-5" style="color: #181717" />
      </a>
    </div>
  </nav>
</template>

<script>
import IconifyIcon from '@iconify/vue'
import discord from '@iconify/icons-simple-icons/discord'
import patreon from '@iconify/icons-simple-icons/patreon'
import twitter from '@iconify/icons-simple-icons/twitter'
import github from '@iconify/icons-simple-icons/github'

IconifyIcon.addIcon('discord', discord)
IconifyIcon.addIcon('patreon', patreon)
IconifyIcon.addIcon('twitter', twitter)
IconifyIcon.addIcon('github', github)

export default {
  name: 'RightNavDrawer'
}
</script>

<style scoped>
.navitem {
  @apply relative mr-5 dark:text-gray-300 origin-left flex flex-row font-medium items-center py-3 px-6 text-sm hover:bg-gray-200 dark:hover:bg-gray-800 transform hover:scale-105 transition duration-150 ease-in-out rounded-r-full;
}

.navitem-active::before {
  content: "";
  @apply absolute left-0 top-0 bottom-0 w-1 bg-indigo-500;
}

.navdrawer {
  @apply fixed right-0 z-20 flex flex-col overflow-y-auto bg-white dark:bg-gray-900 shadow-lg min-h-full h-full hidden sm:block;
  width: 17.5rem;
}

.link {
  @apply rounded-full inline-flex place-items-center h-10 w-10 bg-gray-100 transition hover:bg-gray-200 transform ease-in-out duration-200 hover:scale-105;
}
</style>
