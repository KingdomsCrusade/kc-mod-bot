
// Note the capital 'C'
const Canvas = require('canvas')
const { MessageAttachment } = require('discord.js')
const path = require('path')
module.exports = (client) => {
  client.on('guildMemberAdd', async (member) => {
    // Async function
    // Destructure the guild property from the member object
    const { guild } = member
    // Access the channel ID for this guild from the cache
    const channelId = '743530164041809932'
    // Access the actual channel and send the message
    const channel = guild.channels.cache.get(channelId)
    // Create a canvas and access the 2d context
    const canvas = Canvas.createCanvas(700, 250)
    const ctx = canvas.getContext('2d')
    // Load the background image and draw it to the canvas
    const background = await Canvas.loadImage(
      path.join(__dirname, '../wbg.png')
    )
    let x = 0
    let y = 0
    ctx.drawImage(background, x, y)
    // Load the user's profile picture and draw it
    const pfp = await Canvas.loadImage(
      member.user.displayAvatarURL({
        format: 'png',
      })
    )
    x = canvas.width / 2 - pfp.width / 2
    y = 25
    ctx.drawImage(pfp, x, y)
    // Display user text
    ctx.fillStyle = '#ffffff' // White text
    ctx.font = '30px Lilita One'
    let text = `Welcome ${member.user.tag}!`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 60 + pfp.height)
    // Display member count
    ctx.font = '25px Lilita One'
    text = `Member #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, x, 100 + pfp.height)
    // Attach the image to a message and send it
    const attachment = new MessageAttachment(canvas.toBuffer())
    const targetChannelID = '698580298182688809' //Rules
    const targetChannelID2 = '805737859881369650' //Info
    channel.send(`Welcome, <@${member.id}> to Kingdoms Crusade! Make sure you read ${member.guild.channels.cache.get(targetChannelID).toString()} and ${member.guild.channels.cache.get(targetChannelID2).toString()}!`, attachment)
  })
}