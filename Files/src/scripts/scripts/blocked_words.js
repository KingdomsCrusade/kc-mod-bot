const Discord = require('discord.js')

module.exports = client => {

    client.on('message', async(msg) => {
        if(!msg.guild) return;
        var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        var list = ["titties", "xxxvids", "brazzers", "nudes", "dickhead", "cocaine", "pussy", "fucktard", "gaylord", "libtard", "cuck", "cucklord", "gaylors", "orgasm", "sex", "cum", "niggur", "nignog", "cumsickle", "retard", "threesome", "foursome", "cunt", "condom", "WetAssPussy", "negro", "negros", "hore", "whore", "masturbating", "fag", "nigger", "nigga", "nibba", "niga", "n1gger", "n1gga", "cock", "cum", "vagina", "hentai", "penis", "milf", "porn", "pornhub", "pornhubpremium", "dildo", "rape", "anal", "clit", "dick", "pussy", "orgy", "gangbang", "hcodes", "fetish", "pedo", "pedophile", "porno", "pornos", "pussys", "pussies", "pornography", "pedophilia", "pedophilliac", "phonesex", "dildos", "fisting", "doggystyle", "doggiestyle", "fingerfuck", "blowjob", "handjob", "wanking", "nazi"]

            if((msg.author.id == 800470294979543068) & (list.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w} `)))) {
                const arguments = msg.content.split(/[ ]+/)
                let name =  arguments[0].replace(/,/g, "")
                msg.channel.send(`${name}, please refrain from using banned/NSFW words.`)
                msg.channel.send(`/warn ${name} using inappropriate  language.`)
                .then(message => {
                    setTimeout(() => message.delete(), 1000)
                   })
            } else if((list.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w} `)))){
                msg.delete();
                msg.reply('please refrain from using banned/NSFW words.')
            }
        
    })
}

