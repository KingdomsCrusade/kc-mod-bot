const { Client, Channel } = require ('discord.js')
const client = new Client();
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')

module.exports  = {
    commands:['vote'],
    description: 'Makes an anonymous vote.',
    expectedArgs: '<vote>',
    minArgs: 1,
    callback: async (message, arguments, text) => {
        const vote = arguments.join(" ")
        var yesCounter = 0
        var noCounter = 0
        const embed = new Discord.MessageEmbed()
           .setTitle(`__Anonymous Vote!__`)
           .addField(`${vote}\n\n`, `<:upvote:707157967471902731> - ${yesCounter} votes.\n <:downvote:707158001496096808> - ${noCounter} votes.`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       const sentEmbed = await message.channel.send(embed)
       await sentEmbed.react('<:upvote:707157967471902731>')
       await sentEmbed.react('<:downvote:707158001496096808>')
       const filter = (reaction, user) => (['<:upvote:707157967471902731>', '<:downvote:707158001496096808>'].includes(reaction.emoji.name) && !user.bot)
       const collector = sentEmbed.createReactionCollector(filter)

       downvotedEmbed = new Discord.MessageEmbed()
           .setTitle(`__Anonymous Vote!__`)
           .addField(`${vote}\n\n`, `<:upvote:707157967471902731> - ${yesCounter} votes.\n <:downvote:707158001496096808> - ${noCounter +1} votes.`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       upvotedEmbed = new Discord.MessageEmbed()
           .setTitle(`__Anonymous Vote!__`)
           .addField(`${vote}\n\n`, `<:upvote:707157967471902731> - ${yesCounter +1} votes.\n <:downvote:707158001496096808> - ${noCounter} votes.`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)

       collector.on("collect", (reaction, user) => {
        switch (reaction.emoji.name) {
          case '<:upvote:707157967471902731>':
            sentEmbed.edit(upvotedEmbed);
            break;
          case '<:downvote:707158001496096808>':
            sentEmbed.edit(downvotedEmbed);
            break;
        }
      });
    },
    permissions: 'MANAGE_GUILD'
}