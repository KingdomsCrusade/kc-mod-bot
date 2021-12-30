const Discord = require('discord.js');
const { Client, Channel } = require ('discord.js')
const client = new Client()
const path = require('path')
const { getChannelId } = require('../../commands/moderation/set-suggestions')
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

module.exports  = {
    commands:['suggest', 'suggestion', 'suggestions'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (message, arguments, text) => {
        const { guild } = message
        const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    let messageArgs = arguments.join(' ')
    if (message.content.includes("-a")) {
       var suggestionContent = messageArgs.replace('-a','');
       const embed = new Discord.MessageEmbed()
           .setColor('#a3ebfb')
           .setAuthor('Anonymous', 'https://cdn.discordapp.com/avatars/816345830633766943/20bb085739dc59fd91f9395bc3caf22b.png')
           .setDescription(suggestionContent)
           if(message.attachments.size > 0) embed.setImage(message.attachments.first().url)
                   channel.send(embed).then((msg) => {
               msg.react('<:upvote:707157967471902731>')
               msg.react('<:downvote:707158001496096808>')
               setTimeout(() => message.delete(), 3000)

           }).catch((err) => {
               throw err
           })
    } else{
       const embed = new Discord.MessageEmbed()
           .setColor('#a3ebfb')
           .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
           .setDescription(messageArgs)
           if(message.attachments.size > 0) embed.setImage(message.attachments.first().url)
                   channel.send(embed).then((msg) => {
               msg.react('<:upvote:707157967471902731>')
               msg.react('<:downvote:707158001496096808>')
               setTimeout(() => message.delete(), 3000)

           }).catch((err) => {
               throw err
           })

    }

    
    },
    permissions: 'SEND_MESSAGES'
}