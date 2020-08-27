<template>
  <div style="display: flex; flex-direction: column;">
    <v-form @submit.prevent="login">
      <v-text-field v-model="username" outlined label="Username" />
      <v-text-field
        v-model="password"
        outlined
        label="Password"
        :type="showPassword ? 'text' : 'password'"
      >
        <template v-slot:append>
          <div
            style="cursor: pointer;"
            tabindex="-1"
            @click="showPassword = !showPassword"
          >
            <v-icon class="text--secondary">{{
              showPassword
                ? $vuetify.icons.values.mdiEye
                : $vuetify.icons.values.mdiEyeOff
            }}</v-icon>
          </div>
        </template>
      </v-text-field>
      <v-row no-gutters>
        <v-spacer />
        <v-btn text rounded class="text--secondary mr-2" nuxt to="/signup"
          >Create an account</v-btn
        >
        <v-btn
          depressed
          rounded
          color="primary"
          type="submit"
          :disabled="!username || !password"
          :loading="loading"
          >Log In</v-btn
        >
      </v-row>
    </v-form>
  </div>
</template>

<script>
import loginGql from '@/gql/login.graphql'

export default {
  transition: {
    name: 'scroll-x-transition',
    mode: 'out-in'
  },
  data() {
    return {
      prevRoute: null,
      username: '',
      password: '',
      loading: false,
      showPassword: false
    }
  },
  methods: {
    async login() {
      this.loading = true
      try {
        const res = await this.$apollo
          .mutate({
            mutation: loginGql,
            variables: {
              username: this.username,
              password: this.password
            }
          })
          .then(({ data }) => data && data.login)
        await this.$apolloHelpers.onLogin(res.accessToken)
        await this.$store.dispatch('fetchCurrentUser')
        await this.$router.push('/home')
        if (this.$vuetify.breakpoint.lgAndUp) {
          this.$store.commit('setNav', true)
        }
      } catch (e) {
        this.err = e.message
        this.$store.dispatch('displaySnackbar', {
          message: this.err.split('GraphQL error: ')[1]
        })
      }
      this.loading = false
    }
  },
  head: {
    title: 'Log In'
  }
}
</script>

<style scoped></style>
