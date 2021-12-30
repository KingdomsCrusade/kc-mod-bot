const { Client, Channel } = require ('discord.js')
const client = new Client()
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')
const fetch = require('node-fetch')


module.exports  = {
    commands:['end-giveaway', 'gend'],
    description: 'Ends a giveaway.',
    callback: async (message, arguments, text) => {
        message.delete().then(() => {
            const { channel } = message
      
            channel.messages.fetch({ limit: 1 }).then(async (messages) => {
              message = messages.first()
      
              if (!message) {
                channel.send('There are no messages!')
                return
              }
      
              const { users } = await message.reactions.cache.first().fetch()
              const reactionUsers = await users.fetch()
      
              const possibleWinners = reactionUsers.array().filter((user) => {
                return !user.bot
              })
      
              const winner =
                possibleWinners[Math.floor(Math.random() * possibleWinners.length)]
      
              console.log(winner)
              let winnerId = winner.id
              const embed = new Discord.MessageEmbed()
           .setTitle(`__Giveaway Winner!__`)
           .addField('\nThe winner is:', `<@${winnerId}>`)
           .addField('\nCongratulations! Your prize will be sent to you shortly.', `_ _`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
           message.channel.send(`<@${winnerId}>`, embed)
            })
          })

    },
    permissions: 'SEND_MESSAGES'
}