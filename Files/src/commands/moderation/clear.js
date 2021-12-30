const { Client, Channel } = require ('discord.js')
const client = new Client()

module.exports  = {
    commands:['clear', 'purge'],
    expectedArgs: '<numberToDelete>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {

        let amount = arguments.join(" ")
		amount++
        
        if(!amount) return message.lineReplyNoMention('Please provide an amount of messages for me to delete!')

        if(amount > 1000) return message.lineReplyNoMention(`You cannot clear more than 100 messages at once.`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )})

	amount--
    message.lineReplyNoMention(`Deleted ${amount} messages!`)
    .then(message => {
      setTimeout(() => message.delete(), 5000)
     })

    },
    permissions: 'MANAGE_MESSAGES'
}
