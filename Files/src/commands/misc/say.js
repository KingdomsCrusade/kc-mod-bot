module.exports = {
    commands:['say', 'send'],
    minArgs: 2,
    expectedArgs: '<ChannelMention> <Text>',
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
        //Use Text
        const text = arguments.join(" ")

        //Send
        targetChannel.send(text)

        //Reply to confirm
        message.reply('message sent!')
        .then(message => {
            setTimeout(() => message.delete(), 2000)
           })
        message.delete()

       } catch (error) {
           message.reply(`error! ${error.message}`)
       }
    },
    permissions: 'MANAGE_GUILD'
}