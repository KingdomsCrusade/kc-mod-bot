//Load token
const { botToken } = require('./config.json')

//Load modules etc.
const { MongoClient } = require('mongodb')
const mongoose = require ('mongoose')
const path = require('path')
const fs = require('fs')
require('discord-reply')
const { Client, Channel } = require ('discord.js')
const Discord = require('discord.js')
const client = new Client();
const mongo = require('./mongo')
const config = require('./config.json')
require('events').EventEmitter.defaultMaxListeners = 30

//Import scripts
const loadScripts = require('./scripts/load-scripts')
const loadCommands = require('./commands/load-commands')

//Load other stuff
const commandBase = require('./commands/command-base')

//Login
client.login(`${botToken}`)

client.on('ready', async () => {
    console.log("Credit to Zaczer#0005")
    const defaultstatus = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
    client.user.setActivity(`${defaultstatus} guild members.`, {type: `WATCHING`})
    //Connect to mongo
    await mongo()
    //Load scripts and commands
    loadCommands(client)
    commandBase.loadPrefixes(client)
    loadScripts(client)
})