  
const Discord = require('discord.js')
const { Client, Channel } = require ('discord.js')
const client = new Client()
const path = require('path')

module.exports = {
    commands: ['answersuggestions', 'as', 'asuggestion'],
    permissionError: 'You need to have the MANAGE_GUILD permission to run this command.',
    permissions: 'MANAGE_GUILD',
    minArgs: '3',
    callback: async (message, arguments, text) => {
     let messageId = arguments[0]
     arguments.shift()
     let change = arguments[0]
     arguments.shift()
     let reason = arguments.join(" ")
  
     const embedMessage = await message.channel.messages.fetch(messageId)
     let upvoteCount = embedMessage.reactions.cache.get('707157967471902731').count;
     let downvoteCount = embedMessage.reactions.cache.get('707158001496096808').count;
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