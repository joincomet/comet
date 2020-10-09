import currentUserGql from '@/gql/currentUser.graphql'
import communitiesGql from '@/gql/communities.graphql'

export const state = () => ({
  currentUser: null,
  topCommunities: [],
  joinedCommunities: [],
  loginDialog: false
})

export const mutations = {
  setLoginDialog (state, loginDialog) {
    state.loginDialog = loginDialog
  },
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  },
  setTopCommunities (state, topCommunities) {
    state.topCommunities = topCommunities
  },
  setJoinedCommunities (state, joinedCommunities) {
    state.joinedCommunities = joinedCommunities
  }
}

export const actions = {
  async nuxtServerInit ({ commit, dispatch, state }, context) {
    await dispatch('fetchCurrentUser')

    if (!state.currentUser) {
      await context.app.$apolloHelpers.onLogout()

      // Fetch top communities
      await dispatch('fetchTopCommunities')
    } else {
      // Fetch joined communities
      await dispatch('fetchJoinedCommunities')
    }
  },
  async fetchCurrentUser ({ commit }) {
    if (!this.app.$apolloHelpers.getToken()) {
      commit('setCurrentUser', null)
      return
    }
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: currentUserGql,
      fetchPolicy: 'network-only'
    })
    commit('setCurrentUser', data.currentUser)
  },
  async fetchTopCommunities ({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: communitiesGql,
      variables: {
        sort: 'TOP',
        pageSize: 5
      },
      fetchPolicy: 'network-only'
    })
    commit('setTopCommunities', data.communities)
  },
  async fetchJoinedCommunities ({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: communitiesGql,
      variables: {
        joined: true,
        pageSize: 5
      },
      fetchPolicy: 'network-only'
    })
    commit('setJoinedCommunities', data.communities)
  }
}

export const getters = {
  isAdmin (state) {
    return state.currentUser && state.currentUser.admin
  }
}
