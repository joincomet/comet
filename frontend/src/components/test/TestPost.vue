<template>
  <div
    class="overflow-hidden cursor-pointer"
    @click="$router.push(post.relativeUrl)"
  >
    <ImageOverlay v-if="post.type === 'IMAGE' && post.link" :post="post">
      <template v-slot:activator="{ on }">
        <img
          class="w-full h-24 object-cover"
          :src="post.link"
          :alt="post.title"
          @click.stop.prevent="on"
        >
      </template>
    </ImageOverlay>
    <div v-else class="w-full h-24 bg-gray-200 dark:bg-gray-900 flex">
      <div class="m-auto text-gray-400 dark:text-gray-700">
        <Icon v-if="post.type === 'TEXT'" size="48" name="text" />
        <Icon v-else size="48" name="link" />
      </div>
    </div>
    <div class="flex p-3">
      <div class="w-11/12 pr-3 flex flex-col">
        <div class="pb-3">
          <nuxt-link :to="post.relativeUrl" class="font-bold text-sm">
            {{ post.title }}
          </nuxt-link>
          <div class="py-1 flex flex-row text-xs items-center text-secondary">
            <span>{{ post.timeSince }}</span>
          </div>
          <div
            v-if="post.textContent"
            class="text-secondary text-xs"
            style="height: 3rem; line-height: 1rem; overflow: hidden"
            v-html="post.textContent"
          />
        </div>
        <div class="flex flex-row text-xs items-center text-secondary mt-auto">
          <nuxt-link
            :to="`/u/${post.author.username}`"
            class="inline-flex flex-row items-center"
          >
            <img
              v-if="post.author.profilePicUrl"
              class="h-4 w-4 object-cover rounded-full"
              :src="post.author.profilePicUrl"
              :alt="post.author.username"
            >
            <span>&nbsp;{{ post.author.username }}&nbsp;</span>
          </nuxt-link>
          <span>in&nbsp;&nbsp;</span>
          <nuxt-link
            :to="`/p/${post.planet.name}`"
            class="inline-flex flex-row items-center"
          >
            <img
              v-if="post.planet.avatarImageUrl"
              class="h-4 w-4 object-cover rounded-full"
              :src="post.planet.avatarImageUrl"
              :alt="post.planet.name"
            >
            <span>&nbsp;{{ post.planet.name }}</span>
          </nuxt-link>
        </div>
      </div>
      <div class="w-1/12 items-end flex flex-col text-secondary">
        <div class="flex flex-col flex-grow items-center">
          <Icon
            class="text-indigo-600"
            name="comment"
          />
          <span
            class="text-xs pt-1 text-indigo-600"
          >
            {{
              post.commentCount
            }}</span>
          <Icon
            class="pt-2 text-red-500"
            name="rocket"
          />

          <span
            class="text-xs pt-1 text-red-500"
          >
            {{
              post.endorsementCount
            }}
          </span>

          <Popover>
            <template v-slot:activator="{ on }">
              <button
                ref="btnRef"
                class="mt-auto pt-4 focus:outline-none"
                @click.stop.prevent="on"
              >
                <Icon class="text-gray-500" name="dots-horizontal" />
              </button>
            </template>

            <div class="listitem text-black dark:text-white">
              <Icon size="16" class="mr-3" name="bookmark" />
              Save
            </div>
            <div class="listitem text-green-600">
              <Icon size="16" class="mr-3" name="crosspost" />
              Crosspost
            </div>
            <div class="listitem text-red-600">
              <Icon size="16" class="mr-3" name="report" />
              Report
            </div>
            <div class="listitem text-red-600">
              <Icon size="16" class="mr-3" name="eye-off" />
              Hide
            </div>
            <div class="listitem text-red-600">
              Mute&nbsp;<span
                class="font-semibold"
              >p/{{ post.planet.name }}</span>
            </div>
            <div class="listitem text-red-600">
              Mute&nbsp;<span
                class="font-semibold"
              >u/{{ post.author.username }}</span>
            </div>
            <template v-if="isMod">
              <div class="listitem text-red-600">
                Remove
              </div>
              <div class="listitem text-red-600">
                Ban&nbsp;<span
                  class="font-semibold"
                >u/{{ post.author.username }}</span>&nbsp;from&nbsp;<span
                  class="font-semibold"
                >p/{{ post.planet.name }}</span>
              </div>
            </template>
            <template v-if="$store.getters.isAdmin">
              <div class="listitem text-red-600">
                Sitewide Ban&nbsp;<span
                  class="font-semibold"
                >u/{{ post.author.username }}</span>
              </div>
              <div class="listitem text-red-600">
                Sitewide Ban & Purge&nbsp;<span
                  class="font-semibold"
                >u/{{ post.author.username }}</span>
              </div>
            </template>
          </Popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import ImageOverlay from '~/components/test/ImageOverlay'
import Popover from '~/components/test/Popover'

export default {
  name: 'TestPost',
  components: { Popover, ImageOverlay, Icon },
  props: {
    post: {
      type: Object,
      required: true
    },
    alt: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isMod () {
      return (
        this.$store.state.currentUser &&
        (this.$store.state.currentUser.admin ||
          !!this.$store.state.currentUser.moderatedPlanets.find(
            p => p.name === this.post.planet.name
          ))
      )
    }
  }
}
</script>

<style scoped></style>
