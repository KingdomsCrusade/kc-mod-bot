const welcomeSchema = require('../../schemas/welcome-schema')
const mongo = require('../../mongo')
const cache = new Map()

const loadData = async () => {
  const results = await welcomeSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = {
  commands: ['setwelcome'],
  permissionError: 'You need to have the MANAGE_GUILD permission to run this command.',
  permissions: 'MANAGE_GUILD',
  callback: async (message, arguments, text) => {
    const { guild, channel } = message
    await mongo().then(async mongoose => {
      try {
    await welcomeSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )

    cache.set(guild.id, channel.id)

    message.lineReplyNoMention('Welcome channel set!')
      } finally {
        mongoose.connection.close()
      }
    })
  }
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}
