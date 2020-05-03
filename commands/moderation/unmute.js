const Discord = require("discord.js");
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const superagent = require("superagent");


module.exports.run = async (bot, message, args) => {
if(!message.member.hasPermission("MANAGE_ROLES") || !message.guild.owner) return message.channel.send("You dint have permission to use this command.");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to add roles!")


let mutee = message.mentions.members.first() || message.guild.member.get(args[0]);
if(!mutee) return message.channel.send("Please supply a user to be muted!");

let reason = args.slice(1).join(" ");
if(!reason) reason = "No reason given"


let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no mute role to remove!")

mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hello, you have been unmuted in ${message.guild.name} for: ${reason}`).catch(err => console.log(err))
    message.channel.send(`**${mutee.user.username}** was unmuted!`)
})

let embed = new Discord.RichEmbed()
.setColor(colours.green)
.setAuthor(`${message.guild.name} Auditlogs`, message.guild.conURL)
.addField("Moderation:", "unmute")
.addField("Mutee:", mutee.user.username)
.addField("Moderator:", message.author.username)
.addField("Reason:", reason)
.addField("Date:", message.createdAt.toLocaleString())

let sChannel = message.guild.channels.find(c => c.name === "audit-log")
sChannel.send(embed)
}


module.exports.config = {
    name: "unmute",
    description: "Unmutes a member in the discord!",
    usage: "!unmute <user> <reason>",
    accessableby: "Members",
    category: "moderation",
    aliases: ["unm", "speak"]
}