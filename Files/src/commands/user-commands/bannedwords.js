const { Client, Channel } = require ('discord.js')
const client = new Client();
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')
var { bannedWords } = require ('../../config.json')


module.exports  = {
    commands:['words', 'bannedwords'],
    description: 'DMs a list of banned words.',
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
           .setTitle(`__Banned Words__`)
           .addField('The following words are banned:\n', `\`\`\`${bannedWords.join(", ")}\`\`\``)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       message.lineReplyNoMention("I've DMed you with a list of all the banned words!")
       message.author.send(embed)
    },
    permissions: 'SEND_MESSAGES'
}