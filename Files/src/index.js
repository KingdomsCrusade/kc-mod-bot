require('dotenv').config();
const { botToken } = require('./config.json')

const mongoose = require ('mongoose')
const path = require('path')
const fs = require('fs')
const welcome = require('./scripts/canvas-welcome')
const stats = require('./scripts/channel-stats')
const blocked_words = require('./scripts/blocked_words')
const { Client, Channel } = require ('discord.js')
const Discord = require('discord.js')
const PREFIX = "kc!"
const client = new Client();
const unirest = require('unirest');
const mongo = require('./mongo.js')
const commandBase = require('./commands/command-base')
client.login(`${botToken}`)
mongoose.set('useFindAndModify', false);

client.on('ready', async () => {
	client.user.setActivity('Kingdoms Crusade', { type: 'WATCHING' });
    console.log("Credit to Zaczer#0005")

    const baseFile = 'command-base.js'
    const commandBase = require(`./commands/${baseFile}`)

    const readCommands = dir => {
        const files = fs.readdirSync(path.join(__dirname, dir))
        for (const file of files) {
            const stat = fs.lstatSync(path.join(__dirname, dir, file))
            if (stat.isDirectory()) {
                readCommands(path.join(dir, file))
            } else if (file !== baseFile) {
                const option = require(path.join(__dirname, dir, file))
                commandBase(client, option)
            }
        }
    }

    await mongo().then(mongoose => {
        try{
            console.log('Connected to MongoDB!')
        }
        finally{
            mongoose.connection.close()
        }
    })

    readCommands('commands')
    commandBase.loadPrefixes(client)
    blocked_words(client)
    welcome(client)
    stats(client)
});




client.on('message', async (message) => {
	//Error Messages
	const errorMessage = () => {
		message.channel.send('Hmmm, something went wrong.');
	};

    msg=message.content.toLowerCase();

	//make shift error handling, send myself a message
	const oatMeal = (message) => {
		client.fetchUser('442243565494599701').then((user) => {
			user.send(message);
		});
	};
})
