export default (context, inject) => {
  context.$vuetify.theme.themes.dark.primary = '#5C6BC0'
  context.$vuetify.theme.themes.light.primary = '#5C6BC0'
  inject('primaryColor', context.$vuetify.theme.themes.dark.primary)
}
