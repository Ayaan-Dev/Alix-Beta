const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("You do not have permission to use this command!")

    let bannedMember = await bot.fetchUser(args[0])
        if(!bannedMember) return message.channel.send("Please provide a user id to unban someone!")

    let reason = args.slice(1).join(" ")
        if(!reason) reason = "No reason given!"

    if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send("I dont have permission to perform this command!")
    message.delete()
    try{
        message.guild.unban(bannedMember, {reason: reason})
        message.channel.send(`${bannedMember.tag} has been unbanned from the guild!`)
    } catch(e){
        console.log(e.message)
    }

    let embed = new Discord.RichEmbed()
    .setColor(colours.green)
    .setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
    .addField("Moderation:", "unban")
    .addField("Unbanned Member:", `${bannnedMember.username} (${bannedMember.id})`)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .addField("Date:", message.createdAt.toLocaleString())

    let sChannel = message.guild.channels.find(c => c.name === "audit-log")
    sChannel.send(embed)

}

module.exports.config = {
    name: "unban",
    description: "Unban a user from the guild!",
    usage: "!!unban",
    category: "moderation",
    accessableby: "Administrators",
    aliases: ["unbanish"]
}