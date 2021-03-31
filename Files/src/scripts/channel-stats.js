module.exports =  (client) => {
    var guild = client.guilds.cache.get('616334515492618264')
    var botsChannel = guild.channels.cache.get('796005734848135198')
    var membersChannel = guild.channels.cache.get('796005735485800499')
    var botCount = guild.roles.cache.get('682652909518848062').members.size;
    var memberCount = guild.members.cache.filter(member => !member.user.bot).size;

    // Gain member
    client.on('guildMemberAdd', async (member) => {

        // Bots Counter
        botsChannel.setName("Bots: " + botCount)

        // Members Counter
        membersChannel.setName("Members: " + guild.memberCount)
    })

    // Lose member
    client.on('guildMemberRemove', async (member) => {

        // Bots Counter
        botsChannel.setName("Bots: " + botCount)

        // Members Counter
        membersChannel.setName("Members: " + guild.memberCount)
    })
}