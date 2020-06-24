const { default_prefix } = require("../../botconfig.json")
const db = require("quick.db")

module.exports = async (bot, message) => {
    if(message.author.bot || message.channel.type === "dm") return;

    let prefix = db.get(`prefix_${message.guild.id}`)
    if(prefix === null) prefix = default_prefix;
  
    if (message.isMemberMentioned(bot.user)) { message.reply(`the prefix for this server is \`${prefix}\``); }
    if(!message.content.startsWith(prefix)) return;
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    let cmd = args.shift().toLowerCase()

    let commandfile = bot.commands.get(cmd) || bot.commands.get(bot.aliases.get(cmd))
    if(commandfile) commandfile.run(bot, message, args)
}