const suggestionsSchema = require('../../schemas/suggestions-schema')
const mongo = require('../../mongo')
const cache = new Map()
const mongoose = require ('mongoose')

const loadData = async () => {
  const results = await suggestionsSchema.find()

  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()

module.exports = {
  commands: ['setsuggestions'],
  permissionError: 'You need to have the MANAGE_GUILD permission to run this command.',
  permissions: 'MANAGE_GUILD',
  callback: async (message, arguments, text) => {
    const { guild, channel } = message


    await suggestionsSchema.findOneAndUpdate(
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

    message.lineReplyNoMention('Suggestions channel set!')
  }
}

module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}
