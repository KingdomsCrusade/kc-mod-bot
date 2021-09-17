
// Note the capital 'C'
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../../commands/moderation/set-welcome')
const Discord = require('discord.js')
const client = new Discord.Client({disableEveryone: true, partials: ['MESSAGE', 'REACTION']});

module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    const channelId = getChannelId(guild.id)
    if (!channelId) {
      return
    }

    const channel = guild.channels.cache.get(channelId)
    if (!channel) {
      return
    }

    var welcomeCanvas = {};
    welcomeCanvas.create = Canvas.createCanvas(1024, 500)
    welcomeCanvas.context = welcomeCanvas.create.getContext('2d')
    welcomeCanvas.context.font = '72px Lilita One';
    welcomeCanvas.context.fillStyle = '#ffffff';
    const background = await Canvas.loadImage(
      path.join(__dirname, '../../wbg.png')
    )
    let x = 0
    let y = 0
    welcomeCanvas.context.drawImage(background, x, y)
    welcomeCanvas.context.fillText("Welcome!", 360, 360);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke()
    welcomeCanvas.context.fill()


    let canvas = welcomeCanvas;
    canvas.context.font = '42px Lilita One',
    canvas.context.textAlign = 'center';
    let text = `${member.user.tag}`
    canvas.context.fillText(text, 512, 410)
    canvas.context.font = '32px Lilita One'
    canvas.context.fillText(`Member #${member.guild.memberCount}`, 512, 455)
    canvas.context.beginPath()
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true)
    canvas.context.closePath()
    canvas.context.clip()
    await Canvas.loadImage(member.user.displayAvatarURL({format: 'png', size: 1024}))
    .then(img => {
        canvas.context.drawImage(img, 393, 47, 238, 238);
    })


    // Attach the image
    const attachment = new Discord.MessageAttachment(canvas.create.toBuffer(), `welcome-${member.id}.png`)
  
    //KC Only
    if (channelId === '743530164041809932') {
      const targetChannelID = '698580298182688809' //Rules
      const targetChannelID2 = '805737859881369650' //Info
      channel.send(`Welcome, <@${member.id}> to Kingdoms Crusade! Make sure you read ${member.guild.channels.cache.get(targetChannelID).toString()} and ${member.guild.channels.cache.get(targetChannelID2).toString()}!`, attachment)
    } else {

    //Send message
    channel.send(`Welcome, <@${member.id}>!`, attachment)
    }
  })
}