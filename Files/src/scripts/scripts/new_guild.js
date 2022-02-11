const { Client, Channel } = require ('discord.js')
const Discord = require('discord.js')
const client = new Client()

module.exports = client => {

  client.on('guildCreate', guild => {
    guild.systemChannel.send('Thanks for adding me! This message will be updated in the future.').catch(x => x.return);
  })
}