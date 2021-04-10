const DiscordRPC = require('discord-rpc')

// Set this to your Client ID.
const clientId = '829047983378792518'

module.exports = {
  setupDiscord: mainWindow => {
    // Only needed if you want to use spectate, join, or ask to join
    DiscordRPC.register(clientId)

    const rpc = new DiscordRPC.Client({ transport: 'ipc' })

    async function setActivity() {
      if (!rpc || !mainWindow) {
        return
      }

      // You'll need to have snek_large and snek_small assets uploaded to
      // https://discord.com/developers/applications/<application_id>/rich-presence/assets
      rpc.setActivity({
        details: `Chat and forums for communities.`,
        state: 'joincomet.app',
        largeImageKey: 'discord_rich_presence_icon',
        largeImageText: 'Drop Discord and Reddit, join Comet',
        instance: false
      })
    }

    rpc.on('ready', () => {
      setActivity()

      // activity can only be set every 15 seconds
      setInterval(() => {
        setActivity()
      }, 15e3)
    })

    rpc.login({ clientId }).catch(console.error)
  }
}
