const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");


module.exports.run = async (bot, message, args) => {
    let sEmbed = new Discord.RichEmbed()
    .setColor(colours.red)
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Guild Name:**", `${message.guild.name}`, true)
    .addField("**Guild Owner:**", `${message.guild.owner}`, true)
    .addField("**Member Count:**", `${message.guild.memberCount}`, true)
    .addField("**Role Count:**", `${message.guild.roles.size}`, true)
    .addField("**Channel Count:**", `${message.guild.channels.size}`, true)
    .addField("**Voice Channel Count:**", `${message.guild.channels.filter((c) => c.type === "voice").size}`, true)
    .addField("**Created At:**", `${message.guild.createdAt}`, true)
    .setTimestamp()
    .setFooter(`NEFFEX | Official Bot`, bot.user.displayAvatarURL);
    message.channel.send({embed: sEmbed});
}


module.exports.config = {
    name: "serverinfo",
    aliases: ["serverinfo"],
    usage: "",
    category: "Miscellaneous",
    description: "Shows about the server information!",
    accessableby: "Members"
}