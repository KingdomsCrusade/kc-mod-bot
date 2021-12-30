const { Client, Channel } = require ('discord.js')
const status = require('minecraft-server-status-improved')
const client = new Client()
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')
const fetch = require('node-fetch')

module.exports  = {
    commands:['uptime', 'online', 'up', 'status'],
    expectedArgs: '<bot / server>',
    minArgs: 1,
    maxArgs: 1,
    description: 'Shows the uptime/status of the bot or server.',
    callback: async(message, arguments, text) => {
        if (arguments.toString().toString().toLowerCase() == "bot") {
        let days = Math.floor(message.client.uptime / 86400000)
        let hours = Math.floor(message.client.uptime / 3600000) % 24
        let minutes = Math.floor(message.client.uptime / 60000) % 60
        let seconds = Math.floor(message.client.uptime / 1000) % 60
  
        const embed = new Discord.MessageEmbed()
           .setTitle(`__Uptime__`)
           .addField("Days", `${days}`)
           .addField("Hours", `${hours}`)
           .addField("Minutes", `${minutes}`)
           .addField("Seconds", `${seconds}`)
           .setColor('#a3ebfb')
           .setFooter(`${version}`, embedIcon)
       message.lineReplyNoMention(embed)}

       if (arguments.toString().toString().toLowerCase() == "server") {let statusURL = `https://mcapi.us/server/status?ip=play.kingdomscrusade.net&port=25565`
       let response = await fetch(statusURL)
       let json = await response.json()
       currentPlayers = json.players.now
       serverUptimeMicro = json.last_updated
       serverUptime = Math.floor(serverUptimeMicro / 1000)
       serverStatus = json.online
       let days = Math.floor(serverUptime / 86400000)
       let hours = Math.floor(serverUptime / 3600000) % 24
       let minutes = Math.floor(serverUptime / 60000) % 60
       let seconds = Math.floor(serverUptime / 1000) % 60
       const blank = "_ _"
       const errorEmbed = new Discord.MessageEmbed()
          .setTitle(`__KC Server Status__`)
          .addField("Server status: \`offline\`.", `${blank}`)
          .setColor('#FF3838')
          .setFooter(`${version}`, embedIcon)

       const uptimeEmbed = new Discord.MessageEmbed()
          .setTitle(`__KC Server Uptime__`)
          .addField("Server status: \`online\`.", `${blank}`)
          .addField("__Players online:__", `${currentPlayers}`)
          .addField("__Online for:__", `${blank}`)
          .addField("Hours", `${hours}`)
          .addField("Minutes", `${minutes}`)
          .addField("Seconds", `${seconds}`)
          .setColor('#38FF5D')
          .setFooter(`${version}`, embedIcon)
      status('play.kingdomscrusade.net', 25565, (err, response) => {
       if (serverStatus == "false") message.lineReplyNoMention(errEmbed)
       else message.lineReplyNoMention(uptimeEmbed)

   })}
    },
    permissions: 'SEND_MESSAGES'
}