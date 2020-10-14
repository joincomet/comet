import currentUserGql from '@/gql/currentUser.graphql'
import planetsGql from '@/gql/planets.graphql'

export const state = () => ({
  currentUser: null,
  topPlanets: [],
  joinedPlanets: [],
  loginDialog: false,
  imageDialog: false,
  imageURL: null
})

export const mutations = {
  setLoginDialog(state, loginDialog) {
    state.loginDialog = loginDialog
  },
  setImageDialog(state, imageDialog) {
    state.imageDialog = imageDialog
  },
  setImageURL(state, imageURL) {
    state.imageURL = imageURL
  },
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  setTopPlanets(state, topPlanets) {
    state.topPlanets = topPlanets
  },
  setJoinedPlanets(state, joinedCommunities) {
    state.joinedPlanets = joinedCommunities
  }
}

export const actions = {
  async nuxtServerInit({ commit, dispatch, state }, context) {
    await dispatch('fetchCurrentUser')

    if (!state.currentUser) {
      await context.app.$apolloHelpers.onLogout()
      await dispatch('fetchTopPlanets')
    } else {
      await dispatch('fetchJoinedPlanets')
    }
  },
  async fetchCurrentUser({ commit }) {
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
  async fetchTopPlanets({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: planetsGql,
      variables: {
        sort: 'TOP',
        pageSize: 5
      },
      fetchPolicy: 'network-only'
    })
    commit('setTopPlanets', data.planets)
  },
  async fetchJoinedPlanets({ commit }) {
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: planetsGql,
      variables: {
        joined: true,
        pageSize: 5
      },
      fetchPolicy: 'network-only'
    })
    commit('setJoinedPlanets', data.planets)
  },
  openImageDialog({ commit }, imageURL) {
    commit('setImageURL', imageURL)
    commit('setImageDialog', true)
  }
}

export const getters = {
  isAdmin(state) {
    return state.currentUser && state.currentUser.admin
  }
}
