const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!")

    let banMember = message.mentions.members.first() || message.guild.members.get(args[0])
    if(!banMember) return message.channel.send("Please provide a user to ban")

    let reason = args.slice(1).join(" ");
    if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")

    message.delete()

    banMember.send(`Hello, you have been banned from ${message.guild.name} for: ${reason}`).then(() => 
    message.guild.ban(banMember, { days: 1, reason: reason})).catch(err => console.log(err))

    message.channel.send(`**${banMember.user.tag}** has been banned`)

    let embed = new Discord.RichEmbed()
    .setColor(colours.green)
    .setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
    .addField("Moderation:", "ban")
    .addField("Banned Member:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "audit-log")
    sChannel.send(embed)


}


module.exports.config = {
    name: "ban",
    description: "Ban a user from the guild!",
    usage: "!!ban",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["banish", "remove"]
}