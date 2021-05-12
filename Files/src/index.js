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

//Import scripts
const loadCommands = require('./commands/load-commands')
const starboard = require('./scripts/starboard')
const welcome = require('./scripts/canvas-welcome')
const stats = require('./scripts/channel-stats')
const status = require('./scripts/set-status')
const blocked_words = require('./scripts/blocked_words')
const kc_scripts = require('./scripts/kc-only')

//Load other stuff
const commandBase = require('./commands/command-base')

//Login
client.login(`${botToken}`)

client.on('ready', async () => {
    console.log("Credit to Zaczer#0005")

    //Connect to mongo
    await mongo()
    //Load scripts and commands
    loadCommands(client)
    commandBase.loadPrefixes(client)
    kc_scripts(client)
    blocked_words(client)
    welcome(client)
    starboard(client)
    stats(client)
    status(client)
});