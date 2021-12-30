const fs = require('fs')
const { TENORKEY } = require('../../config.json')
const { Client, Channel } = require ('discord.js')
const client = new Client()
const fetch = require('node-fetch')

module.exports  = {
    commands:['gif'],
    expectedArgs: '<searchTopic>',
    minArgs: 0,
    callback: async (message, arguments, text) => {
        try { 
        keywords = arguments.join(" ")
        let tenorURL = `https://api.tenor.com/v1/search?q=${keywords}&key=${TENORKEY}&contentfilter=high`
        let response = await fetch(tenorURL)
        let json = await response.json()
        const index = Math.floor(Math.random() * json.results.length)
        gif = json.results[index].url
        message.lineReplyNoMention(gif)
    } catch (error) {
        message.lineReplyNoMention(`Error!\n${error.message}`)
        .then(message => {
         setTimeout(() => message.delete(), 10000)
        })
    }
    },
    permissions: 'SEND_MESSAGES'
}