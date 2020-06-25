const { ErelaClient, Utils } = require("erela.js");
const { nodes } = require("../../botconfig.json")

module.exports = bot => {
    console.log(`${bot.user.username} is online`);

    let activities = [ `${bot.guilds.size} servers!`, `${bot.channels.size} channels!`, `${bot.users.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`!!help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)
};
