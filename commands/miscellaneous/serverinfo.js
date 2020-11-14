const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");


module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.MessageEmbed()
    .setColor(colours.red)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL())
    .addField("**Guild Name:**", `${message.guild.name}`, true)
    .addField("**Guild Owner:**", `${message.guild.owner}`, true)
    .addField("**Member Count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.cache.size}`, true)
    .addField("**Channel Count:**", `${message.guild.channels.cache.size}`, true)
    .addField("**Voice Channel Count:**", `${message.guild.channels.cache.filter((c) => c.type === "voice").size}`, true)
    .addField("**Created At:**", `${message.guild.createdAt()}`, true)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send({embed: sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo"],
    usage: "!!serverinfo",
    category: "miscellaneous",
    description: "Shows about the server information!",
    accessableby: "Members"
}