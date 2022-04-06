const fetch = require('node-fetch')

module.exports  = {
    commands:['shitpost', 'shit', 'funny'],
    expectedArgs: `<search>`,
    callback: async (message, arguments, text) => {
        let query = arguments.join(" ")
        let url
        if (query) {const query = arguments.join(" "); url = `https://api.thedailyshitpost.net/search?search=${query}`} else {url = `https://api.thedailyshitpost.net/random`;}
        let response = await fetch(url);
        let json = await response.json();
        let shit = json.url;
        message.lineReplyNoMention(`**Random shitpost**:\n${shit}`);
    },
    permissions: 'SEND_MESSAGES'
}