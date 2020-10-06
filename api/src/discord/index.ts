import { Client } from '@typeit/discord'

export async function startDiscordBot() {
  const client = new Client({
    classes: [__dirname + '/**/*.{ts,js}'],
    silent: false,
    variablesChar: ':'
  })

  await client.login(process.env.DISCORD_TOKEN)
}
