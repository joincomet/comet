<template>
  <div class="container py-6 px-16 mx-auto">
    <div class="fixed flex w-full z-10" style="bottom: 4rem">
      <div class="container grid grid-cols-12 gap-12">
        <div class="col-span-8 flex">
          <div class="mx-auto px-6 py-3 font-medium flex flex-row items-center bg-indigo-600 rounded-full text-white text-sm shadow-lg cursor-pointer duration-150 ease-in-out transition customtransform">
            <div class="mx-auto inline-flex flex-row items-center">
              <svg class="w-6 h-6 mr-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Create a post</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--<div class="mb-6">
      <div class="mb-6 font-bold text-md">
        Ongoing Discussions
      </div>
      <div
        class="grid grid-cols-1 grid-rows-4 gap-3 sm:grid-rows-1 sm:grid-cols-4"
      >
        <OngoingDiscussion v-for="post in topDiscussions" :key="post.id" :post="post" />
      </div>
    </div>-->

    <div class="grid min-w-0 min-h-0 grid-cols-12 grid-rows-1 gap-5">
      <div class="col-span-9">
        <!--<CommunityOfTheDay :community="communityOfTheDay" :posts="topDiscussions" class="mb-6" />-->

        <!--<div class="rounded-xl bg-gradient-to-r from-gray-900 to-indigo-400 w-full h-48 relative mb-5">
          <div class="absolute top-4 left-4 text-white text-xl font-medium">
            Join our community
          </div>
          <div class="py-2 transform duration-150 hover:scale-105 ease-in-out cursor-pointer px-6 text-sm font-medium absolute left-5 bottom-5 rounded-full bg-white shadow-md text-indigo-600">
            Sign Up
          </div>
        </div>-->

        <div class="grid grid-cols-3 gap-5 mb-5">
          <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.spacetelescope.org/archives/images/screen/heic0821b.jpg')">
            <div class="absolute top-3 left-5 text-white text-lg">
              Build your community
            </div>
            <div class="absolute bottom-3 right-5 text-sm text-gray-100">
              Create a planet &nbsp;➤
            </div>
          </div>

          <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.spacetelescope.org/archives/images/screen/opo0328a.jpg')">
            <div class="absolute top-3 left-5 text-white text-lg">
              Find your home
            </div>
            <div class="absolute bottom-3 right-5 text-sm text-gray-100">
              Explore planets &nbsp;➤
            </div>
          </div>

          <div class="actioncard" style="background-image: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://cdn.spacetelescope.org/archives/images/screen/heic2007a.jpg')">
            <div class="absolute top-3 left-5 text-white text-lg">
              Update notes - 10/3/20
            </div>
            <div class="absolute bottom-3 right-5 text-sm text-gray-100">
              View latest announcement &nbsp;➤
            </div>
          </div>
        </div>

        <div class="flex flex-grow items-center">
          <div class="inline-flex flex-grow relative h-10 mr-5">
            <input
              ref="searchInput"
              type="text"
              placeholder="Search posts, @users and +planets"
              class="pl-12 pr-6 focus:border-indigo-600 origin-left transition duration-150 ease-in-out absolute h-10 border border-gray-200 rounded-full text-sm text-tertiary shadow w-full focus:outline-none"
              @focusin="searchFocused = true"
              @focusout="searchFocused = false"
            >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              :class="searchFocused ? 'text-indigo-600' : 'text-tertiary'"
              class="transition duration-150 ease-in-out relative align-middle h-full ml-4"
              style="width: 1.13rem"
            >
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
            </svg>
          </div>

          <div class="inline-flex flex-row items-center text-indigo-600 bg-white cursor-pointer px-6 rounded-full shadow border border-gray-200 h-10">
            <svg class="w-5 h-5 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clip-rule="evenodd" />
            </svg>
            <span class="font-medium text-sm">Hot</span>
          </div>
        </div>

        <div class="mt-5">
          <article v-for="post in feed" :key="post.id">
            <div class="p-4 mb-3 bg-white border rounded-xl myborder dark:bg-gray-800">
              <div class="flex flex-row cursor-pointer">
                <div class="thumbnail">
                  <div v-if="post.type === 'IMAGE'" class="flex flex-grow h-20 bg-cover rounded-lg sm:h-24" :style="`background-image: url(${post.link})`" />
                  <div v-else class="flex flex-grow h-20 bg-gray-200 dark:bg-gray-800 sm:h-24">
                    <div class="m-auto text-gray-400 dark:text-gray-700">
                      <Icon v-if="post.type === 'TEXT'" size="48" name="text" />
                      <Icon v-else-if="post.type === 'LINK' || post.type === 'IMAGE'" size="48" name="text" />
                    </div>
                  </div>
                </div>

                <div class="flex flex-col justify-start">
                  <nuxt-link :to="post.relativeUrl" class="font-medium">
                    {{ post.title }}
                  </nuxt-link>
                  <div
                    v-if="post.textContent"
                    class="mt-1 text-sm text-secondary line-clamp-2"
                    v-html="post.textContent"
                  />
                  <PostAuthor class="pt-3 text-sm text-secondary" :post="post" />
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
      <div class="col-span-3">
        <PopularCommunities :popular-communities="popularCommunities" />
        <div class="rounded-lg w-full shadow px-6 h-10 inline-flex flex-row items-center mt-5 cursor-pointer transform transition duration-150 ease-in-out hover:scale-105" style="background-color: #F96854">
          <svg class="w-5 h-5 mr-4" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff">
            <path d="M15.386.524c-4.764 0-8.64 3.876-8.64 8.64 0 4.75 3.876 8.613 8.64 8.613 4.75 0 8.614-3.864 8.614-8.613C24 4.4 20.136.524 15.386.524M.003 23.537h4.22V.524H.003" />
          </svg>
          <span class="font-medium text-sm text-white">Support CometX on Patreon</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import feedGql from '@/gql/feed.graphql'
import communityGql from '@/gql/community.graphql'
import popularCommunitiesGql from '@/gql/popularCommunities.graphql'
import { feedVars } from '@/util/feedVars'

export default {
  async asyncData ({ app, route }) {
    const client = app.apolloProvider.defaultClient

    const feed = (
      await client.query({
        query: feedGql,
        variables: { ...feedVars(route) },
        fetchPolicy: 'network-only'
      })
    ).data.feed

    const communityOfTheDay = (
      await client.query({
        query: communityGql,
        variables: {
          name: 'HistoryInPictures'
        }
      })
    ).data.community

    const popularCommunities = (
      await client.query({
        query: popularCommunitiesGql
      })
    ).data.popularCommunities

    return { feed, communityOfTheDay, popularCommunities }
  },
  data () {
    return {
      feed: [],
      communityOfTheDay: null,
      popularCommunities: [],
      tag: null,
      searchFocused: false
    }
  },
  computed: {
    topDiscussions () {
      return this.feed.slice(0, 4)
    }
  }
}
</script>

<style scoped>
.thumbnail {
  @apply w-20 h-20 mr-6 sm:h-24 sm:w-24;
  min-width: 5rem;
}

@media (min-width: 640px) {
    .thumbnail {
      min-width: 6rem;
    }
}

.customtransform:hover {
  transform: scale(1.05);
}

.customtransform {
}

.actioncard {
  @apply relative h-32 col-span-1 p-4 bg-white border border-gray-200 bg-cover cursor-pointer transform transition duration-150 ease-in-out hover:-translate-y-1 opacity-75 hover:opacity-100;
  border-radius: 16px;
}
</style>
