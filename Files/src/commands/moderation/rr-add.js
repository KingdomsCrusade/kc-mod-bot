const { MessageCollector } = require('discord.js')
const MessageModel = require('../../schemas/rr-message')

let messageCollectorFilter = (newmessage, originalmessage) => newmessage.author.id === originalmessage.author.id
module.exports = {
    commands: ['rradd'],
    expectedArgs: '<messageID>',
    minArgs: 1,
    maxArgs: 3,
    permissions: 'MANAGE_GUILD',
    description: 'Adds role reactions to a message.',
    callback: async(message, arguments, text) => {
        if(arguments.length !== 1) {
        console.log(err)
        }
        else {
            try {
                let fetchedMessage = await message.channel.messages.fetch(arguments)
                if(fetchedMessage) {
                    await message.lineReplyNoMention("Please provide all of the emoji names with the role name, one by one, separated with a comma.\ne.g: snapchat, snapchat, where the emoji name comes first, role name comes second.")
                    let collector = new MessageCollector(message.channel, messageCollectorFilter.bind(null, message))
                    let emojiRoleMappings = new Map()
                    collector.on('collect', message => {
                        let { cache } = message.guild.emojis
                        if(message.content.toLowerCase() === '?done') {
                            collector.stop('done command was issued.')
                            return
                        }
                        let [ emojiName, roleName ] = message.content.split(/,\s+/)
                        if(!emojiName && !roleName) return
                        let emoji = cache.find(emoji => emoji.name.toLowerCase() === emojiName.toLowerCase())
                        if(!emoji) {
                            message.lineReplyNoMention("Emoji does not exist. Try again.")
                                .then(message => message.delete({ timeout: 2000 }))
                                .catch(err => console.log(err))
                            return
                        }
                        let role = message.guild.roles.cache.find(role => role.name.toLowerCase() === roleName.toLowerCase())
                        if(!role) {
                            message.lineReplyNoMention("Role does not exist. Try again.")
                                .then(message => message.delete({ timeout: 2000 }))
                                .catch(err => console.log(err))
                            return
                        }
                        fetchedMessage.react(emoji)
                            .then(emoji => console.log("Reacted."))
                            .catch(err => console.log(err))
                        emojiRoleMappings.set(emoji.id, role.id)
                    })
                    collector.on('end', async (collected, reason) => {
                        let findmessageDocument = await MessageModel
                            .findOne({ messageId: fetchedMessage.id })
                            .catch(err => console.log(err))
                        if(findmessageDocument) {
                            console.log("The message exists.. Don't save...")
                            message.lineReplyNoMention("A role reaction set up exists for this message already...")
                        }
                        else {
                            let dbmessageModel = new MessageModel({
                                messageId: fetchedMessage.id,
                                emojiRoleMappings: emojiRoleMappings
                            })
                            dbmessageModel.save()
                                .then(m => console.log(m))
                                .catch(err => console.log(err))
                        }
                    })
                }
            }
            catch(err) {
                console.log(err)
            }
        }
    },
}