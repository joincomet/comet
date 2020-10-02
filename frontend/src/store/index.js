import currentUserGql from '@/gql/currentUser.graphql'

export const state = () => ({
  currentUser: null
})

export const mutations = {
  setCurrentUser (state, currentUser) {
    state.currentUser = currentUser
  }
}

export const actions = {
  async nuxtServerInit ({ commit }, context) {
    const client = context.app.apolloProvider.defaultClient

    if (!context.app.$apolloHelpers.getToken()) { return }
    const { data } = await client.query({ query: currentUserGql })
    commit('setCurrentUser', data.currentUser)
    if (!data.currentUser) {
      await context.app.$apolloHelpers.onLogout()
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
  }
}

export const getters = {
  isAdmin (state) {
    return state.currentUser && state.currentUser.admin
  }
}
