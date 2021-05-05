//Load token
const { botToken } = require('./config.json')

//Load modules etc.
const mongoose = require ('mongoose')
const path = require('path')
const fs = require('fs')
require('discord-reply')
const { Client, Channel } = require ('discord.js')
const Discord = require('discord.js')
const client = new Client();
const mongo = require('./mongo.js')

//Import scripts
const loadCommands = require('./commands/load-commands')
const starboard = require('./scripts/starboard')
const welcome = require('./scripts/canvas-welcome')
const stats = require('./scripts/channel-stats')
const status = require('./scripts/set-status')
const blocked_words = require('./scripts/blocked_words')

//Load other stuff
const commandBase = require('./commands/command-base')
mongoose.set('useFindAndModify', false);

//Login
client.login(`${botToken}`)

client.on('ready', async () => {
    console.log("Credit to Zaczer#0005")

    //Connect to mongo
    await mongo().then(mongoose => {
        try{
            console.log('Connected to MongoDB!')
        }
        finally{
            mongoose.connection.close()
        }
    })
    //Load scripts and commands
    loadCommands(client)
    commandBase.loadPrefixes(client)
    blocked_words(client)
    welcome(client)
    starboard(client)
    stats(client)
    status(client)
});