const Discord = require('discord.js')

module.exports = {
    commands: ['ban'],
    description: 'Bans a member.',
    expectedArgs: '<mentionMember> <banReason>',
    minArgs: 1,
    permissions: 'BAN_MEMBERS',
    callback: (message, arguments, text) => {
        var memberToBan = message.guild.member(message.mentions.users.first())
        arguments.shift()
        var banReason = arguments
        memberToBan.ban({reason: `${banReason}`})
        message.lineReplyNoMention(`${memberToBan} has been banned for the reason: \`${banReason}\`.`)
    }

}