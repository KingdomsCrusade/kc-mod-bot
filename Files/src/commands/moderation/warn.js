const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
  commands: 'warn',
  minArgs: 2,
  expectedArgs: "<mentionUser> <reason>",
  permissions: 'MANAGE_MESSAGES',
  callback: async (message, arguments) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.reply('please mention someone to warn!')
      .then(message => {
        setTimeout(() => message.delete(), 2000)
       })
      return
    }

    arguments.shift()

    const guildId = message.guild.id
    const userId = target.id
    const reason = arguments.join(' ')

    const warning = {
      author: message.member.user.tag,
      timestamp: new Date().getTime(),
      reason,
    }

    await mongo().then(async (mongoose) => {
      try {
        await warnSchema.findOneAndUpdate(
          {
            guildId,
            userId,
          },
          {
            guildId,
            userId,
            $push: {
              warnings: warning,
            },
          },
          {
            upsert: true,
          }
        )
      } finally {
        mongoose.connection.close()
      }
    })
  },
}
