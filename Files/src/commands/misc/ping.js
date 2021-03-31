const { Client, Channel } = require ('discord.js')
const client = new Client();
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')

module.exports  = {
    commands:['ping', 'test'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        const embed = new Discord.MessageEmbed()
           .setTitle(`__Pong! 🏓__`)
           .addField('Latency is:', `${Date.now() - message.createdTimestamp} ms!`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       message.channel.send(embed);
    },
    permissions: 'SEND_MESSAGES'
}