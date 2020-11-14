const { prefix, main_ownerid } = require("../../botconfig.json")

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)

}