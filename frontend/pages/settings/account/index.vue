<template>
  <v-row>
    <v-col :cols="$device.isDesktop ? 6 : 12">
      <v-list style="border-radius: 10px;">
        <v-list-item @click="toggleAppearOffline">
          <v-list-item-content>
            <v-list-item-title>Appear Offline</v-list-item-title>
            <v-list-item-subtitle
              >The dot next to your avatar will always be
              grey</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-action>
            <v-switch
              v-model="$store.state.currentUser.appearOffline"
              readonly
            />
          </v-list-item-action>
        </v-list-item>

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>Change Password</v-list-item-title>
            <v-list-item-subtitle
              >Password must be at least 6 characters long</v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-action>
            <v-btn depressed @click="showChangePassword = !showChangePassword"
              >Change</v-btn
            >
          </v-list-item-action>
        </v-list-item>

        <v-fade-transition>
          <v-form
            v-show="showChangePassword"
            ref="form"
            v-model="valid"
            class="pa-3"
            @submit.prevent="changePassword"
          >
            <v-text-field
              v-model="currentPassword"
              :rules="rules.oldPasswordRules"
              label="Current Password"
              solo
              flat
              dense
              :type="showPasswordOld ? 'text' : 'password'"
              class="darktextfield"
            >
              <template v-slot:append>
                <div
                  style="cursor: pointer;"
                  tabindex="-1"
                  @click="showPasswordOld = !showPasswordOld"
                >
                  <v-icon class="text--secondary">{{
                    showPasswordOld
                      ? $vuetify.icons.values.mdiEye
                      : $vuetify.icons.values.mdiEyeOff
                  }}</v-icon>
                </div>
              </template>
            </v-text-field>
            <v-text-field
              v-model="newPassword"
              :rules="rules.newPasswordRules"
              label="New Password"
              solo
              flat
              dense
              :type="showPassword ? 'text' : 'password'"
              class="darktextfield"
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
            <v-text-field
              v-model="newPasswordConfirm"
              :rules="rules.newPasswordConfirmRules"
              label="Confirm New Password"
              solo
              flat
              dense
              :type="showPassword ? 'text' : 'password'"
              class="darktextfield"
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
            <v-row class="mx-0" align="center">
              <v-spacer />
              <div v-if="errMessage" class="mr-2 error--text">
                {{ errMessage }}
              </div>
              <div v-if="successMessage" class="mr-2 success--text">
                {{ successMessage }}
              </div>
              <v-btn
                aria-label="Change Password"
                :loading="loading"
                color="primary"
                :disabled="!valid"
                type="submit"
                >Change Password</v-btn
              >
            </v-row>
          </v-form>
        </v-fade-transition>
      </v-list>
    </v-col>
  </v-row>
</template>

<script>
import gql from 'graphql-tag'
import changePasswordGql from '@/gql/changePassword'

export default {
  middleware: 'authenticated',
  data() {
    return {
      showChangePassword: false,
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
      errMessage: '',
      successMessage: '',
      loading: false,
      valid: false,
      showPassword: false,
      showPasswordOld: false,
      rules: {
        oldPasswordRules: [(v) => !!v || 'Current password is required'],
        newPasswordRules: [
          (v) => !!v || 'Password is required',
          (v) => v.length >= 6 || 'Password must be at least 6 characters'
        ],
        newPasswordConfirmRules: [
          (v) => !!v || 'Password confirmation is required',
          (v) => v === this.newPassword || 'Passwords do not match'
        ]
      }
    }
  },
  methods: {
    async toggleAppearOffline() {
      this.$store.commit(
        'setAppearOffline',
        !this.$store.state.currentUser.appearOffline
      )
      await this.$apollo.mutate({
        mutation: gql`
          mutation($appearOffline: Boolean!) {
            setAppearOffline(appearOffline: $appearOffline)
          }
        `,
        variables: {
          appearOffline: this.$store.state.currentUser.appearOffline
        }
      })
    },
    async changePassword() {
      this.loading = true
      try {
        const { data } = await this.$apollo.mutate({
          mutation: changePasswordGql,
          variables: {
            oldPassword: this.currentPassword,
            newPassword: this.newPassword
          }
        })
        this.successMessage = 'Password changed successfully!'
        this.errMessage = ''
        this.currentPassword = ''
        this.newPassword = ''
        this.newPasswordConfirm = ''
        await this.$apolloHelpers.onLogin(data.changePassword.accessToken)
      } catch (e) {
        this.errMessage = e.message.split('GraphQL error: ')[1]
        this.successMessage = ''
        this.currentPassword = ''
      }
      this.loading = false
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style scoped></style>
