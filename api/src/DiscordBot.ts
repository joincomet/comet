import Discord from 'discord.js'

let bot: any = null

if (
  process.env.DISCORD_TOKEN &&
  process.env.DISCORD_REPORTS_CHANNEL &&
  process.env.DISCORD_FEEDBACK_CHANNEL
) {
  bot = new Discord.Client()
  bot.login(process.env.DISCORD_TOKEN)
} else {
  console.warn(
    'Missing Discord environment variables. Report and feedback functions will not work.'
  )
}

export const discordReport = async (reportedBy: string, postLink: string) => {
  if (!bot) return
  const channel = await bot.channels.fetch(process.env.DISCORD_REPORTS_CHANNEL)
  await (channel as Discord.TextChannel).send(
    `${reportedBy} reported ${postLink}`
  )
}

export const discordSendFeedback = async (
  feedback: string,
  username: string
) => {
  if (!bot) return
  const channel = await bot.channels.fetch(process.env.DISCORD_FEEDBACK_CHANNEL)
  await (channel as Discord.TextChannel).send(
    `Feedback from ${username}: ${feedback}`
  )
}
