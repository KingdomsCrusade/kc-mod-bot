const { Client, Channel } = require ('discord.js')
const client = new Client();
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')

module.exports  = {
    commands:['uptime', 'online', 'up'],
    expectedArgs: '',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {

        let days = Math.floor(message.client.uptime / 86400000);
        let hours = Math.floor(message.client.uptime / 3600000) % 24;
        let minutes = Math.floor(message.client.uptime / 60000) % 60;
        let seconds = Math.floor(message.client.uptime / 1000) % 60;
  
        const embed = new Discord.MessageEmbed()
           .setTitle(`__Uptime__`)
           .addField("Days", `${days}`)
           .addField("Hours", `${hours}`)
           .addField("Minutes", `${minutes}`)
           .addField("Seconds", `${seconds}`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       message.channel.send(embed);
    },
    permissions: 'SEND_MESSAGES'
}