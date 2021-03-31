module.exports  = {
    commands:['help'],
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {
        message.reply('welcome to KC!\nI am your faithful moderation bot!')
    },
}
