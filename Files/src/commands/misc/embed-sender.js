module.exports = {
    commands:['embed'],
    minArgs: 2,
    expectedArgs: '<ChannelMention> <JSON Data>',
    callback: (message, arguments, text) => {
        //Use targeted channel
        const targetChannel = message.mentions.channels.first();
        if (!targetChannel) {
            message.reply('please specifiy channel.')
            .then(message => {
                setTimeout(() => message.delete(), 10000)
               })
            return
        }
        //Remove channel mention
        arguments.shift()

        
       try {
        //Use JSON Data
        const json = JSON.parse(arguments.join(' '))
        const {text = ''} = json

        //Send embed
        targetChannel.send(text, {
            embed: json
        })

        //Reply to confirm
        message.reply('message sent!')
        .then(message => {
            setTimeout(() => message.delete(), 2000)
           })
        message.delete()

       } catch (error) {
           message.reply(`you used invalid JSON data!\n ${error.message}`)
           .then(message => {
            setTimeout(() => message.delete(), 10000)
           })
       }
    },
    permissions: 'MANAGE_GUILD'
}