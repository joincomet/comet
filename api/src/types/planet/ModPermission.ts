export enum ModPermission {
  STICKY_POST, // Set sticky posts
  STICKY_COMMENT, // Set sticky comments
  REMOVE_POST, // Remove posts
  REMOVE_COMMENT, // Remove comments
  BAN, // Ban users
  PURGE, // Purge content from a user
  CUSTOMIZE, // Customize avatar, banner, description etc
  ADD_MOD, // Add another user as a mod
  ADD_APPROVED_POSTER, // Add an approved poster
  SETTINGS, // Access to planet settings - private, approved posters, or public; nsfw; allowed post types; opt out universe
  CHANGE_PERMISSIONS, // Can change permissions of other mods. Can only give other mods permissions that have been granted
  ARCHIVE // Make a post archived/read only
}
