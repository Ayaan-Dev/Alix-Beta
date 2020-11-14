const { ErelaClient, Utils } = require("erela.js");
const { prefix } = require("../../botconfig.json")

module.exports = bot => {
    console.log(`${bot.user.username} is online`);
    console.log(bot.guilds.cache.size)

    let activities = [ `${bot.guilds.cache.size} servers!`, `${bot.channels.cache.size} channels!`, `${bot.users.cache.size} users!` ], i = 0;
    setInterval(() => bot.user.setActivity(`${prefix}help | ${activities[i++ % activities.length]}`, { type: "WATCHING" }), 15000)
};
