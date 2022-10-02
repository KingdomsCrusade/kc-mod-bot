![Banner](https://i.imgur.com/DjFBHsG.png)

# This bot is outdated and needs reweorking and updating.

# KC Mod Bot
The KC Moderation bot for the KC community Discord server!

A `config.json` file is required for the bot to run, and for it to use a database.


# Config.json
A `config.json` file is required for the bot to run. Replace the values in `template-config.json` with your own, and rename it to `config.json`.
A Mongo Database is required for the bot to start properly too, learn about MongoDB here: http://mongodb.com/

# Running The Bot
Using a command line, `cd` to the location of the bots files. Run `npm i`, this will install all of its dependencies. Then run the bot with either `npm run dev` or `npm start`, using the dev script will force the bot to restart when its files are changed.

You may also need to change channel and guild IDs in some of the `commands` and `scripts`.

# To-Do List
The following additions are planned to be implemented:

 * Fun Commands
 * Mute, ~~Ban~~, Kick, ~~Clear~~ Commands
 * Reaction Roles
 * Haha Board
 * Board of Shame/Delete votes
 * NameMC Commands
 * Help/Commands-List Command
 * Mongo-based banned words
 * Enable/disable script commands


# Testing/Discord
To see how the bot works join the KC [Discord](https://discord.gg/vEMr42p)!
