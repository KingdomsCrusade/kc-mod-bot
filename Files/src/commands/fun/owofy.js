  
const Discord = require('discord.js');
const { Client, Channel } = require ('discord.js')
const client = new Client();

module.exports  = {
    commands:['owofy', 'owo'],
    expectedArgs: '<text>',
    minArgs: 1,
    callback: (message, arguments, text) => {
        let sentence = arguments.join(' ');
    if (!sentence) return message.reply('I can\'t owo-fy an empty message! uwu');
    
    let faces=["(・`ω´・)",";;w;;","owo","UwU",">w<","^w^"];

    let newSentence = sentence.replace(/[lr]/g, 'w');
      newSentence = newSentence.replace(/(?:r|l)/g, "w");
      newSentence = newSentence.replace(/(?:R|L)/g, "W");
      newSentence = newSentence.replace(/n([aeiou])/g, 'ny$1');
      newSentence = newSentence.replace(/N([aeiou])/g, 'Ny$1');
      newSentence = newSentence.replace(/N([AEIOU])/g, 'NY$1');
      newSentence = newSentence.replace(/ove/g, "uv");
      newSentence = newSentence.replace(/\!+/g, " "+ faces[Math.floor(Math.random()*faces.length)]+ " ");
    // fuck you this is now finished
    message.channel.send(newSentence);
    message.delete()
    },
    permissions: 'SEND_MESSAGES'
}