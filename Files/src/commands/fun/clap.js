  
const Discord = require('discord.js')
const { Client, Channel } = require ('discord.js')
const client = new Client()

module.exports  = {
    commands:['clap', 'cheer'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (message, arguments, text) => {
        let sentence = arguments.join(' 👏 ')

        message.lineReplyNoMention(sentence)
    },
    permissions: 'SEND_MESSAGES'
}