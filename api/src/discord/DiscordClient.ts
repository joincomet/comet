import { Client } from '@typeit/discord'

export const discordClient = new Client({
  classes: [`${__dirname}/AppDiscord.ts`],
  silent: false,
  variablesChar: ':'
})
