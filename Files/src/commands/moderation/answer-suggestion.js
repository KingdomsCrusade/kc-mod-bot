  
const Discord = require('discord.js')
const { Client, Channel } = require ('discord.js')
const client = new Client()
const path = require('path')
const argsError = "There was an error with the arguments used, or the suggestions channel hasn't been set."
const { getChannelId } = require('./set-suggestions')
const cError = "The suggestions channel has not been set."
const sError = "The suggestion you tried to answer is invalid."

module.exports = {
    commands: ['answersuggestions', 'as', 'asuggestion'],
    permissionError: 'You need to have the MANAGE_GUILD permission to run this command.',
    permissions: 'MANAGE_GUILD',
    minArgs: '3',
    callback: async (message, arguments, text) => {
       const { guild } = message
       const channelId = getChannelId(guild.id)
   if (!channelId) {message.lineReplyNoMention(`${cError}`)
   .then(message => {
          setTimeout(() => message.delete(), 5000)
         })
   return}

     let messageId = arguments[0]
     arguments.shift()
     let change = arguments[0]
     arguments.shift()
     let reason = arguments.join(" ")
     if (isNaN(messageId) == 'false') {message.lineReplyNoMention(`${argsError}`)
       .then(message => {
              setTimeout(() => message.delete(), 5000)
             })
       return}
     const embedMessage = await message.channel.messages.fetch(messageId)
     if (embedMessage.channel.id != channelId) {message.lineReplyNoMention(`${argsError}`)
     .then(message => {
            setTimeout(() => message.delete(), 5000)
           })
     return}
     let upvoteCount = embedMessage.reactions.cache.get('707157967471902731').count
     let downvoteCount = embedMessage.reactions.cache.get('707158001496096808').count
     const embed = embedMessage.embeds[0];
     const fetchedJSON = embed.toJSON();
     const fetchedDescription = fetchedJSON.description 
     const fetchedAuthor = fetchedJSON.author.name
     const fetchedIcon = fetchedJSON.author.icon_url
     const yesEmbed = new Discord.MessageEmbed()
            .setColor('#a3fba7')
            .setAuthor(`Accepted Suggestion by: "${fetchedAuthor}".`, `${fetchedIcon}`)
            .setDescription(`**__Suggestion__:**\n${fetchedDescription}\n\n**__Results__:**\n<:upvote:707157967471902731>: ${upvoteCount}\n<:downvote:707158001496096808>: ${downvoteCount}\n\n**__Reason__:**\n${reason}`);
     const noEmbed = new Discord.MessageEmbed()
            .setColor('#ff5959')
            .setAuthor(`Denied Suggestion by: "${fetchedAuthor}".`, `${fetchedIcon}`)
            .setDescription(`**__Suggestion__:**\n${fetchedDescription}\n\n**__Results__:**\n<:upvote:707157967471902731>: ${upvoteCount}\n<:downvote:707158001496096808>: ${downvoteCount}\n\n**__Reason__:**\n${reason}`);
     if (change == 'yes' || change == 'accept'){embedMessage.edit(yesEmbed)}
     if (change == 'no' || change == 'deny'){embedMessage.edit(noEmbed)}
     setTimeout(() => message.delete(), 1000)
     setTimeout(() => embedMessage.reactions.removeAll(), 1000)
    }
  }