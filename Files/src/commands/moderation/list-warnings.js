const mongo = require('../../mongo')
const warnSchema = require('../../schemas/warn-schema')

module.exports = {
  commands: ['listwarnings', 'lw', 'warns', 'warnings'],
  minArgs: 1,
  expectedArgs: "<mentionUser>",
  permissions: 'MANAGE_MESSAGES',
  callback: async (message, arguments, text) => {
    const target = message.mentions.users.first()
    if (!target) {
      message.lineReplyNoMention('Please specify a user to load the warnings for.')
      return
    }

    const guildId = message.guild.id
    const userId = target.id

    await mongo().then(async (mongoose) => {

        const results = await warnSchema.findOne({
          guildId,
          userId,
        })

        let reply = `previous warnings for <@${userId}>:\n\n`

       try { for (const warning of results.warnings) {
          const { author, timestamp, reason } = warning

          reply += `By ${author} on ${new Date(
            timestamp
          ).toLocaleDateString()} for "${reason}"\n\n`
        }
    } catch {
        message.lineReplyNoMention('No previous warnings found.')
        return
    }
        message.lineReplyNoMention(reply)
    })
  },
}