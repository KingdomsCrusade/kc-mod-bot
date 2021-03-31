const { Client, Channel } = require ('discord.js')
const client = new Client();

module.exports  = {
    commands:['clear', 'purge'],
    expectedArgs: '<numberToDelete>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {

        const amount = arguments.join(" ");

        if(!amount) return message.reply('please provide an amount of messages for me to delete!')

        if(amount > 100) return message.reply(`you cannot clear more than 100 messages at once.`)

        await message.channel.messages.fetch({limit: amount}).then(messages => {
            message.channel.bulkDelete(messages
    )});


    message.channel.send(`Deleted ${amount} messages!`)
    .then(message => {
      setTimeout(() => message.delete(), 2000)
     })

    },
    permissions: 'MANAGE_MESSAGES'
}