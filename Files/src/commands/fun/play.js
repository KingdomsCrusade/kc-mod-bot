const discord = require('discord.js')
const Discord = require('discord.js');
const { Client, Channel } = require ('discord.js')
const fetch = require('node-fetch');
const client = new Client()
const { MessageButton, MessageActionRow } = require('discord-buttons');
const botToken = require ('../../config.json')

module.exports  = {
    commands:['play', 'together'],
    expectedArgs: '<activity>',
    minArgs: 1,
    maxArgs: 1,
    callback: async (message, arguments, text) => {

        let channel = message.member.voice.channel;
        if(!channel) return message.lineReplyNoMention("You have to be in a vc to do this!")

       if (arguments.toString().toLowerCase() == "poker") {
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: `755827207812677713`,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODE2MzQ1ODMwNjMzNzY2OTQz.YD5nTA.qlcPFsMOEmWt2Dwldflk7xuh15s`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
            if(!invite.code) return message.lineReplyNoMention("There was an issue starting the game...")
            const e = new discord.MessageEmbed()
            .setColor('#a3ebfb')
            .setDescription(`[Click Here!](https://discord.com/invite/${invite.code})`)
            message.channel.send(e)
        })
       }
       if ((arguments.toString().toLowerCase() == "yt") | (arguments =="youtube")){
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: `755600276941176913`,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODE2MzQ1ODMwNjMzNzY2OTQz.YD5nTA.qlcPFsMOEmWt2Dwldflk7xuh15s`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
            if(!invite.code) return message.lineReplyNoMention("There was an issue starting the game...")
            const e = new discord.MessageEmbed()
            .setColor('#a3ebfb')
            .setDescription(`[Click Here!](https://discord.com/invite/${invite.code})`)
            message.channel.send(e)
        })
       }
       if (arguments.toString().toLowerCase() == "betrayal") {
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: `773336526917861400`,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODE2MzQ1ODMwNjMzNzY2OTQz.YD5nTA.qlcPFsMOEmWt2Dwldflk7xuh15s`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
            if(!invite.code) return message.lineReplyNoMention("There was an issue starting the game...")
            const e = new discord.MessageEmbed()
            .setColor('#a3ebfb')
            .setDescription(`[Click Here!](https://discord.com/invite/${invite.code})`)
            message.channel.send(e)
        })
       }
       if (arguments.toString().toString().toLowerCase() == "fishington") {
        fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 0,
                target_application_id: `814288819477020702`,
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ODE2MzQ1ODMwNjMzNzY2OTQz.YD5nTA.qlcPFsMOEmWt2Dwldflk7xuh15s`,
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(invite => {
            if(!invite.code) return message.lineReplyNoMention("There was an issue starting the game...")
            const e = new discord.MessageEmbed()
            .setColor('#a3ebfb')
            .setDescription(`[Click Here!](https://discord.com/invite/${invite.code})`)
            message.channel.send(e)
        })
       }
       const help_e = new discord.MessageEmbed()
       .setColor('#a3ebfb')
       .setDescription('**__Games:__**\n\nPoker - Poker Night\nYoutube - Youtube Together\nFishington - Fishington.io\nBetrayal - Betrayal.io')
       if (arguments.toString().toString().toLowerCase() == "help") {
           
           message.channel.send(help_e)
       }
    
       if((arguments.toString().toLowerCase() !== "poker") | (arguments.toString().toLowerCase() !== "yt") | (arguments.toString().toLowerCase() !== "youtube") | (arguments.toString().toLowerCase() !== "betrayal") | (arguments.toString().toLowerCase() !== "fishington") | (arguments.toString().toLowerCase() !== "help")){
        message.lineReplyNoMention(`\`${arguments}\` is not a valid game!`)
        message.channel.send(help_e)
       }
        
        
    },
    permissions: 'SEND_MESSAGES'
}

