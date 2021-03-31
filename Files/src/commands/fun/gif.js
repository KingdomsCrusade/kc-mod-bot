const TENORKEY = require("../../config.json")
const { Client, Channel } = require ('discord.js')
const client = new Client()
const fetch = require('node-fetch')

module.exports  = {
    commands:['gif'],
    expectedArgs: '<searchTopic>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {
        try { 
        let keywords = message.mentions.channels.first();
        let url = `https://api.tenor.com/v1/search?q=${keywords}&key=${process.env.TENORKEY}&contentfilter=high`;
        let response = await fetch(url);
        let json = await response.json();
        message.channel.send(json.results.url);
    } catch (error) {
        message.reply(`error!\n${error.message}`)
        .then(message => {
         setTimeout(() => message.delete(), 10000)
        })
    }
    },
    permissions: 'SEND_MESSAGES'
}