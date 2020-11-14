const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");


module.exports.run = async (bot, message, args) => {
    let uEmbed = new Discord.MessageEmbed()
    .setColor(colours.dark_blue)
    .setTitle("Server Info")
    .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
    .setAuthor(`${message.author.username} Info`, message.author.displayAvatarURL())
    .addField("**Username:**", `${message.author.username}`, true)
    .addField("**Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created AT:**", `${message.author.createdAt}`, true)
    .setTimestamp()
    .setFooter(bot.user.username, bot.user.displayAvatarURL());
    message.channel.send({embed: uEmbed});
}


module.exports.config = {
    name: "myinfo",
    aliases: ["myinfo"],
    usage: "!!myinfo",
    category: "miscellaneous",
    description: "Shows about your information!",
    accessableby: "Members"
}