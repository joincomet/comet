<template>
  <Dialog v-model="open">
    <template v-slot:activator="{ on }">
      <div class="ml-auto inline-flex flex-row items-center">
        <button
          class="mr-3 py-1 px-3 border border-indigo-500 text-indigo-500 text-sm rounded"
          @click="openLogIn(on)"
        >
          Log In
        </button>
        <button
          class="py-1 px-3 text-sm text-white bg-indigo-500 rounded"
          @click="openSignUp(on)"
        >
          Sign Up
        </button>
      </div>
    </template>

    <DialogCard>
      <RandomSpaceImage class="h-16 w-full" />
      <div class="p-6">
        <Icon name="comet-logo" class="h-6 mb-3" />
        <!--<div class="text-sm mb-6 text-secondary tracking-wide uppercase">
          <span
            :class="{ 'font-semibold': tab === 0 }"
            class="cursor-pointer hover:underline"
            @click="tab = 0"
            >Log In</span
          >
          <span class="text-secondary">/</span>
          <span
            :class="{ 'font-semibold': tab === 1 }"
            class="cursor-pointer hover:underline"
            @click="tab = 1"
            >Sign Up</span
          >
        </div>-->
        <form v-on="tab === 0 ? { submit: logIn } : { submit: signUp }">
          <TextInput
            v-model="username"
            label="Username"
            placeholder="Username"
            error-message="Username must be 3-15 characters and use characters A-Z, 1-9, -, _"
            :error="!usernameValid && tab === 1"
          />
          <TextInput
            v-show="tab === 1"
            v-model="email"
            label="Email (Optional)"
            placeholder="Email (Optional)"
            error-message="Please enter a valid email address."
            :error="!emailValid"
          />
          <TextInput
            v-model="password"
            label="Password"
            placeholder="******************"
            error-message="Password must be at least 6 characters."
            :error="!passwordValid && tab === 1"
            type="password"
          />
          <TextInput
            v-show="tab === 1"
            v-model="confirmPassword"
            label="Confirm Password"
            placeholder="******************"
            error-message="Passwords do not match."
            :error="!confirmPasswordValid"
            type="password"
          />
          <div class="flex items-center justify-between pt-3">
            <button
              type="submit"
              :class="formValid ? 'text-white' : 'text-secondary opacity-25'"
              :disabled="!formValid"
              class="inline-flex items-center px-4 py-2 leading-6 rounded text-gray-300 focus:outline-none bg-gray-300 dark:bg-gray-800 transition ease-in-out duration-150"
            >
              <div v-show="loading" class="-ml-1 mr-3">
                <Icon name="spinner" />
              </div>
              {{ tab === 0 ? 'Log In' : 'Sign Up' }}
            </button>

            <button
              type="button"
              class="inline-flex items-center px-4 py-2 leading-6 rounded text-secondary text-sm focus:outline-none transition ease-in-out duration-150"
              @click="switchTab"
            >
              {{ tab === 0 ? 'Create an account' : 'Already have an account' }}
            </button>

            <!--<a
              class="inline-block align-baseline font-bold text-sm text-indigo-500 hover:text-indigo-800"
              href="#"
            >
              Forgot Password?
            </a>-->
          </div>
          <div v-show="tab === 1" class="text-xs text-secondary pt-5">
            By clicking Sign Up, you agree to our
            <nuxt-link to="/terms" class="text-indigo-500">
              Terms of Service
            </nuxt-link>
            and
            <nuxt-link to="/privacy" class="text-indigo-500">
              Privacy Policy
            </nuxt-link>.
          </div>
        </form>
      </div>
    </DialogCard>
  </Dialog>
</template>

<script>
import * as EmailValidator from 'email-validator'
import RandomSpaceImage from '@/components/dialog/login/RandomSpaceImage'
import DialogCard from '@/components/dialog/DialogCard'
import Dialog from '@/components/dialog/Dialog'
import TextInput from '@/components/dialog/login/TextInput'
import Icon from '@/components/Icon'
import loginGql from '@/gql/login'
import signUpGql from '@/gql/signUp'

export default {
  name: 'LoginDialog',
  components: { DialogCard, RandomSpaceImage, Icon, TextInput, Dialog },
  data () {
    return {
      open: false,
      tab: 0,
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      loading: false
    }
  },
  computed: {
    usernameValid () {
      const u = this.username
      return (
        !u ||
        (u && u.length >= 3 && u.length <= 15 && u.match(/^[a-zA-Z0-9_]+$/))
      )
    },
    emailValid () {
      const e = this.email
      return !e || (e && EmailValidator.validate(e))
    },
    passwordValid () {
      const p = this.password
      return !p || (p && p.length >= 6)
    },
    confirmPasswordValid () {
      return !this.confirmPassword || this.password === this.confirmPassword
    },
    formValid () {
      if (this.tab === 0) {
        return this.username && this.password
      } else {
        return (
          this.username &&
          this.usernameValid &&
          this.emailValid &&
          this.password &&
          this.passwordValid &&
          this.confirmPassword &&
          this.confirmPasswordValid
        )
      }
    }
  },
  methods: {
    switchTab () {
      if (this.tab === 0) { this.tab = 1 } else { this.tab = 0 }
    },
    openLogIn (on) {
      this.tab = 0
      on()
    },
    openSignUp (on) {
      this.tab = 1
      on()
    },
    async logIn (e) {
      e.preventDefault()
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
        this.open = false
      } catch (e) {
        this.$toast.error(e.message.split('GraphQL error: ')[1])
      }
      this.loading = false
    },
    async signUp (e) {
      e.preventDefault()
      if (!this.formValid) { return }
      this.loading = true
      try {
        const res = await this.$apollo
          .mutate({
            mutation: signUpGql,
            variables: {
              username: this.username,
              password: this.password,
              email: this.email
            }
          })
          .then(({ data }) => data && data.signUp)
        await this.$apolloHelpers.onLogin(res.accessToken)
        await this.$store.dispatch('fetchCurrentUser')
        this.open = false
      } catch (e) {
        this.$toast.error(e.message.split('GraphQL error: ')[1])
      }
      this.loading = false
    }
  }
}
</script>

<style scoped></style>
