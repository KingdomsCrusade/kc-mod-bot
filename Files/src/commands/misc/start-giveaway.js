const { Client, Channel } = require ('discord.js')
const client = new Client()
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')


module.exports  = {
    commands:['start-giveaway', 'gstart'],
    description: 'Starts a giveaway.',
    expectedArgs: '<emoji>',
    minArgs: 1,
    callback: async (message, arguments, text) => {
        message.delete().then(() => {
        const { guild, channel } = message
  
        channel.messages.fetch({ limit: 1 }).then((messages) => {
          message = messages.first()
  
          if (!message) {
            channel.send('There are no messages!')
            return
          }
  
         const emoji = arguments[0]
  
          message.react(emoji)
        })
      })

    },
    permissions: 'SEND_MESSAGES'
}





