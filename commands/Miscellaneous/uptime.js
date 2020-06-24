const Discord = require("discord.js")
const botconfig = require("../../botconfig.json");
const colours = require("../../colours.json");
const prefix = botconfig.prefix


module.exports.run = async (bot, message, args) => {

    function duration(ms) {
        const sec = Math.floor((ms / 1000) % 60).toString()
        const min = Math.floor((ms / (1000 * 60)) % 60).toString()
        const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString()
        const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString()
        return `${days.padStart(1, '0')} days, ${hrs.padStart(2, '0')} hours, ${min.padStart(2, '0')} minutes, ${sec.padStart(2, '0')} seconds`
    }

    const embed = new Discord.RichEmbed()
    .setColor(colours.green)
    .addField(`I Have Been Online For:`, `\`${duration(bot.uptime)}\``)
    .setTimestamp()
    .setFooter(`Used By: ${message.author.username}`)
    message.channel.send(embed);

}


module.exports.config = {
    name: "uptime",
    description: "Displays the bots current uptime!",
    usage: "",
    category: "Miscellaneous",
    accessableby: "Members",
    aliases: ["ut"]
}
