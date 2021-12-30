const Discord = require('discord.js')
const { bannedWords } = require('../../config.json')
console.log("Banned words:\n", bannedWords)
module.exports = client => {

    client.on('message', async(msg) => {
        if(!msg.guild) return;
        var list = bannedWords
        function removeFromString(str){
            let regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
            return str.replace(regex, '')
          }
        const filteredMessage = removeFromString(`${msg.content.toLowerCase()}`);
            if((msg.author.id == 800470294979543068) & (list.some(w => ` ${filteredMessage} `.includes(` ${w} `)))) {
                const arguments = msg.content.split(/[ ]+/)
                let name =  arguments[0].replace(/\*/g, '')
                msg.channel.send(`${name}, please refrain from using banned/NSFW words.`)
                msg.channel.send(`/warn ${name} using inappropriate  language.`)
                .then(message => {
                    setTimeout(() => message.delete(), 1000)
                   })
            } else if((list.some(w => ` ${filteredMessage} `.includes(` ${w} `)))){
                msg.delete();
                msg.reply('please refrain from using banned/NSFW words.')
            }
        
    })
}