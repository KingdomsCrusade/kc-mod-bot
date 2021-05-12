module.exports =  (client) => {
    prefix = 'kc!'
client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(' ');
    const command = args.shift().toLowerCase();
    const botOwnerID = 442243565494599701

        if ((message.author.id == botOwnerID) & (command === 'setstatus')) {
            const type = args[0]
            args.shift()
            const status = args.join(" ")
            client.user.setActivity(`${status}`, { type: `${type}` });
            message.lineReplyNoMention(`Status set to \`${type} | ${status}\`!`)
        }
        else if (command==='setstatus') {
            message.lineReplyNoMention('Only my owner can set my status!')
        }
    
})
}