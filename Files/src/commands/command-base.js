const mongo = require('../mongo')
const commandPrefixSchema = require('../schemas/command-prefix-schema')
const guildPrefixes = {} // { 'guildID' : 'prefix' }
const { prefix: globalPrefix } = require('../config.json')
//Ensures permissions listed in commands are valid.
const validatePermissions = (permissions) => {
    const validatePermissions = [
        'ADMINISTRATOR',
        'CREATE_INSTANT_INVITE',
        'KICK_MEMBERS',
        'BAN_MEMBERS',
        'MANAGE_CHANNELS',
        'MANAGE_GUILD',
        'ADD_REACTIONS',
        'VIEW_AUDIT_LOG',
        'PRIORITY_SPEAKER',
        'STREAM',
        'VIEW_CHANNEL',
        'SEND_MESSAGES',
        'SEND_TTS_MESSAGES',
        'MANAGE_MESSAGES',
        'EMBED_LINKS',
        'ATTACH_FILES',
        'READ_MESSAGE_HISTORY',
        'MENTION_EVERYONE',
        'USE_EXTERNAL_EMOJIS',
        'VIEW_GUILD_INSIGHTS',
        'CONNECT',
        'SPEAK',
        'MUTE_MEMBERS',
        'DEAFEN_MEMBERS',
        'MOVE_MEMBERS',
        'USE_VAD',
        'CHANGE_NICKNAME',
        'MANAGE_NICKNAMES',
        'MANAGE_ROLES',
        'MANAGE_WEBHOOKS',
        'MANAGE_EMOJIS',
    ]

    for (const permission of permissions) {
        if (!validatePermissions.includes(permission)) {
            throw new Error(`Unkown permission node "${permission}" `)
        }
    }
}

module.exports = (client, commandOptions) => {
    let {
        commands,
        expectedArgs = '',
        permissionError = `you need to have different permissions to run this command!`,
        minArgs = 0,
        maxArgs = null,
        permissions = [],
        requiredRoles = [],
        callback
    } = commandOptions

    // Ensure command and aliases are in an array.
    if (typeof commands === 'string') {
        commands = [commands]
    }

    console.log(`Registering command "${commands[0]}"`)

    

    // Ensure permissions are in and array and valid.
    if (permissions.length) {
        if (typeof permissions === 'string') {
            permissions = [permissions]
        }
        validatePermissions(permissions)
    }
    // Listen for messages.
    client.on('message', message => {
        const { member, content, guild } = message
        const prefix = guildPrefixes[guild.id] || globalPrefix

        for (const alias of commands) {
            if (content.toLowerCase().startsWith(`${prefix}${alias.toLowerCase()}`)) {
                // A command has been ran.

                // Ensure user has required permissions.
                for (const permission of permissions) {
                    if (!member.hasPermission(permission)) {
                        message.reply(permissionError)
                        .then(message => {
                            setTimeout(() => message.delete(), 10000)
                           })
                        return
                    }
                }
                //Ensure user has required roles.
                for (const requiredRole of requiredRoles) {
                    const role = guild.roles.cache.find(role => 
                    role.name == requiredRole)

                    if (!role || member.roles.cache.has(role.id)) {
                        member.reply(`You must have the "${requiredRole} role to use this command.`)
                        .then(message => {
                            setTimeout(() => message.delete(), 10000)
                           })
                        return
                    }
                }
                //Ensure arguments are used.
                const arguments = content.split(/[ ]+/)
                
                arguments.shift()

                if (arguments.length < minArgs || (
                    maxArgs !== null && arguments.length > maxArgs
                )) {
                    message.reply(`Incorret syntax! Use ${prefix}${alias} ${expectedArgs}.`)
                    .then(message => {
                        setTimeout(() => message.delete(), 10000)
                       })
                    return
                }

                //Handle custom command code.
                callback(message, arguments, arguments.join(' '))
                

                return
            }
        }
    })
}

module.exports.loadPrefixes = async (client) => {
    await mongo().then(async mongoose => {
        try {
            for (const guild of client.guilds.cache) {
                const guildId = guild[1].id
                const result = await commandPrefixSchema.findOne({ _id: guildId })
                guildPrefixes[guildId] = result.prefix
            }

            console.log(guildPrefixes)
        } finally {
            mongoose.connection.close()
        }
    })
   
}