const loadCommands = require('../load-commands')
const { prefix } = require('../../config.json')
const { Client, Channel } = require ('discord.js')
const client = new Client();
const Discord = require('discord.js')
const { version } = require ('../../config.json')
const { embedIcon } = require ('../../config.json')

module.exports  = {
    commands:['help', 'h', 'cmds', 'commands'],
    description: 'Lists all commands!',
    minArgs: 0,
    maxArgs: 0,
    callback: (message, arguments, text) => {

        const commands = loadCommands()

        for (const command of commands) {
          // Check for permissions
          let permissions = command.permission
    
          if (permissions) {
            let hasPermission = true
            if (typeof permissions === 'string') {
              permissions = [permissions]
            }
    
            for (const permission of permissions) {
              if (!message.member.hasPermission(permission)) {
                hasPermission = false
                break
              }
            }
    
            if (!hasPermission) {
              continue
            }
          }
    
          // Format the text
          const mainCommand =
            typeof command.commands === 'string'
              ? command.commands
              : command.commands[0]
          const args = command.expectedArgs ? ` ${command.expectedArgs}` : ''
          const { description } = command
    
           reply = new Discord.MessageEmbed()
          .setTitle(`__All Commands:__`)
          .addField('\n', `**\`${mainCommand}${args}\`** = ${description}\n`)
          .setColor('#a3ebfb')
          .setFooter(`${version}`, embedIcon)
        }
    
        message.lineReplyNoMention(reply)
      },
    }
