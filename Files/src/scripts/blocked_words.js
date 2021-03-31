const Discord = require('discord.js')

module.exports = client => {

    client.on('message', async(msg) => {
        if(msg.author.bot) return;
        if(!msg.guild) return;
        var regex = /[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g;
        var list = ['titties', 'nudes', 'WetAssPussy', 'hore', 'whore', 'masturbating', 'fag', 'noah morton', 'isaac wood', 'nigger', 'nigga', 'nibba', 'niga', 'n1gger', 'n1gga', 'cock', 'cum', 'vagina', 'hentai', 'penis', 'milf', 'porn', 'pornhub', 'pornhubpremium', 'dildo', 'rape', 'anal', 'clit', 'dick', 'pussy', 'orgy', 'gangbang', 'hcodes', 'fetish', 'pedo', 'pedophile', 'porno', 'pornos', 'pussys', 'pussies', 'pornography', 'pedophilia', 'pedophilliac', 'phonesex', 'dildos', 'fisting', 'doggystyle', 'doggiestyle', 'fingerfuck', 'blowjob', 'handjob', 'wanking', 'nazi',  'morton'];
        if(!msg.member.hasPermission('MANAGE_MESSAGES')){
            if(list.some(w => ` ${msg.content.toLowerCase()} `.includes(` ${w} `))){
                msg.delete();
                msg.reply('please refrain from using banned/NSFW words.')
            }
        }
    })
}

