const mongo = require('../../mongo')
const commandPrefixSchema = require('../../schemas/command-prefix-schema')

module.exports = {
    commands: ['setprefix', 'prefix'],
    minArgs: 1,
    maxArgs: 1,
    expectedArgs: "<newPrefix>",
    permissionError: 'You need to have the MANAGE_GUILD permission to run this command.',
    permissions: 'MANAGE_GUILD',
    callback: async (message, arguments, text) => {
        await mongo().then(async (mongoose) => {
          try {
            const guildId = message.guild.id
            const prefix = arguments[0]
    
            await commandPrefixSchema.findOneAndUpdate(
              {
                _id: guildId,
              },
              {
                _id: guildId,
                prefix,
              },
              {
                upsert: true,
              }
            )
    
            message.reply(`The prefix for this bot is now ${prefix}`)
    
            // Update the cache
            commandBase.updateCache(guildId, prefix)
          } finally {
            mongoose.connection.close()
          }
        })
      },
    }